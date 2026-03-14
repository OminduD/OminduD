import re

with open(".github/workflows/profile.yml", "r") as f:
    content = f.read()

new_step = """
      - name: Generate World Map
        uses: lowlighter/metrics@latest
        continue-on-error: true
        with:
          filename: world-map.svg
          token: ${{ secrets.GITHUB_TOKEN }}
          base: ""
          plugin_stargazers: yes
          plugin_stargazers_worldmap: yes
          plugin_stargazers_worldmap_sample: 0
          config_timezone: UTC

"""
content = content.replace("      - name: Commit updated SVGs", new_step + "      - name: Commit updated SVGs")

with open(".github/workflows/profile.yml", "w") as f:
    f.write(content)
