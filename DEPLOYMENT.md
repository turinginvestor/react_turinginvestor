# Deployment Instructions for Render

## Prerequisites
1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Render account (sign up at https://render.com)

## Step-by-Step Deployment

### Option 1: Using Render Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Sign in or create an account

3. **Create a New Static Site**
   - Click "New +" button
   - Select "Static Site"

4. **Connect Your Repository**
   - Connect your GitHub account if not already connected
   - Select your repository: `react_turinginvestor`
   - Click "Connect"

5. **Configure Build Settings**
   - **Name**: `turing-investor` (or any name you prefer)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `.` if needed)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment**: `Static Site`

6. **Deploy**
   - Click "Create Static Site"
   - Render will automatically:
     - Install dependencies
     - Build your app
     - Deploy it

7. **Get Your URL**
   - Once deployment completes, you'll get a URL like: `https://turing-investor.onrender.com`
   - Your site is live!

### Option 2: Using render.yaml (Automated)

If you've already added `render.yaml` to your repo:

1. **Push your code to GitHub** (including render.yaml)
2. **Go to Render Dashboard**
3. **Create New Static Site**
4. **Connect Repository** - Render will automatically detect `render.yaml`
5. **Deploy** - Settings will be auto-configured from `render.yaml`

## Important Notes

### Environment Variables
If you need to change the API URL in the future, you can add environment variables in Render:
- Go to your service → Environment
- Add: `VITE_API_BASE_URL` = `https://ampyfin-website-pyj4.onrender.com`

Then update `src/services/api.js` to use:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://ampyfin-website-pyj4.onrender.com'
```

### Custom Domain (Optional)
1. Go to your service → Settings
2. Click "Add Custom Domain"
3. Follow the DNS configuration instructions

### Automatic Deployments
- Render automatically deploys on every push to your main branch
- You can disable this in Settings → Auto-Deploy

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure `package.json` has correct build script
- Verify all dependencies are listed in `package.json`

### 404 Errors on Refresh
- The `render.yaml` includes a rewrite rule for React Router
- If issues persist, ensure your service type is "Static Site"

### API Not Working
- Check CORS settings on your backend API
- Verify API URL is correct in `src/services/api.js`

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (Home, ETF Comparator, Portfolio Builder, Intersection Analyzer)
- [ ] API calls are working
- [ ] Dark/Light mode toggle works
- [ ] No console errors
- [ ] Mobile responsive design works

