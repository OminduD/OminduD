import re

with open(".github/workflows/profile.yml", "r") as f:
    text = f.read()

# Need to place the new steps before the commit step
commit_step = """      - name: Commit updated SVGs
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(metrics): update profile 3D graphics"
"""

# Extract the new steps we just appended to the end of the file
new_steps_match = re.search(r'(      - name: Generate LeetCode card.*)', text, flags=re.DOTALL)
if new_steps_match:
    new_steps = new_steps_match.group(1)
    # Remove the new steps from the end
    text = text.replace(new_steps, "")
    
    # ensure commit step is removed from where it was
    text = text.replace(commit_step, "")
    
    # put new steps, then commit step
    text += new_steps + "\n" + commit_step

with open(".github/workflows/profile.yml", "w") as f:
    f.write(text)
