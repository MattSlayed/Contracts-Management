# Architecture Documentation

## NOVATEK Contract Manager - System Architecture

This document provides a comprehensive overview of the system architecture, design decisions, and technical implementation details for the NOVATEK Contract Management application.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Technology Stack](#technology-stack)
4. [Data Flow](#data-flow)
5. [Security Architecture](#security-architecture)
6. [AI Integration](#ai-integration)
7. [Database Schema](#database-schema)
8. [API Structure](#api-structure)
9. [Component Architecture](#component-architecture)
10. [Performance Considerations](#performance-considerations)
11. [Scalability](#scalability)
12. [Deployment Strategy](#deployment-strategy)

---

## System Overview

The NOVATEK Contract Manager is a full-stack web application built with Next.js 16 (App Router), featuring:

- **Frontend**: React-based SPA with server-side rendering
- **Backend**: Next.js API routes with serverless functions
- **Database**: PostgreSQL for relational data
- **File Storage**: AWS S3 for contract documents
- **AI Engine**: Anthropic Claude API for contract analysis

### Key Design Principles

1. **Component-Driven Architecture**: Modular, reusable UI components
2. **Type Safety**: Full TypeScript implementation
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Performance**: Optimized bundle size and lazy loading
5. **Security**: JWT authentication, role-based access control
6. **Scalability**: Serverless architecture for horizontal scaling

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js Frontend (React + TypeScript)                 │ │
│  │  - Dashboard, Contracts, AI Analysis, Analytics        │ │
│  │  - Tailwind CSS for styling                            │ │
│  │  - React Context for state management                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            ↓ ↑
                       HTTPS / API
                            ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Next.js API Routes (Serverless Functions)             │ │
│  │  - /api/contracts                                       │ │
│  │  - /api/ai-analysis                                     │ │
│  │  - /api/auth                                            │ │
│  │  - /api/users                                           │ │
│  │  - /api/obligations                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
          ↓                    ↓                    ↓
    ┌─────────┐          ┌──────────┐        ┌──────────┐
    │         │          │          │        │          │
    │ Claude  │          │   AWS    │        │PostgreSQL│
    │   API   │          │    S3    │        │ Database │
    │         │          │          │        │          │
    └─────────┘          └──────────┘        └──────────┘
   AI Analysis         File Storage      Data Persistence
```

---

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.1 | React framework with SSR/SSG |
| React | 19.2.0 | UI library |
| TypeScript | 5.9.3 | Type safety and developer experience |
| Tailwind CSS | 4.1.17 | Utility-first CSS framework |
| Google Fonts | Latest | Poppins & Inter fonts |

### Backend Technologies (To Be Implemented)

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | RESTful API endpoints |
| PostgreSQL | Primary database |
| Prisma / Drizzle | ORM for database operations |
| JWT | Authentication tokens |
| bcrypt | Password hashing |

### External Services

| Service | Purpose |
|---------|---------|
| Anthropic Claude | AI-powered contract analysis |
| AWS S3 | Document storage |
| SendGrid / AWS SES | Email notifications |
| Vercel | Hosting and deployment |

---

## Data Flow

### Contract Upload Flow

```
User → Upload Contract
   ↓
Frontend validates file
   ↓
API Route receives file
   ↓
Upload to S3 → Get URL
   ↓
Save metadata to PostgreSQL
   ↓
Trigger Claude AI analysis (async)
   ↓
Extract key terms, risks, obligations
   ↓
Update database with analysis results
   ↓
Notify user via WebSocket/polling
```

### AI Analysis Flow

```
User selects contract for analysis
   ↓
Frontend requests analysis
   ↓
API fetches contract text from S3
   ↓
Send contract to Claude API
   ↓
Claude processes and returns:
   - Summary
   - Key terms
   - Risks
   - Obligations
   - Clause analysis
   ↓
Store results in database
   ↓
Return to frontend for display
```

### Authentication Flow

```
User enters credentials
   ↓
API validates against database
   ↓
Generate JWT token
   ↓
Return token to client
   ↓
Client stores in httpOnly cookie
   ↓
Include token in subsequent requests
   ↓
API validates token on each request
```

---

## Security Architecture

### Authentication & Authorization

1. **JWT Tokens**
   - Stored in httpOnly cookies
   - 7-day expiration
   - Refresh token rotation

2. **Role-Based Access Control (RBAC)**
   ```typescript
   enum UserRole {
     ADMIN = 'admin',      // Full system access
     MANAGER = 'manager',  // Manage contracts & users
     USER = 'user',        // View & create contracts
     VIEWER = 'viewer'     // Read-only access
   }
   ```

3. **Password Security**
   - bcrypt hashing with salt rounds = 12
   - Minimum password requirements
   - Password reset flow with expiring tokens

### Data Security

1. **Encryption**
   - All data transmitted over HTTPS/TLS
   - Sensitive data encrypted at rest
   - Environment variables for secrets

2. **File Security**
   - Pre-signed URLs for S3 access (15-minute expiry)
   - File type validation on upload
   - Virus scanning integration (recommended)

3. **API Security**
   - Rate limiting: 100 requests per 15 minutes
   - CORS configuration
   - Input validation and sanitization
   - SQL injection prevention via ORM

### Compliance

- **GDPR Compliance**: Data export, deletion, consent management
- **POPIA Compliance**: South African data protection requirements
- **SOC 2 Type II**: Security controls and audit trails

---

## AI Integration

### Claude API Implementation

```typescript
// /src/lib/claude.ts

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeContract(contractText: string) {
  const response = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `
        Analyze the following contract and extract:
        1. Key parties and their roles
        2. Important dates (effective, expiry, milestones)
        3. Financial terms and values
        4. Obligations for each party
        5. Potential risks and red flags
        6. Non-standard clauses

        Contract:
        ${contractText}

        Return the analysis in structured JSON format.
      `,
    }],
  });

  return parseAnalysisResponse(response);
}

function parseAnalysisResponse(response: any) {
  // Parse Claude's response into structured data
  // Implementation details...
}
```

### AI Features

1. **Key Term Extraction**
   - Parties, dates, values, governing law
   - Confidence scores for each extraction

2. **Risk Assessment**
   - High/Medium/Low risk categorization
   - Specific clause references
   - Recommendations for mitigation

3. **Obligation Tracking**
   - Extract commitments for each party
   - Identify deadlines and milestones

4. **Clause Comparison**
   - Compare against industry standards
   - Identify non-standard provisions

---

## Database Schema

### Core Tables

```sql
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contracts Table
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  status VARCHAR(50) DEFAULT 'active',
  start_date DATE,
  expiry_date DATE,
  value DECIMAL(15, 2),
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_status (status),
  INDEX idx_expiry_date (expiry_date),
  INDEX idx_party (party)
);

-- Contract Analysis Table
CREATE TABLE contract_analysis (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  summary TEXT,
  risk_score DECIMAL(3, 1),
  analysis_data JSONB, -- Stores full Claude analysis
  analyzed_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_contract_id (contract_id)
);

-- Obligations Table
CREATE TABLE obligations (
  id SERIAL PRIMARY KEY,
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  party VARCHAR(255) NOT NULL,
  due_date DATE,
  priority VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  assigned_to INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_due_date (due_date),
  INDEX idx_status (status)
);

-- Tags Table (Many-to-Many with Contracts)
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) -- Hex color
);

CREATE TABLE contract_tags (
  contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (contract_id, tag_id)
);

-- Audit Log Table
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  changes JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

### Relationships

- Users → Contracts (One-to-Many: creator)
- Contracts → Analysis (One-to-One)
- Contracts → Obligations (One-to-Many)
- Contracts ↔ Tags (Many-to-Many)
- Users → Obligations (One-to-Many: assignee)

---

## API Structure

### REST API Endpoints

```
Authentication
POST   /api/auth/login          # User login
POST   /api/auth/logout         # User logout
POST   /api/auth/refresh        # Refresh JWT token
POST   /api/auth/reset-password # Password reset

Contracts
GET    /api/contracts           # List all contracts (with filters)
GET    /api/contracts/:id       # Get single contract
POST   /api/contracts           # Upload new contract
PUT    /api/contracts/:id       # Update contract
DELETE /api/contracts/:id       # Delete contract
GET    /api/contracts/:id/download # Download contract file

AI Analysis
POST   /api/ai/analyze          # Trigger AI analysis
GET    /api/ai/analysis/:contractId # Get analysis results
POST   /api/ai/summarize        # Get contract summary
POST   /api/ai/compare          # Compare contracts

Obligations
GET    /api/obligations         # List obligations
POST   /api/obligations         # Create obligation
PUT    /api/obligations/:id     # Update obligation
DELETE /api/obligations/:id     # Delete obligation

Analytics
GET    /api/analytics/dashboard # Dashboard metrics
GET    /api/analytics/trends    # Trend data
GET    /api/analytics/risks     # Risk distribution
POST   /api/analytics/export    # Export report

Users (Admin only)
GET    /api/users               # List users
POST   /api/users               # Create user
PUT    /api/users/:id           # Update user
DELETE /api/users/:id           # Delete user
```

---

## Component Architecture

### Component Hierarchy

```
App
├── Layout (Root)
│   ├── Fonts (Poppins, Inter)
│   └── Global Styles
│
├── AppLayout
│   ├── Sidebar
│   │   └── Navigation Links
│   └── Header
│       ├── Search Bar
│       ├── Notifications
│       └── User Menu
│
└── Pages
    ├── Dashboard
    │   ├── KPI Cards
    │   ├── Recent Contracts
    │   ├── Risk Alerts
    │   └── Upcoming Milestones
    │
    ├── Contracts
    │   ├── Filters & Search
    │   ├── Contract Table
    │   └── Upload Modal
    │
    ├── AI Analysis
    │   ├── Contract Selector
    │   ├── Summary Tab
    │   ├── Risks Tab
    │   ├── Obligations Tab
    │   └── Clauses Tab
    │
    ├── Analytics
    │   ├── Metrics Grid
    │   ├── Charts
    │   └── Reports
    │
    ├── Obligations
    │   ├── Stats Summary
    │   ├── List View
    │   └── Calendar View
    │
    └── Settings
        ├── Profile
        ├── Users
        ├── Notifications
        ├── Integrations
        └── Security
```

### UI Component Library

```
/src/components/ui/
├── Button.tsx       # Primary, secondary, outline, ghost variants
├── Input.tsx        # Text, email, password inputs with validation
├── TextArea.tsx     # Multi-line text input
├── Select.tsx       # Dropdown select component
├── Card.tsx         # Container with variants (default, bordered, elevated)
├── Badge.tsx        # Status indicators
├── Modal.tsx        # Dialog/modal component
├── Table.tsx        # Data table with sorting and filtering
├── Spinner.tsx      # Loading indicator
└── index.ts         # Export all components
```

---

## Performance Considerations

### Frontend Optimization

1. **Code Splitting**
   - Route-based splitting via Next.js
   - Dynamic imports for heavy components
   - Lazy loading for modals and dialogs

2. **Image Optimization**
   - Next.js Image component for automatic optimization
   - WebP format with fallbacks
   - Responsive images

3. **Caching Strategy**
   - Static page generation where possible
   - Client-side caching with SWR or React Query
   - CDN caching for static assets

### Backend Optimization

1. **Database**
   - Indexes on frequently queried fields
   - Connection pooling (20 connections)
   - Query optimization and pagination

2. **API Performance**
   - Response caching for read-heavy endpoints
   - Rate limiting to prevent abuse
   - Compression (gzip/brotli)

3. **File Handling**
   - Direct S3 uploads from client
   - Pre-signed URLs for downloads
   - Streaming for large files

---

## Scalability

### Horizontal Scaling

- **Serverless Functions**: Auto-scaling via Vercel/AWS Lambda
- **Database**: Read replicas for query distribution
- **File Storage**: S3 scales automatically
- **CDN**: CloudFlare/Vercel Edge Network

### Load Considerations

| Users | Contracts | Storage | Database Size | Monthly Cost (Est.) |
|-------|-----------|---------|---------------|---------------------|
| 100 | 10,000 | 100 GB | 10 GB | $200 |
| 500 | 50,000 | 500 GB | 50 GB | $800 |
| 1,000 | 100,000 | 1 TB | 100 GB | $1,500 |
| 5,000 | 500,000 | 5 TB | 500 GB | $5,000 |

---

## Deployment Strategy

### Development Environment
- Local development on `localhost:3000`
- Hot module reloading
- Development database instance

### Staging Environment
- Deployed to Vercel preview
- Test database with production-like data
- Full feature testing

### Production Environment
- Deployed to Vercel production
- Production database with backups
- Monitoring and alerting enabled
- CDN and edge caching active

### CI/CD Pipeline

```yaml
# GitHub Actions workflow
on: [push, pull_request]

jobs:
  test:
    - Lint code (ESLint)
    - Type check (TypeScript)
    - Run unit tests
    - Build application

  deploy-staging:
    - Deploy to staging environment
    - Run integration tests

  deploy-production:
    - Manual approval required
    - Deploy to production
    - Smoke tests
    - Monitor for errors
```

---

## Future Enhancements

1. **Real-time Collaboration**
   - WebSocket integration for live updates
   - Collaborative contract editing

2. **Advanced AI Features**
   - Contract generation from templates
   - Negotiation suggestion engine
   - Predictive analytics for renewals

3. **Mobile App**
   - React Native mobile application
   - Push notifications
   - Offline mode

4. **Enhanced Integrations**
   - Salesforce, SAP, Oracle integration
   - E-signature workflows (DocuSign, Adobe Sign)
   - ERP system connectors

---

**Document Version**: 1.0
**Last Updated**: January 2025
**Maintained By**: NOVATEK Development Team
