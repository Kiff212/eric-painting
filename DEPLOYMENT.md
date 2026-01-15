# Deployment Guide for Eric's Pro Painting

This guide will help you successfully deploy your Next.js application to Vercel.

## 1. Prerequisites
- A Vercel account (https://vercel.com/signup).
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## 2. Standard Vercel Configuration
When importing your project into Vercel, the default settings for Next.js are usually sufficient. However, if you need to manually configure them, verify the following:

- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (leave empty unless your Next.js app is in a subfolder)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## 3. Environment Variables
Your project currently does not appear to rely on critical secret environment variables for the build process, but if you add API keys or database URLs later, you must add them here:
1. Go to your Vercel Project Dashboard.
2. Navigate to **Settings** > **Environment Variables**.
3. Add key-value pairs (e.g., `DATABASE_URL`, `NEXT_PUBLIC_API_KEY`).

## 4. Troubleshooting Common Issues

### "Node.js Version Mismatch"
We have added an `"engines"` field to your `package.json` to enforce Node.js >= 20.0.0. Vercel should automatically detect this and select the appropriate Node.js version.
- **Verification**: In Vercel, go to **Settings** > **General** > **Node.js Version** and ensure it is set to **20.x** or **22.x**.

### "Build Failed"
If the build fails on Vercel but works locally:
- Check the **Build Logs** in Vercel for specific error messages.
- Ensure all dependencies are in `dependencies`, not just `devDependencies` if they are needed at runtime (though Next.js bundles most things).
- Verify that you are not committing the `.next` or `node_modules` folders to Git (your `.gitignore` handles this correctly).

### "404 Not Found" on Assets
Ensure all your images and static assets are in the `public/` directory and referenced with a leading slash (e.g., `/images/logo.png`).
