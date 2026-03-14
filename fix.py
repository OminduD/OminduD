import re

with open("README.md", "r") as f:
    content = f.read()

# Fix trophies
content = re.sub(r'src="https://github-profile-trophy\.vercel\.app/\?username=OminduDhttps:.*?column=7"', 'src="https://github-profile-trophy.vercel.app/?username=OminduD&theme=tokyonight&no-frame=true&no-bg=true&margin-w=15&row=1&column=7"', content)

# Remove Snake
snake_html = r"""<div align="center">
  <!-- Snake Animation relies on built-in GITHUB_TOKEN -->
  <picture>
    <source media="\(prefers-color-scheme: dark\)" srcset="github-snake-dark\.svg" />
    <source media="\(prefers-color-scheme: light\)" srcset="github-snake\.svg" />
    <img alt="github contribution grid snake animation" src="github-snake\.svg" width="98%" />
  </picture>
</div>

<br/>"""
content = re.sub(snake_html, '', content, flags=re.DOTALL)

# Insert LeetCode and StackOverflow
insert_after = r"""<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/\?username=OminduD&layout=compact&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7&text_color=c0caf5" alt="Top Languages" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/pin/\?username=OminduD&repo=OminduD&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7&text_color=c0caf5&icon_color=73daca" alt="Pinned Repo" width="48%" />
</div>

<br/>"""

ls_html = """<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=OminduD&layout=compact&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7&text_color=c0caf5" alt="Top Languages" width="48%" />
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=OminduD&repo=OminduD&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7&text_color=c0caf5&icon_color=73daca" alt="Pinned Repo" width="48%" />
</div>

<br/>

<div align="center">
  <img src="https://leetcard.jacoblin.cool/OminduD?theme=tokyonight&font=JetBrains%20Mono&ext=activity" alt="LeetCode Stats" width="48%" />
  <!-- Replace YOUR_ID_HERE with your stackoverflow numeric ID, e.g. 1234567 -->
  <img src="https://github-readme-stackoverflow.vercel.app/?userID=YOUR_ID_HERE&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7" alt="StackOverflow Stats" width="48%" />
</div>

<br/>"""

content = re.sub(insert_after, ls_html, content)

with open("README.md", "w") as f:
    f.write(content)
