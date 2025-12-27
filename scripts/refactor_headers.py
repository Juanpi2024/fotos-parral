import glob
import re

files = glob.glob("*.html")
# Exclude index.html as I already did it.
files = [f for f in files if f != "index.html"]

header_pattern = re.compile(r'<header>.*?</header>', re.DOTALL)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Check if file already has front matter
    has_fm = content.strip().startswith('---')

    # Replace header
    new_content = header_pattern.sub('{% include header.html %}', content)

    # Add front matter if missing
    if not has_fm:
        new_content = "---\n---\n" + new_content

    # Also wrap body content in <main> if possible?
    # That might be risky with regex if structure varies.
    # The user asked to "Refactor All Pages to use Centralized Header".
    # I will stick to header replacement and adding FM.

    # Actually, I should check if I need to wrap content in main for the sticky footer to work best.
    # style.css says: main { flex: 1; ... }
    # So if I don't wrap content in <main>, the footer won't push down properly if it relies on 'main'.
    # However, if I can't easily identify the "main" content, I can leave it.
    # But wait, style.css applies flex column to body.
    # If the content is just divs and sections, they will stack.
    # If I want the footer at the bottom, one element needs flex-grow: 1.
    # If I don't add <main>, I should add 'flex: 1' to a container div?
    # Or I can just wrap everything between header and footer in <main>.

    # Let's try to wrap content.
    # Pattern: {% include header.html %} (content) <footer> OR {% include footer.html %}
    # Most files have <footer>...</footer> hardcoded or include footer.

    # Let's see if we can identify the footer start.

    # First, let's just do the header replacement which is the explicit request for this step.

    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Processed {filepath}")
