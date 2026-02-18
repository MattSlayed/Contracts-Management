# NOVATEK Contract Manager

## AI-Powered Contract Management for Enterprise Excellence

A comprehensive contract management application designed for NOVATEK LLC (PTY) LTD, featuring AI-powered analysis, risk identification, and lifecycle tracking for enterprise clients.

![NOVATEK Contract Manager](https://img.shields.io/badge/NOVATEK-Contract_Manager-0A2540?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [API Integration](#api-integration)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Core Functionality

#### 📁 Contract Repository
- **Centralized Storage**: Secure cloud-based contract storage
- **Advanced Search**: AI-powered semantic search across all contracts
- **Smart Filtering**: Filter by type, status, party, date range, and custom tags
- **Bulk Operations**: Upload, download, and manage multiple contracts
- **Version Control**: Track contract revisions and changes

#### 🤖 AI-Powered Analysis (Claude API)
- **Automatic Extraction**: Key terms, parties, dates, values, and obligations
- **Risk Identification**: AI detects potential legal and financial risks
- **Clause Comparison**: Compare clauses against industry standards
- **Contract Summarization**: Generate executive summaries
- **Non-Standard Detection**: Identify unusual or risky clauses

#### 📊 Analytics & Reporting
- **Portfolio Dashboard**: Real-time KPIs and metrics
- **Spending Analysis**: Track contract values and trends
- **Risk Visualization**: Heat maps and risk distribution
- **Custom Reports**: Generate tailored reports and exports
- **Trend Analysis**: Historical data and predictive insights

#### 📅 Lifecycle Management
- **Automated Alerts**: Renewal reminders and deadline notifications
- **Obligation Tracking**: Monitor commitments and milestones
- **Calendar Integration**: Visual timeline of important dates
- **Workflow Automation**: Approval workflows and task assignments

#### 👥 Collaboration & Security
- **Role-Based Access**: Admin, Manager, User, and Viewer roles
- **Team Notifications**: Real-time updates and activity feeds
- **Audit Logs**: Complete history of actions and changes
- **Comments & Annotations**: Collaborate on specific contracts

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Custom component library with NOVATEK branding
- **Fonts**: Poppins (headings), Inter (body text)

### Backend (To Be Implemented)
- **API Routes**: Next.js API routes with serverless functions
- **Database**: PostgreSQL (recommended) or MongoDB
- **File Storage**: AWS S3 / Google Cloud Storage
- **Authentication**: JWT with NextAuth.js or Auth0

### AI Integration
- **AI Provider**: Anthropic Claude API
- **Capabilities**:
  - Document parsing and OCR
  - Entity extraction (dates, parties, values, obligations)
  - Risk identification and assessment
  - Semantic search and summarization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/novatek/contract-manager.git
   cd contract-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
novatek-contract-manager/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/           # Dashboard page
│   │   ├── contracts/           # Contract repository
│   │   ├── ai-analysis/         # AI analysis interface
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── obligations/         # Obligations tracking
│   │   ├── settings/            # Settings panel
│   │   ├── login/               # Authentication
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Table.tsx
│   │   │   └── ...
│   │   ├── features/            # Feature-specific components
│   │   └── layout/              # Layout components
│   │       ├── Sidebar.tsx
│   │       ├── Header.tsx
│   │       └── AppLayout.tsx
│   ├── lib/                     # Utility functions and helpers
│   ├── hooks/                   # Custom React hooks
│   ├── contexts/                # React context providers
│   └── types/                   # TypeScript type definitions
├── public/                      # Static assets
│   ├── fonts/
│   └── images/
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (gitignored)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Project dependencies
└── README.md                    # This file
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Application
NEXT_PUBLIC_APP_NAME=NOVATEK Contract Manager
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (PostgreSQL)
DATABASE_URL=postgresql://username:password@localhost:5432/contract_manager
DATABASE_POOL_SIZE=20

# Anthropic Claude API
ANTHROPIC_API_KEY=your_claude_api_key_here
ANTHROPIC_MODEL=claude-3-sonnet-20240229

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
JWT_SECRET=your_jwt_secret_here

# File Storage (AWS S3 or Google Cloud Storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=novatek-contracts
AWS_REGION=us-east-1

# Email Service (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@novatek.com
SMTP_PASSWORD=your_email_password

# Feature Flags
NEXT_PUBLIC_ENABLE_AI_ANALYSIS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

**Note**: Never commit `.env.local` to version control. Use `.env.example` as a template.

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Format code (if prettier is configured)
npm run format
```

### Development Workflow

1. **Create a new branch** for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Test your changes** thoroughly

4. **Commit your changes** with descriptive messages
   ```bash
   git commit -m "feat: add contract export functionality"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** for review

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Configure environment variables** in the Vercel dashboard

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t novatek-contract-manager .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 novatek-contract-manager
   ```

### Traditional Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

---

## 🤖 API Integration

### Claude API Integration

The application uses the Anthropic Claude API for AI-powered contract analysis. To integrate:

1. **Get your API key** from [Anthropic Console](https://console.anthropic.com/)

2. **Add to environment variables**
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. **Example API call** (to be implemented in `/src/lib/claude.ts`):
   ```typescript
   import Anthropic from '@anthropic-ai/sdk';

   const anthropic = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY,
   });

   export async function analyzeContract(contractText: string) {
     const message = await anthropic.messages.create({
       model: 'claude-3-sonnet-20240229',
       max_tokens: 4096,
       messages: [{
         role: 'user',
         content: `Analyze this contract and extract key information...`,
       }],
     });

     return message.content;
   }
   ```

### Database Setup

**PostgreSQL** (Recommended):

```sql
-- Create database
CREATE DATABASE contract_manager;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contracts table
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  status VARCHAR(50),
  start_date DATE,
  expiry_date DATE,
  value DECIMAL(15, 2),
  file_url TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add more tables as needed...
```

---

## 🎨 Design System

### Brand Colors

```css
/* NOVATEK Brand Colors */
--primary: #0A2540          /* Deep Ocean Blue */
--primary-light: #1E4976    /* Ocean Blue Light */
--primary-accent: #2E5C8A   /* Accent Blue */
--neutral-bg: #F5F7FA       /* Neutral Gray */
--text-primary: #1A1A1A     /* Text Primary */
--text-secondary: #6B7280   /* Text Secondary */
```

### Typography

- **Headings**: Poppins (weights: 600, 700)
- **Body Text**: Inter (weights: 400, 500, 600)

### Component Usage

```tsx
import { Button, Card, Input, Badge } from '@/components/ui';

// Button
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Card
<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>

// Input
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  fullWidth
/>
```

---

## 📄 License

Copyright © 2025 NOVATEK LLC (PTY) LTD. All rights reserved.

This is proprietary software developed for NOVATEK LLC. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

---

## 📞 Support

For questions, issues, or support:

- **Email**: matthew@novatekllc.co.za
- **GitHub Issues**: [github.com/MattSlayed/Contracts-Management/issues](https://github.com/MattSlayed/Contracts-Management/issues)

---

## 👏 Acknowledgments

- **Next.js** team for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **NOVATEK team** for requirements and feedback

---

**Built with ❤️ by NOVATEK LLC (PTY) LTD**
