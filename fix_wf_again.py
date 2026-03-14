lines = open("prof2.txt").read().split("\n")

out = []
found_commit = False
for line in lines:
    line = line.split(": ", 1)[-1] if ": " in line and line.split(": ")[0].isdigit() else line
    if "output_action: none" in line and ("metrics-leetcode" not in ''.join(out) and "metrics-stackoverflow" not in ''.join(out)):
        continue
    out.append(line)

