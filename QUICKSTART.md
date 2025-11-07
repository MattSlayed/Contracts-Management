# Quick Start Guide

## NOVATEK Contract Manager - Get Started in 5 Minutes

Welcome to the NOVATEK Contract Manager! This guide will help you get up and running quickly.

---

## ✅ Prerequisites Checklist

Before you begin, ensure you have:

- [x] Node.js 18.x or higher installed
- [x] npm or yarn package manager
- [x] A code editor (VS Code recommended)
- [ ] Anthropic Claude API key (for AI features)
- [ ] AWS S3 bucket (for file storage) - Optional for initial testing
- [ ] PostgreSQL database (or use mock data initially)

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

The project is already set up in:
```bash
cd C:\Users\matth\novatek-contract-manager
```

### Step 2: Dependencies are Already Installed

Dependencies have been installed. If you need to reinstall:
```bash
npm install
```

### Step 3: Start Development Server

The server is already running at **http://localhost:3000**

To start it manually in the future:
```bash
npm run dev
```

---

## 🎯 Quick Navigation

Once the server is running, visit these pages:

| Page | URL | Description |
|------|-----|-------------|
| **Home** | http://localhost:3000 | Redirects to Dashboard |
| **Dashboard** | http://localhost:3000/dashboard | KPI metrics and overview |
| **Contracts** | http://localhost:3000/contracts | Contract repository and management |
| **AI Analysis** | http://localhost:3000/ai-analysis | AI-powered contract analysis |
| **Analytics** | http://localhost:3000/analytics | Portfolio analytics and reporting |
| **Obligations** | http://localhost:3000/obligations | Track obligations and milestones |
| **Settings** | http://localhost:3000/settings | User and system settings |
| **Login** | http://localhost:3000/login | Authentication page |

---

## 🎨 What's Included

### ✅ Completed Features

#### 1. **Design System**
- Custom UI component library
- NOVATEK brand colors (Deep Ocean Blue palette)
- Poppins and Inter fonts
- Responsive layouts

#### 2. **Dashboard**
- KPI cards (Total Contracts, Expiring Soon, Pending Actions, Total Value)
- Recent contracts list
- Risk alerts widget
- Upcoming milestones

#### 3. **Contract Repository**
- Contract list with filtering and search
- Upload modal for new contracts
- Status badges (Active, Expiring, Pending)
- Contract type categorization

#### 4. **AI Analysis (Ready for Claude API)**
- Contract selection and analysis interface
- Summary and key terms extraction display
- Risk assessment with severity levels
- Obligations tracking
- Clause-by-clause analysis

#### 5. **Analytics Dashboard**
- Portfolio metrics and KPIs
- Contract status distribution
- Contract type breakdown
- Monthly trend visualization
- Top vendors by value
- Risk distribution

#### 6. **Obligations Management**
- List and calendar views
- Task status tracking (Upcoming, In Progress, Overdue)
- Priority levels (High, Medium, Low)
- Assignment to team members

#### 7. **Settings Panel**
- Profile management
- User management (RBAC)
- Notification preferences
- Integration settings
- Security settings

#### 8. **Authentication**
- Login page with JWT architecture
- Role-based access control ready
- Session management

---

## 📊 Mock Data

The application currently uses **mock data** for demonstration purposes:

- 2,847 total contracts
- Multiple contract types and statuses
- Sample AI analysis results
- User and obligation data

**To replace with real data**, you'll need to:
1. Set up a PostgreSQL database
2. Implement API routes (see `ARCHITECTURE.md`)
3. Connect to Claude API for AI features
4. Configure AWS S3 for file storage

---

## 🔧 Next Steps for Production

### 1. Database Setup

```bash
# Install PostgreSQL locally or use a cloud service
# Create database and run migrations (see ARCHITECTURE.md for schema)

# Update .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/contract_manager
```

### 2. Claude API Integration

```bash
# Get API key from https://console.anthropic.com/
# Update .env.local
ANTHROPIC_API_KEY=your_key_here
```

### 3. Implement API Routes

Create API endpoints in `/src/app/api/`:
- `/api/contracts` - Contract CRUD operations
- `/api/ai/analyze` - Claude AI integration
- `/api/auth` - Authentication endpoints
- `/api/users` - User management

### 4. File Storage Setup

```bash
# Configure AWS S3 or alternative
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your_bucket_name
```

---

## 🎨 Customization

### Brand Colors

Located in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#0A2540',  // Deep Ocean Blue
    light: '#1E4976',
    accent: '#2E5C8A',
  },
}
```

### Fonts

Configured in `src/app/layout.tsx` and `globals.css`:
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500, 600)

---

## 📚 Documentation

- **README.md** - Complete project documentation
- **ARCHITECTURE.md** - System architecture and technical details
- **.env.example** - Environment variable template
- **QUICKSTART.md** - This file

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Package Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 🎉 You're Ready!

Your NOVATEK Contract Manager is now running locally. Here's what you can do:

1. **Explore the UI** - Navigate through all pages to see the features
2. **Test Components** - Interact with buttons, forms, and modals
3. **Review Code** - Check out the component library in `/src/components/ui/`
4. **Read Documentation** - Review README.md and ARCHITECTURE.md
5. **Plan Integration** - Prepare for database and API implementation

---

## 📞 Need Help?

- **Documentation**: See README.md and ARCHITECTURE.md
- **Issues**: Check console logs and browser developer tools
- **API Integration**: Review examples in ARCHITECTURE.md
- **Support**: Contact NOVATEK development team

---

**Happy Coding! 🚀**

Built with ❤️ by NOVATEK LLC (PTY) LTD
