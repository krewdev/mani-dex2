# ManiDex Deployment Guide - Vercel

This guide will walk you through deploying both the backend and frontend of ManiDex to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have an account
2. **Node.js**: Ensure you have Node.js 18+ installed
3. **Git**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Backend Deployment

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Select the `/backend` directory as the root directory
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `.`
   - Install Command: `npm install`

4. **Environment Variables**:
   - Add these in the Vercel dashboard:
     ```
     NODE_ENV=production
     PORT=3000
     HOST=0.0.0.0
     ```

5. **Deploy**: Click "Deploy" and wait for completion

6. **Note the URL**: Your backend will be available at something like:
   `https://your-project-backend.vercel.app`

### Frontend Deployment

1. **Update Environment Variable**:
   - Edit `/frontend/.env`:
     ```
     REACT_APP_BACKEND_URL=https://your-project-backend.vercel.app
     ```
   - Commit and push the change

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) again
   - Import the same repository
   - Select the `/frontend` directory as the root directory

3. **Configure Build Settings**:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Environment Variables**:
   - Add in Vercel dashboard:
     ```
     REACT_APP_BACKEND_URL=https://your-project-backend.vercel.app
     ```

5. **Deploy**: Click "Deploy"

6. **Access Your App**: Your frontend will be at:
   `https://your-project-frontend.vercel.app`

## Option 2: Deploy via Vercel CLI

### Installation

```bash
npm i -g vercel
```

### Backend Deployment

```bash
cd backend

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

When prompted:
- Set up and deploy: Y
- Which scope: Select your account
- Link to existing project?: N
- Project name: your-project-backend
- In which directory: ./
- Override settings?: N

### Frontend Deployment

```bash
cd ../frontend

# Update .env with your backend URL
echo "REACT_APP_BACKEND_URL=https://your-project-backend.vercel.app" > .env

# Deploy
vercel

# For production
vercel --prod
```

## Post-Deployment Configuration

### 1. Custom Domains (Optional)

In Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 2. Environment Variables

For sensitive data:
1. Go to Project Settings → Environment Variables
2. Add variables for Production/Preview/Development
3. Redeploy to apply changes

### 3. CORS Configuration

If you encounter CORS issues:

1. Update `/backend/src/app.ts`:
   ```typescript
   app.use(cors({
     origin: [
       'https://your-frontend.vercel.app',
       'http://localhost:3000',
       // Add other allowed origins
     ],
     credentials: true
   }));
   ```

2. Commit, push, and Vercel will auto-deploy

## Monitoring & Logs

### View Logs
- Vercel Dashboard → Functions → View logs
- Or use CLI: `vercel logs`

### Analytics
- Enable Vercel Analytics in project settings
- Monitor performance and usage

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **500 Errors**
   - Check function logs
   - Verify environment variables
   - Ensure database connections (if applicable)

3. **CORS Errors**
   - Update CORS configuration
   - Check origin URLs
   - Verify API endpoints

4. **Environment Variables Not Working**
   - Redeploy after adding variables
   - Check variable names (REACT_APP_ prefix for React)
   - Verify in deployment settings

### Debugging Commands

```bash
# Check deployment status
vercel ls

# View recent deployments
vercel list

# Inspect a deployment
vercel inspect [url]

# View logs
vercel logs [url]
```

## Continuous Deployment

Vercel automatically deploys:
- Production: When you push to `main` branch
- Preview: For pull requests

To disable auto-deploy:
1. Go to Project Settings → Git
2. Disable "Production Branch" deployments

## Performance Optimization

1. **Enable Caching**:
   - Vercel automatically caches static assets
   - Configure cache headers for API responses

2. **Edge Functions**:
   - Consider using Edge Functions for better performance
   - Available in Vercel's Pro plan

3. **Image Optimization**:
   - Use Vercel's Image Optimization
   - Import images properly in React

## Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files
   - Use Vercel's environment variables
   - Different variables for dev/staging/prod

2. **API Keys**:
   - Store in environment variables
   - Rotate regularly
   - Use Vercel's encrypted secrets

3. **Headers**:
   - Configure security headers in `vercel.json`
   - Enable HSTS, CSP, etc.

## Rollback Deployments

If something goes wrong:

1. **Via Dashboard**:
   - Go to Deployments
   - Find previous working deployment
   - Click "..." → "Promote to Production"

2. **Via CLI**:
   ```bash
   vercel rollback [deployment-url]
   ```

## Next Steps

1. **Set up monitoring**: Integrate with services like Sentry
2. **Add CI/CD**: GitHub Actions for testing before deploy
3. **Configure staging**: Separate environment for testing
4. **Set up database**: Add persistent storage
5. **Enable analytics**: Track user behavior

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Support**: [vercel.com/support](https://vercel.com/support)
- **Community**: [github.com/vercel/vercel](https://github.com/vercel/vercel)

---

**Quick Deploy Commands Summary**:

```bash
# Backend
cd backend && vercel --prod

# Frontend (after updating .env)
cd frontend && vercel --prod
```

Your app should now be live! 🎉