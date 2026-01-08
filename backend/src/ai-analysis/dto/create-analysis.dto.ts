import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AnalysisType {
  FULL_ANALYSIS = 'FULL_ANALYSIS',
  RISK_ASSESSMENT = 'RISK_ASSESSMENT',
  KEY_TERMS_EXTRACTION = 'KEY_TERMS_EXTRACTION',
  OBLIGATION_EXTRACTION = 'OBLIGATION_EXTRACTION',
  CLAUSE_ANALYSIS = 'CLAUSE_ANALYSIS',
  SUMMARY_ONLY = 'SUMMARY_ONLY',
  COMPARISON = 'COMPARISON',
}

export class CreateAnalysisDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  contractId: string;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440001' })
  @IsOptional()
  @IsUUID()
  documentId?: string;

  @ApiPropertyOptional({ enum: AnalysisType, example: AnalysisType.FULL_ANALYSIS })
  @IsOptional()
  @IsEnum(AnalysisType)
  type?: AnalysisType = AnalysisType.FULL_ANALYSIS;
}
