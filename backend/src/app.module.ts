import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContractsModule } from './contracts/contracts.module';
import { DocumentsModule } from './documents/documents.module';
import { AiAnalysisModule } from './ai-analysis/ai-analysis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Global configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    // Database
    PrismaModule,
    // Feature modules
    AuthModule,
    ContractsModule,
    DocumentsModule,
    AiAnalysisModule,
  ],
})
export class AppModule {}
