with open("README.md", "r") as f:
    content = f.read()

# Replace the live Leetcode URL with local metrics
content = content.replace(
    '<img src="https://leetcard.jacoblin.cool/OminduD?theme=tokyonight&font=JetBrains%20Mono&ext=activity" alt="LeetCode Stats" width="48%" />',
    '<img src="./metrics-leetcode.svg" alt="LeetCode Stats" width="48%" />'
)

# Replace StackOverflow live URL with local metrics
content = content.replace(
    '<img src="https://github-readme-stackoverflow.vercel.app/?userID=YOUR_ID_HERE&theme=tokyonight&bg_color=1a1b26&hide_border=true&title_color=7aa2f7" alt="StackOverflow Stats" width="48%" />',
    '<img src="./metrics-stackoverflow.svg" alt="StackOverflow Stats" width="48%" />'
)

with open("README.md", "w") as f:
    f.write(content)

