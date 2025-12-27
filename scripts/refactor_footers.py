import glob
import re

files = glob.glob("*.html")
files = [f for f in files if f != "index.html"]

footer_pattern = re.compile(r'<footer>.*?</footer>', re.DOTALL)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Check if footer exists
    if "<footer>" in content:
        new_content = footer_pattern.sub('{% include footer.html %}', content)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Refactored footer in {filepath}")
    else:
        print(f"No footer tag found in {filepath}")
