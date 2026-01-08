import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Response,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload/:contractId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a document for a contract' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Document uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Invalid file type or size' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  async uploadDocument(
    @Param('contractId', ParseUUIDPipe) contractId: string,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.documentsService.uploadDocument(contractId, req.user.id, file);
  }

  @Get('contract/:contractId')
  @ApiOperation({ summary: 'Get all documents for a contract' })
  @ApiResponse({ status: 200, description: 'List of documents' })
  async findByContract(@Param('contractId', ParseUUIDPipe) contractId: string) {
    return this.documentsService.findByContract(contractId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document metadata' })
  @ApiResponse({ status: 200, description: 'Document metadata' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.findOne(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download a document' })
  @ApiResponse({ status: 200, description: 'Document file' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async download(
    @Param('id', ParseUUIDPipe) id: string,
    @Response() res: ExpressResponse,
  ) {
    const { stream, document } = await this.documentsService.getDocumentStream(id);

    res.set({
      'Content-Type': document.mimeType,
      'Content-Disposition': `attachment; filename="${document.originalName}"`,
      'Content-Length': document.fileSize,
    });

    stream.pipe(res);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiResponse({ status: 200, description: 'Document deleted successfully' })
  @ApiResponse({ status: 404, description: 'Document not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentsService.delete(id);
  }
}
