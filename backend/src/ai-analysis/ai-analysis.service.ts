import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentsService } from '../documents/documents.service';
import { AnalysisType, AnalysisStatus } from '@prisma/client';
import { promises as fs } from 'fs';

interface ClaudeResponse {
  content: Array<{ text: string }>;
  model: string;
}

@Injectable()
export class AiAnalysisService {
  private readonly claudeApiKey: string;
  private readonly claudeApiUrl = 'https://api.anthropic.com/v1/messages';
  private readonly claudeModel: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private documentsService: DocumentsService,
  ) {
    this.claudeApiKey = this.configService.get<string>('CLAUDE_API_KEY', '');
    this.claudeModel = this.configService.get<string>('CLAUDE_MODEL', 'claude-3-sonnet-20240229');
  }

  async analyzeContract(
    contractId: string,
    documentId: string | null,
    userId: string,
    analysisType: AnalysisType = 'FULL_ANALYSIS',
  ) {
    // Verify contract exists
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
      include: {
        documents: {
          where: documentId ? { id: documentId } : { isLatest: true },
          take: 1,
        },
      },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    const document = contract.documents[0];
    if (!document) {
      throw new BadRequestException('No document found for analysis');
    }

    // Create analysis record
    const analysis = await this.prisma.analysis.create({
      data: {
        type: analysisType,
        status: 'PROCESSING',
        contractId,
        documentId: document.id,
        requestedById: userId,
        claudeModel: this.claudeModel,
      },
    });

    // Start async analysis
    this.performAnalysis(analysis.id, contract, document).catch((error) => {
      console.error('Analysis failed:', error);
      this.prisma.analysis.update({
        where: { id: analysis.id },
        data: {
          status: 'FAILED',
          errorMessage: error.message,
        },
      });
    });

    return analysis;
  }

  private async performAnalysis(
    analysisId: string,
    contract: any,
    document: any,
  ) {
    const startTime = Date.now();

    try {
      // Read document content (for PDF, you'd need a PDF parser)
      // For now, we'll use the document metadata and contract info
      const prompt = this.buildAnalysisPrompt(contract, document);

      // Call Claude API
      const response = await this.callClaudeAPI(prompt);
      const analysisResult = this.parseAnalysisResponse(response);

      // Update analysis with results
      await this.prisma.analysis.update({
        where: { id: analysisId },
        data: {
          status: 'COMPLETED',
          summary: analysisResult.summary,
          keyTerms: analysisResult.keyTerms,
          risks: analysisResult.risks,
          obligations: analysisResult.obligations,
          clauses: analysisResult.clauses,
          confidence: analysisResult.confidence,
          processingTime: Date.now() - startTime,
          completedAt: new Date(),
        },
      });
    } catch (error) {
      await this.prisma.analysis.update({
        where: { id: analysisId },
        data: {
          status: 'FAILED',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          processingTime: Date.now() - startTime,
        },
      });
      throw error;
    }
  }

  private buildAnalysisPrompt(contract: any, document: any): string {
    return `Analyze the following contract and provide a comprehensive assessment:

Contract Name: ${contract.name}
Party: ${contract.partyName}
Type: ${contract.type}
Value: ${contract.value ? `${contract.currency} ${contract.value}` : 'Not specified'}
Start Date: ${contract.startDate || 'Not specified'}
Expiry Date: ${contract.expiryDate || 'Not specified'}
Description: ${contract.description || 'Not provided'}

Please provide your analysis in the following JSON format:
{
  "summary": "A comprehensive summary of the contract (2-3 paragraphs)",
  "keyTerms": [
    {"term": "Term Name", "value": "Term Value", "confidence": 95}
  ],
  "risks": [
    {
      "type": "High|Medium|Low",
      "title": "Risk Title",
      "description": "Detailed risk description",
      "clause": "Referenced clause",
      "recommendation": "Suggested action"
    }
  ],
  "obligations": [
    {
      "party": "Party Name",
      "obligation": "Obligation description",
      "deadline": "Deadline or timeframe",
      "status": "active|completed|pending"
    }
  ],
  "clauses": [
    {
      "category": "Clause Category",
      "status": "standard|review|non-standard",
      "text": "Clause summary"
    }
  ],
  "confidence": 85
}`;
  }

  private async callClaudeAPI(prompt: string): Promise<ClaudeResponse> {
    if (!this.claudeApiKey) {
      // Return mock data if no API key configured
      return this.getMockResponse();
    }

    const response = await fetch(this.claudeApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.claudeApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.claudeModel,
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  private getMockResponse(): ClaudeResponse {
    return {
      content: [
        {
          text: JSON.stringify({
            summary: 'This is a mock analysis summary. Configure CLAUDE_API_KEY for real analysis.',
            keyTerms: [
              { term: 'Parties', value: 'Mock parties', confidence: 95 },
              { term: 'Value', value: 'Mock value', confidence: 90 },
            ],
            risks: [
              {
                type: 'Medium',
                title: 'Mock Risk',
                description: 'This is a mock risk assessment.',
                clause: 'Section 1',
                recommendation: 'Configure Claude API for real analysis',
              },
            ],
            obligations: [
              {
                party: 'Party A',
                obligation: 'Mock obligation',
                deadline: '30 days',
                status: 'active',
              },
            ],
            clauses: [
              {
                category: 'General',
                status: 'standard',
                text: 'Mock clause analysis',
              },
            ],
            confidence: 50,
          }),
        },
      ],
      model: 'mock',
    };
  }

  private parseAnalysisResponse(response: ClaudeResponse): any {
    try {
      const content = response.content[0]?.text || '{}';
      // Extract JSON from response (Claude might include extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      return {
        summary: 'Analysis completed but response parsing failed.',
        keyTerms: [],
        risks: [],
        obligations: [],
        clauses: [],
        confidence: 0,
      };
    }
  }

  async getAnalysis(id: string) {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
      include: {
        contract: {
          select: {
            id: true,
            name: true,
            partyName: true,
          },
        },
        document: {
          select: {
            id: true,
            originalName: true,
            version: true,
          },
        },
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!analysis) {
      throw new NotFoundException('Analysis not found');
    }

    return analysis;
  }

  async getAnalysesByContract(contractId: string) {
    return this.prisma.analysis.findMany({
      where: { contractId },
      orderBy: { createdAt: 'desc' },
      include: {
        document: {
          select: {
            id: true,
            originalName: true,
            version: true,
          },
        },
        requestedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
