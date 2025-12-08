import re

def resolve(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Resolve header
    if "{% include header.html %}" in content:
        with open("_includes/header.html", 'r') as f:
            header = f.read()
        content = content.replace("{% include header.html %}", header)

    # Resolve footer
    if "{% include footer.html %}" in content:
        with open("_includes/footer.html", 'r') as f:
            footer = f.read()
        content = content.replace("{% include footer.html %}", footer)

    # Resolve relative_url filter roughly for file:// verification
    content = content.replace("{{ '/index.html' | relative_url }}", "index_resolved.html")
    content = content.replace("{{ '/galeria.html' | relative_url }}", "galeria.html")
    # ... add others if needed or just strip it
    content = re.sub(r"\{\{ '?(.*?)'? \| relative_url \}\}", r"\1", content)

    # Strip front matter
    content = re.sub(r"^---\n.*?---\n", "", content, flags=re.DOTALL)

    return content

with open("index_resolved.html", "w") as f:
    f.write(resolve("index.html"))

print("Resolved index.html to index_resolved.html")
