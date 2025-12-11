import os
import sys
from playwright.sync_api import sync_playwright

def resolve_includes(content, base_path):
    import re
    def replace_include(match):
        include_path = os.path.join(base_path, '_includes', match.group(1))
        if os.path.exists(include_path):
            with open(include_path, 'r', encoding='utf-8') as f:
                return f.read()
        return ''

    # Simple recursive resolver
    prev_content = ''
    while content != prev_content:
        prev_content = content
        content = re.sub(r'{% include ([\w\.-]+) %}', replace_include, content)

    # Fix relative_url
    content = re.sub(r'{{ "/assets/([\w\.-]+)" \| relative_url }}', r'assets/\1', content)
    content = re.sub(r'{{ "([\w\.-]+)" \| relative_url }}', r'\1', content)

    return content

def verify_educacion():
    base_path = os.getcwd()
    educacion_path = os.path.join(base_path, 'educacion.html')

    with open(educacion_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Resolving includes for local preview
    full_html = resolve_includes(content, base_path)

    temp_file = os.path.join(base_path, 'educacion_resolved_verify.html')
    with open(temp_file, 'w', encoding='utf-8') as f:
        f.write(full_html)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto(f'file://{temp_file}')

        # Verify specific elements

        # 1. Check for "Deportistas Destacados" section
        deportistas_header = page.locator('h2:text("Deportistas Destacados")')
        if deportistas_header.count() > 0:
            print("PASS: 'Deportistas Destacados' section found.")
        else:
            print("FAIL: 'Deportistas Destacados' section NOT found.")

        # 2. Check for the grid
        grid = page.locator('.grid-deportistas')
        if grid.count() > 0:
            print("PASS: .grid-deportistas found.")
        else:
            print("FAIL: .grid-deportistas NOT found.")

        # 3. Check for at least one card
        cards = page.locator('.card-deportista')
        count = cards.count()
        if count > 0:
            print(f"PASS: Found {count} deportista cards.")
        else:
            print("FAIL: No deportista cards found.")

        # 4. Check for Sort logic (snapshot check might be hard, but we can check if content is sorted)
        # Let's just screenshot the area
        page.screenshot(path='educacion_verification_grid.png', full_page=True)
        print("Screenshot saved to educacion_verification_grid.png")

        browser.close()

    # Cleanup
    if os.path.exists(temp_file):
        os.remove(temp_file)

if __name__ == "__main__":
    verify_educacion()
