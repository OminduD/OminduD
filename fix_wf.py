lines = open(".github/workflows/profile.yml").read().split("\n")

# Extract the segments
checkout_to_3d = lines[15:27]
leetcode_stack = lines[28:64]
user_acct_overview = lines[65:74] + lines[76:77]  # omit output_action
repo_license = lines[78:88] + lines[90:91]  # omit output_action
git_commit = lines[92:96]

new_lines = lines[:15] + \
    checkout_to_3d + \
    git_commit + \
    [""] + \
    leetcode_stack + \
    user_acct_overview + \
    [""] + \
    repo_license

with open(".github/workflows/profile.yml", "w") as f:
    f.write("\n".join(new_lines))

