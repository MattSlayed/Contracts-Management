import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AiAnalysisService } from './ai-analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai-analysis')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai-analysis')
export class AiAnalysisController {
  constructor(private readonly aiAnalysisService: AiAnalysisService) {}

  @Post()
  @ApiOperation({ summary: 'Start a new contract analysis' })
  @ApiResponse({ status: 201, description: 'Analysis started' })
  @ApiResponse({ status: 400, description: 'No document found for analysis' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  async createAnalysis(
    @Request() req: any,
    @Body() createAnalysisDto: CreateAnalysisDto,
  ) {
    return this.aiAnalysisService.analyzeContract(
      createAnalysisDto.contractId,
      createAnalysisDto.documentId || null,
      req.user.id,
      createAnalysisDto.type,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get analysis by ID' })
  @ApiResponse({ status: 200, description: 'Analysis details' })
  @ApiResponse({ status: 404, description: 'Analysis not found' })
  async getAnalysis(@Param('id', ParseUUIDPipe) id: string) {
    return this.aiAnalysisService.getAnalysis(id);
  }

  @Get('contract/:contractId')
  @ApiOperation({ summary: 'Get all analyses for a contract' })
  @ApiResponse({ status: 200, description: 'List of analyses' })
  async getAnalysesByContract(
    @Param('contractId', ParseUUIDPipe) contractId: string,
  ) {
    return this.aiAnalysisService.getAnalysesByContract(contractId);
  }
}
