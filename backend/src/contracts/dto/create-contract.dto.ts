import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsArray,
  MaxLength,
  IsEmail,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum ContractType {
  SERVICE_AGREEMENT = 'SERVICE_AGREEMENT',
  LICENSE = 'LICENSE',
  PROFESSIONAL_SERVICES = 'PROFESSIONAL_SERVICES',
  REAL_ESTATE = 'REAL_ESTATE',
  EMPLOYMENT = 'EMPLOYMENT',
  NDA = 'NDA',
  PARTNERSHIP = 'PARTNERSHIP',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
  OTHER = 'OTHER',
}

export enum ContractStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  EXPIRING_SOON = 'EXPIRING_SOON',
  EXPIRED = 'EXPIRED',
  TERMINATED = 'TERMINATED',
  RENEWED = 'RENEWED',
}

export class CreateContractDto {
  @ApiProperty({ example: 'Vendor Service Agreement' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Service agreement for vendor management services' })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({ example: 'Acme Corp' })
  @IsString()
  @MaxLength(255)
  partyName: string;

  @ApiPropertyOptional({ example: 'contact@acmecorp.com' })
  @IsOptional()
  @IsEmail()
  partyEmail?: string;

  @ApiProperty({ enum: ContractType, example: ContractType.SERVICE_AGREEMENT })
  @IsEnum(ContractType)
  type: ContractType;

  @ApiPropertyOptional({ enum: ContractStatus, example: ContractStatus.DRAFT })
  @IsOptional()
  @IsEnum(ContractStatus)
  status?: ContractStatus;

  @ApiPropertyOptional({ example: 125000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  value?: number;

  @ApiPropertyOptional({ example: 'USD' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ example: '2025-10-01' })
  @IsOptional()
  @IsDateString()
  renewalDate?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  autoRenewal?: boolean;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  renewalNotice?: number;

  @ApiPropertyOptional({ example: ['Vendor', 'Critical'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
