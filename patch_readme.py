import re

with open("README.md", "r") as f:
    content = f.read()

new_content = content.replace("🗺️ 3D Contribution Landscape", "🗺️ 3D Contribution Landscape & World Map")
new_content = new_content.replace("""<div align="center">
  <!-- GitHub Action Generated 3D Map -->
  <img src="./profile-3d-contrib/profile-night-view.svg" alt="3D Isometric Commit Calendar" width="98%" />
</div>""", """<div align="center">
  <!-- GitHub Action Generated 3D Map -->
  <img src="./profile-3d-contrib/profile-night-view.svg" alt="3D Isometric Commit Calendar" width="98%" />
  <br/><br/>
  <!-- RevolverMaps Visitor Globe -->
  <a href="https://www.revolvermaps.com/livestats/5c6igd6icu6/">
    <img src="https://jf.revolvermaps.com/h/c/5c6igd6icu6.png" width="500" height="250" alt="Visitor Map" />
  </a>
</div>""")

with open("README.md", "w") as f:
    f.write(new_content)
