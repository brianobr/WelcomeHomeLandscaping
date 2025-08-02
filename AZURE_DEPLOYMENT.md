# Azure Web App Deployment Guide

## Overview
This guide explains how to deploy the Welcome Home Landscaping website to Azure Web Apps.

## Prerequisites
1. Azure subscription with App Service capability
2. Node.js 18+ runtime selected in Azure App Service
3. PostgreSQL database (keep using Neon or migrate to Azure Database for PostgreSQL)

## Deployment Files Created
- `web.config` - IIS configuration for Node.js hosting
- `.deployment` - Azure deployment configuration
- `deploy.cmd` - Custom deployment script for build process

## Environment Variables Required in Azure
Set these in Azure App Service Configuration:

```
NODE_ENV=production
DATABASE_URL=[Your Neon PostgreSQL connection string]
PORT=[Auto-configured by Azure]
```

## Azure Web App Compatibility Analysis

### ✅ Compatible Features
- **Port Binding**: Application correctly uses `process.env.PORT` and binds to `0.0.0.0` in production
- **Static File Serving**: Express serves built Vite assets from `dist/public`
- **Build Process**: `npm run build` creates production-ready bundles
- **Database**: Neon PostgreSQL works from Azure (external connection)
- **ES Modules**: TypeScript builds to compatible Node.js format

### ⚠️ Potential Issues & Solutions

1. **Large Asset Files**
   - **Issue**: 56MB video files may cause deployment timeouts
   - **Solution**: ✅ Already replaced with optimized static background image

2. **File Paths**
   - **Issue**: Linux vs Windows path separators
   - **Solution**: ✅ Using `path.resolve()` throughout codebase

3. **Build Dependencies**
   - **Issue**: Dev dependencies needed for build process
   - **Solution**: ✅ Azure installs all deps during deployment

4. **IISNode Configuration**
   - **Issue**: Azure uses IISNode to host Node.js apps
   - **Solution**: ✅ Created `web.config` with proper routing

## Deployment Steps

1. **Prepare Repository**
   ```bash
   # Ensure all Azure config files are committed
   git add web.config .deployment deploy.cmd AZURE_DEPLOYMENT.md
   git commit -m "Add Azure deployment configuration"
   ```

2. **Create Azure Web App**
   - Runtime: Node.js 18 LTS
   - Operating System: Windows (for IISNode) or Linux
   - Pricing Tier: Basic B1 or higher recommended

3. **Configure Environment Variables**
   - Add `DATABASE_URL` from your Neon PostgreSQL instance
   - Set `NODE_ENV=production`

4. **Deploy via Azure**
   - Use GitHub Actions, Azure DevOps, or ZIP deployment
   - Azure will automatically run the build process

## Build Process Verification

The application follows Azure's expected build pattern:
1. `npm install` - Install dependencies
2. `npm run build` - Build frontend (Vite) and backend (ESBuild)
3. `npm start` - Run production server

**Output Structure:**
```
dist/
├── index.js          # Bundled Express server
└── public/           # Built Vite frontend assets
    ├── index.html
    ├── assets/
    └── [other static files]
```

## Performance Optimizations for Azure

1. **Static Assets**: All frontend assets built to `dist/public`
2. **Server Bundle**: Single `dist/index.js` file for faster startup
3. **Database**: External Neon PostgreSQL for reliability
4. **Caching**: Express serves static files with proper headers

## Monitoring & Troubleshooting

1. **Application Logs**: Available in Azure Portal under Monitoring > Log Stream
2. **Deployment Logs**: Check Deployment Center for build issues
3. **Performance**: Use Application Insights for monitoring

## Security Considerations

1. **Environment Variables**: Database credentials secured in Azure configuration
2. **Static Content**: Served via IIS for better performance
3. **HTTPS**: Automatic SSL termination by Azure App Service

## Alternative Deployment Options

If you encounter issues with Windows/IISNode:
1. **Linux App Service**: Switch to Linux runtime (simpler Node.js hosting)
2. **Container Deployment**: Use Docker for consistent environment
3. **Static Web Apps**: Deploy frontend to Azure Static Web Apps + API to Function Apps

---

**Status**: ✅ Application is Azure Web App ready with proper configuration files and optimizations.