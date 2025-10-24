# GitHub Pages Deployment

## ✅ Current Status

Your app has been deployed to: **https://jaxxat1300.github.io/Present-Breathwork-APp/**

## 📋 Required GitHub Settings

**IMPORTANT:** You must enable GitHub Pages in your repository settings:

1. Go to: https://github.com/jaxxat1300/Present-Breathwork-APp/settings/pages
2. Under **"Build and deployment"** → **"Source"**, select:
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
3. Click **Save**
4. Wait 1-2 minutes for deployment

## 🔍 Troubleshooting

If the site shows a 404 or doesn't load:

### Check GitHub Pages is Enabled
```bash
# Visit this URL to check GitHub Pages settings:
https://github.com/jaxxat1300/Present-Breathwork-APp/settings/pages
```

### Verify the gh-pages branch exists
```bash
git fetch origin
git branch -a | grep gh-pages
```

### Check deployment status
- Go to: https://github.com/jaxxat1300/Present-Breathwork-APp/deployments
- Look for "github-pages" deployments
- Should show "Active" status

## 🚀 Deploy Updates

When you make changes to the app:

```bash
# 1. Build the app
npm run build

# 2. Commit changes
git add .
git commit -m "Your update message"
git push origin main

# 3. Deploy to GitHub Pages
git subtree push --prefix build origin gh-pages
```

## 📝 Important Notes

- **DO NOT** change `"homepage"` in `package.json` - it must be:
  ```json
  "homepage": "https://jaxxat1300.github.io/Present-Breathwork-APp"
  ```
  
- The `404.html` file enables client-side routing for the single-page app

- GitHub Pages may take 1-5 minutes to update after deployment

## 🔗 Useful Links

- Live Site: https://jaxxat1300.github.io/Present-Breathwork-APp/
- Repository: https://github.com/jaxxat1300/Present-Breathwork-APp
- Settings: https://github.com/jaxxat1300/Present-Breathwork-APp/settings/pages
- Deployments: https://github.com/jaxxat1300/Present-Breathwork-APp/deployments


