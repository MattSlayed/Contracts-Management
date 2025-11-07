# NOVATEK Contract Manager - Replit Deployment Guide

## 🚀 Replit-Optimized Configuration

This project has been optimized for deployment on Replit with the following configurations:

---

## 📋 What's Been Configured

### 1. **Port Configuration**
- **Development Server**: Runs on port `5000` (instead of default 3000)
- **Production Server**: Also runs on port `5000`
- **Host Binding**: `0.0.0.0` to allow external access in Replit environment

```json
// package.json
"scripts": {
  "dev": "next dev -p 5000 -H 0.0.0.0",
  "start": "next start -p 5000 -H 0.0.0.0"
}
```

### 2. **Tailwind CSS v4**
- Migrated to Tailwind CSS v4 with modern `@import` and `@theme` directives
- Using `@tailwindcss/postcss` plugin for better performance
- Theme configuration now lives in CSS using `@theme` directive
- Removed legacy `tailwind.config.ts` file

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #0A2540;
  /* ... other NOVATEK brand colors */
}
```

### 3. **Next.js Image Configuration**
- Configured to allow images from Replit domains
- Supports both `*.replit.dev` and `*.repl.co` domains
- Uses modern `remotePatterns` API

```javascript
// next.config.js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.replit.dev' },
    { protocol: 'https', hostname: '*.repl.co' },
    { protocol: 'http', hostname: 'localhost' }
  ]
}
```

### 4. **Environment Variables**
- All environment variables updated to use port 5000
- See `.env.example` for complete configuration

---

## 🔧 Replit Setup Instructions

### Step 1: Import Repository

1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Enter repository URL: `https://github.com/MattSlayed/Contracts-Management`
5. Click "Import from GitHub"

### Step 2: Configure Environment Variables

In Replit's "Secrets" tab (Tools → Secrets), add:

```env
# Required for AI Features
ANTHROPIC_API_KEY=your_claude_api_key_here

# Required for Database (if using)
DATABASE_URL=your_database_connection_string

# Required for File Storage (if using)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your_bucket_name
```

### Step 3: Install Dependencies

Replit will automatically detect `package.json` and install dependencies. If not, run:

```bash
npm install
```

### Step 4: Start Development Server

Click the "Run" button or execute:

```bash
npm run dev
```

Your app will be available at: `https://your-repl-name.your-username.repl.co`

---

## 🌐 Deployment Options

### Option 1: Replit Autoscale Deployment (Recommended)

1. Click "Deploy" in the Replit interface
2. Select "Autoscale"
3. Configure deployment settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Port**: 5000 (already configured)
4. Click "Deploy"

Your production app will be available at: `https://your-app-name.replit.app`

### Option 2: Reserved VM Deployment

1. Click "Deploy" → "Reserved VM"
2. Follow the deployment wizard
3. Your app will have dedicated resources and a static URL

---

## 🔍 Replit-Specific Features

### Port 5000
- Replit requires specific port configurations
- Port 5000 is configured for both dev and production
- Host `0.0.0.0` ensures external accessibility

### File Persistence
- Files in the Replit workspace persist automatically
- Consider using external storage (S3) for production uploads
- Database should use external service (PostgreSQL/MongoDB)

### Environment Variables
- Use Replit's Secrets feature for sensitive data
- Never commit `.env.local` to git
- `.env.example` serves as a template

---

## 📊 Performance Considerations

### On Replit

**Free Tier:**
- Repls sleep after inactivity
- Cold start may take 10-30 seconds
- Shared resources with other users

**Paid Tiers (Hacker/Pro):**
- Always-on repls available
- Faster performance
- More CPU/RAM allocation

### Optimization Tips

1. **Enable Production Mode**
   ```bash
   npm run build
   npm run start
   ```

2. **Use Replit Database** (Built-in Key-Value Store)
   ```javascript
   const Database = require("@replit/database");
   const db = new Database();
   ```

3. **Monitor Performance**
   - Check Replit's built-in metrics
   - Monitor bundle size with `npm run build`
   - Use Next.js built-in performance monitoring

---

## 🐛 Troubleshooting

### Issue: Port Already in Use
**Solution**: Replit automatically handles port conflicts. If issues persist, try:
```bash
pkill -f "next dev"
npm run dev
```

### Issue: Tailwind Styles Not Loading
**Solution**: Clear Next.js cache and rebuild:
```bash
rm -rf .next
npm run build
npm run dev
```

### Issue: Module Not Found
**Solution**: Reinstall dependencies:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Issue: Images Not Loading
**Solution**: Verify image domains in `next.config.js` and ensure images are hosted on allowed domains.

---

## 🔐 Security on Replit

### Best Practices

1. **Use Secrets for Sensitive Data**
   - Never hardcode API keys
   - Use Replit's Secrets feature
   - Environment variables are encrypted

2. **Enable Authentication**
   - Implement proper JWT authentication
   - Use secure session management
   - Configure CORS appropriately

3. **Database Security**
   - Use external database with SSL
   - Enable connection pooling
   - Implement proper access controls

4. **File Upload Security**
   - Validate file types
   - Limit file sizes
   - Use external storage (S3)

---

## 📚 Additional Resources

- **Replit Documentation**: https://docs.replit.com/
- **Next.js on Replit**: https://docs.replit.com/tutorials/nodejs/nextjs
- **NOVATEK Contract Manager Docs**: See `README.md`
- **Architecture Guide**: See `ARCHITECTURE.md`

---

## 🆘 Support

### Replit-Specific Issues
- Check Replit Community: https://ask.replit.com/
- Replit Discord: https://replit.com/discord
- Replit Support: https://replit.com/support

### Application Issues
- GitHub Issues: https://github.com/MattSlayed/Contracts-Management/issues
- Documentation: `README.md`, `ARCHITECTURE.md`, `QUICKSTART.md`

---

## ✅ Deployment Checklist

Before deploying to production on Replit:

- [ ] All environment variables configured in Secrets
- [ ] Database connection tested and working
- [ ] Claude API key configured and valid
- [ ] File storage (S3) configured if using uploads
- [ ] Production build tested locally (`npm run build && npm run start`)
- [ ] Error handling implemented
- [ ] Security measures in place (authentication, CORS, input validation)
- [ ] Performance optimized (image optimization, code splitting)
- [ ] Analytics/monitoring configured
- [ ] Backup strategy in place

---

## 🎉 You're Ready!

Your NOVATEK Contract Manager is now fully configured for Replit deployment!

**Quick Start on Replit:**
```bash
npm install
npm run dev
```

**Production Deployment:**
```bash
npm run build
npm run start
```

Visit your Replit URL to see the application running!

---

**Built with ❤️ by NOVATEK LLC (PTY) LTD**
**Optimized for Replit Deployment**
