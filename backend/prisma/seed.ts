import { PrismaClient, UserRole, ContractType, ContractStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@novatek.com' },
    update: {},
    create: {
      email: 'admin@novatek.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    },
  });
  console.log('Created admin user:', admin.email);

  // Create demo user
  const userPassword = await bcrypt.hash('Demo123!', 12);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@novatek.com' },
    update: {},
    create: {
      email: 'demo@novatek.com',
      passwordHash: userPassword,
      firstName: 'Demo',
      lastName: 'User',
      role: UserRole.USER,
    },
  });
  console.log('Created demo user:', demoUser.email);

  // Create sample contracts
  const contracts = [
    {
      name: 'Vendor Service Agreement',
      partyName: 'Acme Corp',
      partyEmail: 'contracts@acmecorp.com',
      type: ContractType.SERVICE_AGREEMENT,
      status: ContractStatus.ACTIVE,
      value: 125000,
      currency: 'USD',
      startDate: new Date('2024-01-15'),
      expiryDate: new Date('2025-12-31'),
      tags: ['Vendor', 'Critical'],
      createdById: admin.id,
    },
    {
      name: 'Software License Agreement',
      partyName: 'TechSoft Solutions',
      partyEmail: 'licensing@techsoft.com',
      type: ContractType.LICENSE,
      status: ContractStatus.EXPIRING_SOON,
      value: 45000,
      currency: 'USD',
      startDate: new Date('2023-02-20'),
      expiryDate: new Date('2025-02-15'),
      tags: ['Software', 'IT'],
      createdById: admin.id,
    },
    {
      name: 'Consulting Services Contract',
      partyName: 'Global Consultants Inc',
      partyEmail: 'info@globalconsultants.com',
      type: ContractType.PROFESSIONAL_SERVICES,
      status: ContractStatus.ACTIVE,
      value: 230000,
      currency: 'USD',
      startDate: new Date('2024-07-01'),
      expiryDate: new Date('2026-06-30'),
      tags: ['Consulting', 'Strategic'],
      createdById: demoUser.id,
    },
    {
      name: 'Maintenance Agreement',
      partyName: 'ServicePro Ltd',
      partyEmail: 'support@servicepro.com',
      type: ContractType.SERVICE_AGREEMENT,
      status: ContractStatus.PENDING_APPROVAL,
      value: 18500,
      currency: 'USD',
      startDate: new Date('2024-10-01'),
      expiryDate: new Date('2025-09-20'),
      tags: ['Maintenance'],
      createdById: demoUser.id,
    },
    {
      name: 'Office Lease Agreement',
      partyName: 'Property Holdings LLC',
      partyEmail: 'leasing@propertyholdings.com',
      type: ContractType.REAL_ESTATE,
      status: ContractStatus.ACTIVE,
      value: 1200000,
      currency: 'USD',
      startDate: new Date('2023-01-01'),
      expiryDate: new Date('2028-12-31'),
      autoRenewal: true,
      renewalNotice: 90,
      tags: ['Real Estate', 'Long-term'],
      createdById: admin.id,
    },
  ];

  for (const contractData of contracts) {
    const contract = await prisma.contract.create({
      data: contractData,
    });
    console.log('Created contract:', contract.name);
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
