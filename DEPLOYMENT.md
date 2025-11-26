# Deployment Guide

This guide walks you through deploying your e-vite app to GitHub Pages and Cloudflare Workers.

## Prerequisites

- GitHub account
- Cloudflare account (free tier works)
- GitHub repository created

## Step 1: Repository Setup

1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/evite.git
   git push -u origin main
   ```

## Step 2: Cloudflare Worker Setup

1. Log in to Cloudflare and get your Account ID:
   - Go to https://dash.cloudflare.com
   - Copy your Account ID from the right sidebar

2. Update `worker/wrangler.toml` with your Account ID

3. Create a Cloudflare API Token:
   - Go to https://dash.cloudflare.com/profile/api-tokens
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template
   - OR create a custom token with:
     - Permissions: `Account.Cloudflare Workers Scripts = Edit`
   - Copy the token (you won't see it again!)

4. Test local worker deployment:
   ```bash
   cd worker
   pnpm install
   pnpm wrangler login
   pnpm deploy
   ```

5. Note your worker URL (e.g., `https://evite-worker.YOUR_SUBDOMAIN.workers.dev`)

## Step 3: GitHub Repository Configuration

### Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Source", select "GitHub Actions"

### Set Repository Variables

1. Go to Settings > Secrets and variables > Actions > Variables tab
2. Click "New repository variable"
3. Add variable:
   - Name: `VITE_API_URL`
   - Value: Your Cloudflare Worker URL (from Step 2.5)
   - Example: `https://evite-worker.your-subdomain.workers.dev`

### Set Repository Secrets

1. Go to Settings > Secrets and variables > Actions > Secrets tab
2. Click "New repository secret"
3. Add secret:
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: Your Cloudflare API token (from Step 2.3)

## Step 4: Deploy

Push to main branch to trigger automatic deployment:

```bash
git push origin main
```

The GitHub Actions workflow will:
1. Build and deploy the frontend to GitHub Pages
2. Deploy the worker to Cloudflare Workers

Monitor the deployment:
- Go to Actions tab in your GitHub repository
- Watch the "Deploy E-vite App" workflow

## Step 5: Generate Invites

1. Update the invite generator script:
   ```bash
   # Edit scripts/generate-invites.ts
   # Replace USERNAME with your GitHub username
   # Update the guests array
   ```

2. Generate invite URLs:
   ```bash
   pnpm generate-invites
   ```

3. Share the generated URLs with your guests!

## Accessing Your App

After successful deployment:
- Frontend: `https://YOUR_USERNAME.github.io/evite`
- Worker API: `https://evite-worker.YOUR_SUBDOMAIN.workers.dev`

## Troubleshooting

### Frontend not loading
- Check that VITE_API_URL is set correctly in repository variables
- Ensure GitHub Pages is enabled and set to "GitHub Actions" source
- Check the Actions tab for build errors

### Worker deployment fails
- Verify CLOUDFLARE_API_TOKEN is set correctly
- Check that your API token has the right permissions
- Ensure Account ID is correct in worker/wrangler.toml

### CORS errors
- Verify the worker is deployed and accessible
- Check that the frontend is using the correct VITE_API_URL

## Manual Deployment

If you need to deploy manually:

### Frontend
```bash
pnpm install
pnpm build
# Upload dist/ folder to your hosting provider
```

### Worker
```bash
cd worker
pnpm install
pnpm wrangler deploy
```

## Updating the App

Simply push changes to the main branch:
```bash
git add .
git commit -m "Update app"
git push origin main
```

The workflow will automatically redeploy both frontend and worker.
