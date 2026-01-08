import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createReadStream, promises as fs } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async uploadDocument(
    contractId: string,
    userId: string,
    file: Express.Multer.File,
  ) {
    // Verify contract exists
    const contract = await this.prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      // Clean up uploaded file
      await fs.unlink(file.path).catch(() => {});
      throw new NotFoundException('Contract not found');
    }

    // Calculate file checksum
    const checksum = await this.calculateChecksum(file.path);

    // Get current version
    const latestDoc = await this.prisma.document.findFirst({
      where: { contractId, isLatest: true },
      orderBy: { version: 'desc' },
    });

    const version = latestDoc ? latestDoc.version + 1 : 1;

    // Mark previous versions as not latest
    if (latestDoc) {
      await this.prisma.document.updateMany({
        where: { contractId },
        data: { isLatest: false },
      });
    }

    // Create document record
    const document = await this.prisma.document.create({
      data: {
        fileName: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size,
        storagePath: file.path,
        version,
        isLatest: true,
        checksum,
        contractId,
        uploadedById: userId,
      },
      include: {
        contract: {
          select: {
            id: true,
            name: true,
          },
        },
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return document;
  }

  async findByContract(contractId: string) {
    return this.prisma.document.findMany({
      where: { contractId },
      orderBy: [{ version: 'desc' }],
      include: {
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
      include: {
        contract: {
          select: {
            id: true,
            name: true,
          },
        },
        uploadedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async getDocumentStream(id: string) {
    const document = await this.findOne(id);

    // Check if file exists
    try {
      await fs.access(document.storagePath);
    } catch {
      throw new NotFoundException('Document file not found on disk');
    }

    return {
      stream: createReadStream(document.storagePath),
      document,
    };
  }

  async delete(id: string) {
    const document = await this.findOne(id);

    // Delete file from disk
    try {
      await fs.unlink(document.storagePath);
    } catch (error) {
      console.error(`Failed to delete file: ${document.storagePath}`, error);
    }

    // Delete from database
    await this.prisma.document.delete({
      where: { id },
    });

    // If this was the latest version, mark the previous version as latest
    if (document.isLatest) {
      const previousVersion = await this.prisma.document.findFirst({
        where: { contractId: document.contractId },
        orderBy: { version: 'desc' },
      });

      if (previousVersion) {
        await this.prisma.document.update({
          where: { id: previousVersion.id },
          data: { isLatest: true },
        });
      }
    }

    return { message: 'Document deleted successfully' };
  }

  private async calculateChecksum(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = createHash('sha256');
      const stream = createReadStream(filePath);

      stream.on('data', (data) => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', (error) => reject(error));
    });
  }
}
