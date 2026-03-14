import json
repos = json.load(open('repos.json'))
langs = {}
for r in repos:
    l = r.get('language')
    if l:
        langs[l] = langs.get(l, 0) + 1
print("LANGUAGES:", sorted(langs.items(), key=lambda x: x[1], reverse=True))
