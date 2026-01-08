import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractFilterDto } from './dto/contract-filter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('contracts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'Contract created successfully' })
  create(@Request() req: any, @Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(req.user.id, createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contracts with pagination and filtering' })
  @ApiResponse({ status: 200, description: 'List of contracts' })
  findAll(@Request() req: any, @Query() filterDto: ContractFilterDto) {
    return this.contractsService.findAll(req.user.id, filterDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get contract statistics' })
  @ApiResponse({ status: 200, description: 'Contract statistics' })
  getStats(@Request() req: any) {
    return this.contractsService.getStats(req.user.id);
  }

  @Get('expiring')
  @ApiOperation({ summary: 'Get contracts expiring soon' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Days until expiry (default: 30)' })
  @ApiResponse({ status: 200, description: 'List of expiring contracts' })
  getExpiringContracts(@Query('days') days?: number) {
    return this.contractsService.getExpiringContracts(days || 30);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  @ApiResponse({ status: 200, description: 'Contract details' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.contractsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiResponse({ status: 200, description: 'Contract updated successfully' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: any,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(id, req.user.id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract' })
  @ApiResponse({ status: 200, description: 'Contract deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.contractsService.remove(id, req.user.id);
  }
}
