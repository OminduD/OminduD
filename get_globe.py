import urllib.request
import re
try:
    req = urllib.request.Request("https://www.revolvermaps.com/?target=enlarge", 
        headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req).read().decode("utf-8")
    match = re.search(r'i=([a-zA-Z0-9]+)', res)
    if match:
        print("FOUND:", match.group(1))
    else:
        print("NOT FOUND")
except Exception as e:
    print(e)
