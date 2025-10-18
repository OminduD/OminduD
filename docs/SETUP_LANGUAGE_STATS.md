# 📊 Setup Guide: Overall/Lifetime Language Usage Statistics

This guide will help you set up automatically updating lifetime language usage statistics on your GitHub profile.

## 🎯 What We've Set Up

I've configured your repository to show **overall/lifetime language usage** instead of just recent monthly statistics. The setup includes:

1. **GitHub Actions workflows** that run daily to update your stats
2. **Modified README** with improved language statistics
3. **Automated updates** so your stats stay current

## 🚀 Setup Instructions

### Step 1: Enable GitHub Actions

1. Go to your repository: `https://github.com/OminduD/OminduD`
2. Click on **Settings** → **Actions** → **General**
3. Under "Workflow permissions", select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Click **Save**

### Step 2: Create Required Secrets (Optional - For Advanced Features)

For the most comprehensive stats, you can optionally set up:

#### Option A: GitHub Metrics Token (Recommended)
1. Go to: `https://github.com/settings/tokens/new`
2. Name it: `METRICS_TOKEN`
3. Select scopes:
   - ✅ `repo` (all)
   - ✅ `user` (all)
   - ✅ `read:org`
4. Click **Generate token** and copy it
5. Go to your repo: `https://github.com/OminduD/OminduD/settings/secrets/actions`
6. Click **New repository secret**
7. Name: `METRICS_TOKEN`
8. Paste the token and save

#### Option B: WakaTime Integration (Optional)
If you use WakaTime for coding time tracking:

1. Get your WakaTime API key from: `https://wakatime.com/settings/account`
2. Add it as a secret named `WAKATIME_API_KEY` in your repository

### Step 3: Create an Output Branch

The workflows need an `output` branch to store generated statistics:

```bash
cd /home/omindu/Documents/OminduD
git checkout -b output
git push -u origin output
git checkout main
```

### Step 4: Run the Workflows

#### Manual Trigger (First Time):
1. Go to: `https://github.com/OminduD/OminduD/actions`
2. Click on **"Generate Profile Stats"** workflow
3. Click **Run workflow** → **Run workflow**
4. Wait for it to complete (2-3 minutes)

#### Automatic Updates:
The workflows will now run automatically every day at midnight UTC!

### Step 5: Verify It's Working

After the first workflow run:

1. Check the `output` branch: `https://github.com/OminduD/OminduD/tree/output`
2. You should see files like:
   - `pacman-contribution-graph.svg`
   - `pacman-contribution-graph-dark.svg`
   - `metrics.plugin.languages.svg` (if METRICS_TOKEN was set)

## 📈 What's Different Now?

### Before (Monthly Stats):
- ❌ Only showed recent language usage
- ❌ Changed frequently based on recent commits
- ❌ Didn't reflect your overall skills

### After (Lifetime Stats):
- ✅ Shows **all-time** language usage across all repos
- ✅ Includes private repositories (if you want)
- ✅ Updates daily automatically
- ✅ More accurate representation of your skills
- ✅ Weighted by actual code written, not just recent activity

## 🎨 Current Stats Implementation

Your README now uses:

```markdown
<!-- Standard stats with all-time commits -->
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=OminduD&layout=compact&theme=tokyonight&hide_border=true&langs_count=8&count_private=true&include_all_commits=true&exclude_repo=&card_width=320" />
```

**Key Parameters:**
- `count_private=true` - Includes your private repositories
- `include_all_commits=true` - Counts all commits, not just recent ones
- `langs_count=8` - Shows top 8 languages

## 🔧 Advanced Customization

### Show More Languages
Change `langs_count=8` to a higher number (e.g., `langs_count=12`)

### Exclude Specific Repositories
Add `&exclude_repo=repo1,repo2,repo3` to exclude certain repos from stats

### Use Detailed Metrics (After Setting METRICS_TOKEN)
Uncomment this section in your README:

```markdown
<div align="center">
  <a href="https://github.com/OminduD">
    <img src="https://raw.githubusercontent.com/OminduD/OminduD/output/metrics.plugin.languages.svg" alt="Overall Language Usage" loading="lazy" />
  </a>
</div>
```

This will show a much more detailed breakdown with:
- Percentage breakdown
- Recently used vs most-used languages
- In-depth analysis of 365 days of activity

## 🐛 Troubleshooting

### Workflow Fails
- Ensure "Read and write permissions" are enabled in Actions settings
- Make sure the `output` branch exists
- Check workflow logs for specific errors

### Stats Not Updating
- Verify workflows are running: `https://github.com/OminduD/OminduD/actions`
- Check if the `output` branch has recent commits
- Try manually triggering the workflow

### Stats Look Wrong
- GitHub caches can take 24 hours to update
- Try adding `&cache_seconds=1800` to force more frequent updates
- Clear browser cache

## 📝 Files Created

```
.github/
└── workflows/
    ├── profile-stats.yml      # Main stats generation workflow
    └── update-stats.yml        # Additional stats updates

docs/
└── SETUP_LANGUAGE_STATS.md    # This guide
```

## 🎉 What Happens Now?

1. **Daily at midnight UTC**: Workflows run automatically
2. **Stats are regenerated**: Fresh data from all your repositories
3. **README updates**: New stats are available (may need cache to clear)
4. **Zero maintenance**: It just works! 🚀

## 📚 Resources

- [GitHub README Stats](https://github.com/anuraghazra/github-readme-stats)
- [Metrics Action](https://github.com/lowlighter/metrics)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Need help?** Check the [GitHub Actions logs](https://github.com/OminduD/OminduD/actions) for detailed information.
