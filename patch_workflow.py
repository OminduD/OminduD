import re

with open(".github/workflows/profile.yml", "r") as f:
    content = f.read()

new_content = re.sub(r"      - name: Generate World Map.*?config_timezone: UTC\n", "", content, flags=re.DOTALL)

with open(".github/workflows/profile.yml", "w") as f:
    f.write(new_content)
