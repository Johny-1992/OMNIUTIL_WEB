#!/bin/bash

# OMNIUTIL Deploy Script
# Automates the deployment process for omniutil-web.vercel.app

set -e  # Exit on any error

echo "🚀 Starting OMNIUTIL deployment process..."

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Deploy: Sync with omniutil-web.vercel.app content + UI updates"
    echo "✅ Changes committed"
else
    echo "ℹ️  No uncommitted changes to commit"
fi

# Switch to main branch
echo "🔄 Switching to main branch..."
git checkout main
git pull origin main

# Merge current branch into main
echo "🔀 Merging $CURRENT_BRANCH into main..."
git merge $CURRENT_BRANCH --no-edit

# Push to main branch
echo "⬆️  Pushing to main branch..."
git push origin main
echo "✅ Pushed to main"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "🎉 Deployment complete!"
echo "📍 Check your site at: https://omniutil-web.vercel.app/"
echo "🔍 Verify the content matches your requirements"