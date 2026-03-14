import re

with open("README.md", "r") as f:
    content = f.read()

# Replace all lecoq URLs with reliable ones or keep only the necessary local svg
