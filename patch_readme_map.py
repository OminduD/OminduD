import re

with open("README.md", "r") as f:
    content = f.read()

new_content = """<h2 align="center"><font color="#7aa2f7">🗺️ 3D Contribution Landscape</font></h2>

<div align="center">
  <!-- GitHub Action Generated 3D Map -->
  <img src="./profile-3d-contrib/profile-night-view.svg" alt="3D Isometric Commit Calendar" width="98%" />
  <br/><br/>
  <!-- GitHub Action Generated World Map -->
  <img src="./world-map.svg" alt="Followers World Map" width="98%" />
</div>"""

content = content.replace("""<h2 align="center"><font color="#7aa2f7">🗺️ 3D Contribution Landscape</font></h2>

<div align="center">
  <!-- GitHub Action Generated 3D Map -->
  <img src="./profile-3d-contrib/profile-night-view.svg" alt="3D Isometric Commit Calendar" width="98%" />
</div>""", new_content)

with open("README.md", "w") as f:
    f.write(content)

