import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractFilterDto } from './dto/contract-filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createContractDto: CreateContractDto) {
    return this.prisma.contract.create({
      data: {
        ...createContractDto,
        createdById: userId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findAll(userId: string, filterDto: ContractFilterDto) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      type,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filterDto;

    const skip = (page - 1) * limit;

    const where: Prisma.ContractWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { partyName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    const [contracts, total] = await Promise.all([
      this.prisma.contract.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          createdBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          _count: {
            select: {
              documents: true,
              analyses: true,
              obligations: true,
            },
          },
        },
      }),
      this.prisma.contract.count({ where }),
    ]);

    return {
      data: contracts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        documents: {
          where: { isLatest: true },
          orderBy: { createdAt: 'desc' },
        },
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
        obligations: {
          orderBy: [{ status: 'asc' }, { deadline: 'asc' }],
        },
        milestones: {
          orderBy: { dueDate: 'asc' },
        },
      },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract;
  }

  async update(id: string, userId: string, updateContractDto: UpdateContractDto) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return this.prisma.contract.update({
      where: { id },
      data: updateContractDto,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const contract = await this.prisma.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    await this.prisma.contract.delete({
      where: { id },
    });

    return { message: 'Contract deleted successfully' };
  }

  async getStats(userId: string) {
    const [
      totalContracts,
      activeContracts,
      expiringSoon,
      totalValue,
    ] = await Promise.all([
      this.prisma.contract.count(),
      this.prisma.contract.count({ where: { status: 'ACTIVE' } }),
      this.prisma.contract.count({
        where: {
          status: 'ACTIVE',
          expiryDate: {
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            gte: new Date(),
          },
        },
      }),
      this.prisma.contract.aggregate({
        _sum: { value: true },
        where: { status: { in: ['ACTIVE', 'EXPIRING_SOON'] } },
      }),
    ]);

    return {
      totalContracts,
      activeContracts,
      expiringSoon,
      totalValue: totalValue._sum.value || 0,
    };
  }

  async getExpiringContracts(days: number = 30) {
    const futureDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

    return this.prisma.contract.findMany({
      where: {
        status: 'ACTIVE',
        expiryDate: {
          lte: futureDate,
          gte: new Date(),
        },
      },
      orderBy: { expiryDate: 'asc' },
      include: {
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }
}
