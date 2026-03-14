import urllib.request
try:
    print(len(urllib.request.urlopen("https://example.com").read()))
except Exception as e:
    print("Error:", e)
