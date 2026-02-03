import os
import re
import shutil

def resolve_file(filepath, base_dir, includes_dir):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Resolve includes recursively
    def replace_include(match):
        include_name = match.group(1).strip()
        include_path = os.path.join(includes_dir, include_name)
        if os.path.exists(include_path):
            with open(include_path, 'r', encoding='utf-8') as inc_f:
                return inc_f.read()
        return f"<!-- Include {include_name} not found -->"

    # Match {% include filename.html %}
    content = re.sub(r"\{%\s*include\s+(.*?)\s*%\}", replace_include, content)

    # 2. Strip front matter (everything between the first two ---)
    content = re.sub(r"^---\n.*?---\n", "", content, flags=re.DOTALL)

    # 3. Resolve relative_url filter (just strip it or handle it)
    # Jekyll's relative_url prepends baseurl. Since we set baseurl to "", we just need the path.
    content = re.sub(r"\{\{\s*'?(.*?)'?\s*\|\s*relative_url\s*\}\}", r"\1", content)

    return content

def build():
    source_dir = r"c:\Users\Casa\fotos-parral"
    dist_dir = os.path.join(source_dir, "dist")
    includes_dir = os.path.join(source_dir, "_includes")

    # Clear dist if exists
    if os.path.exists(dist_dir):
        shutil.rmtree(dist_dir)
    os.makedirs(dist_dir)

    # Directories to copy as is
    assets_dirs = ['css', 'js', 'images', 'videos', 'recursos', 'video-promo', 'img']
    
    for item in os.listdir(source_dir):
        s = os.path.join(source_dir, item)
        d = os.path.join(dist_dir, item)

        if os.path.isdir(s):
            if item in assets_dirs:
                print(f"Copying {item}...")
                shutil.copytree(s, d)
            elif item == "recursos": # In case it's nested or needs special care
                 shutil.copytree(s, d)
        else:
            # Process HTML files
            if item.endswith(".html"):
                print(f"Processing {item}...")
                processed_content = resolve_file(s, source_dir, includes_dir)
                with open(d, 'w', encoding='utf-8') as f:
                    f.write(processed_content)
            # Copy other root files that might be needed
            elif item in ['style.css', 'favicon.ico']:
                shutil.copy2(s, d)

    print("Build complete in /dist folder.")

if __name__ == "__main__":
    build()
