import re

with open(".github/workflows/profile.yml", "r") as f:
    text = f.read()

# remove stargazers world map step
text = re.sub(r'      - name: Generate stargazers world map card.*?EOF\n', '', text, flags=re.DOTALL)

with open(".github/workflows/profile.yml", "w") as f:
    f.write(text)
