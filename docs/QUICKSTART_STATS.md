# 🚀 Quick Start: Enable Lifetime Language Stats

## ⚡ 3-Step Setup (5 minutes)

### 1️⃣ Enable Workflow Permissions
```
GitHub.com → Your Repo → Settings → Actions → General
→ Select "Read and write permissions" 
→ Save
```

### 2️⃣ Create Output Branch
```bash
cd /home/omindu/Documents/OminduD
git checkout -b output
git push -u origin output
git checkout main
```

### 3️⃣ Run First Update
```
GitHub.com → Actions tab → "Generate Profile Stats"
→ Run workflow → Wait 2-3 min
```

## ✅ Done! 

Your language stats now show **lifetime usage** and will update **daily automatically**!

## 🎨 What Changed?

**Old:** Monthly language activity  
**New:** All-time language usage with these params:
- ✅ `count_private=true` - includes private repos
- ✅ `include_all_commits=true` - all commits counted
- ✅ `langs_count=8` - top 8 languages shown

## 📊 Optional: Advanced Stats

Want even more detailed language breakdowns?

1. Create a personal access token: https://github.com/settings/tokens/new
   - Select: `repo`, `user`, `read:org`
2. Add as secret `METRICS_TOKEN` in repo settings
3. Uncomment the metrics section in README.md (lines 85-91)

## 🔄 Updates

- **Automatic:** Every day at midnight UTC
- **Manual:** Actions tab → Run workflow
- **Cache:** May take 1-2 hours for GitHub to show new data

---

📚 **Full Guide:** See [docs/SETUP_LANGUAGE_STATS.md](./SETUP_LANGUAGE_STATS.md)
