import os
from playwright.sync_api import sync_playwright

def verify_header_and_layout():
    cwd = os.getcwd()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # 1. Verify Homepage Layout and Header
        print("Verifying index.html...")
        page.goto(f"file://{cwd}/index.html")

        # Check Header
        header = page.locator("header")
        if header.count() > 0:
            print("PASS: Header found on index.html")
            ecos_link = header.locator("a", has_text="Ecos")
            if ecos_link.count() > 0:
                print("PASS: 'Ecos' link found in header")
            else:
                print("FAIL: 'Ecos' link NOT found in header")
        else:
            print("FAIL: Header NOT found on index.html")

        # Check Main
        main = page.locator("main")
        if main.count() > 0:
             print("PASS: <main> tag found on index.html")
        else:
             print("FAIL: <main> tag NOT found on index.html")

        # Check Footer
        footer = page.locator("footer")
        if footer.count() > 0:
             print("PASS: Footer found on index.html")
        else:
             print("FAIL: Footer NOT found on index.html")

        page.screenshot(path="verification/verify_index_layout.png", full_page=True)

        # 2. Verify Another Page (e.g., Galeria) to ensure include works
        print("\nVerifying galeria.html...")
        page.goto(f"file://{cwd}/galeria.html")

        # Check Header existence implies include worked (since we replaced hardcoded header)
        header_galeria = page.locator("header")
        if header_galeria.count() > 0:
            print("PASS: Header found on galeria.html (Include successful)")
            if header_galeria.locator("text=Ecos").count() > 0:
                 print("PASS: 'Ecos' link found on galeria.html header")
        else:
            print("FAIL: Header NOT found on galeria.html")

        page.screenshot(path="verification/verify_galeria_layout.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_header_and_layout()
