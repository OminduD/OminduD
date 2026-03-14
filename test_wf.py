lines = open(".github/workflows/profile.yml").read().split("\n")
with open("profile_debug.txt", "w") as f:
    for i, line in enumerate(lines):
        f.write(f"{i}: {line}\n")
