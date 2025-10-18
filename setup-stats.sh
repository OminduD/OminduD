#!/bin/bash

# 🚀 Setup Script for Lifetime Language Statistics
# This script helps you push the changes and set up your GitHub profile

echo "📊 Setting up Lifetime Language Statistics..."
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: README.md not found. Please run this script from your repository root."
    exit 1
fi

echo "✅ Found README.md"
echo ""

# Stage all changes
echo "📝 Staging changes..."
git add .github/workflows/
git add docs/SETUP_LANGUAGE_STATS.md
git add docs/QUICKSTART_STATS.md
git add README.md

# Show what will be committed
echo ""
echo "📋 Files to be committed:"
git status --short

echo ""
read -p "🤔 Do you want to commit these changes? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Commit changes
    echo "💾 Committing changes..."
    git commit -m "feat: Add lifetime language statistics with auto-update workflows

- Add GitHub Actions workflows for daily stats updates
- Update README to show overall/lifetime language usage
- Add comprehensive setup documentation
- Configure metrics plugin for detailed language breakdown"

    echo ""
    echo "✅ Changes committed!"
    echo ""
    
    read -p "🚀 Push to GitHub? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 Pushing to GitHub..."
        git push origin main
        
        echo ""
        echo "✅ Pushed to main branch!"
        echo ""
        
        # Create output branch
        echo "🌿 Creating output branch for stats..."
        git checkout -b output 2>/dev/null || git checkout output
        git push -u origin output
        git checkout main
        
        echo ""
        echo "✅ Output branch created!"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "🎉 Setup Complete!"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📝 Next Steps:"
        echo ""
        echo "1. Enable workflow permissions:"
        echo "   → https://github.com/OminduD/OminduD/settings/actions"
        echo "   → Select 'Read and write permissions'"
        echo "   → Save"
        echo ""
        echo "2. Run the workflow manually (first time):"
        echo "   → https://github.com/OminduD/OminduD/actions"
        echo "   → Click 'Generate Profile Stats'"
        echo "   → Click 'Run workflow'"
        echo ""
        echo "3. Wait 2-3 minutes and check your profile!"
        echo ""
        echo "📚 For more details, see: docs/QUICKSTART_STATS.md"
        echo ""
    else
        echo "⏸️  Changes committed but not pushed."
        echo "💡 Run 'git push origin main' when ready."
    fi
else
    echo "⏸️  No changes committed."
    echo "💡 Review the changes and run this script again when ready."
fi
