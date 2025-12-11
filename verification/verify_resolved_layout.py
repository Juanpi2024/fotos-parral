import os
from playwright.sync_api import sync_playwright

def verify_resolved_layout():
    cwd = os.getcwd()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        print("Verifying index_resolved.html...")
        page.goto(f"file://{cwd}/index_resolved.html")

        # Check Header
        header = page.locator("header")
        if header.count() > 0:
            print("PASS: Header found on index_resolved.html")
            ecos_link = header.locator("a", has_text="Ecos")
            if ecos_link.count() > 0:
                print("PASS: 'Ecos' link found in header")
            else:
                print("FAIL: 'Ecos' link NOT found in header")
        else:
            print("FAIL: Header NOT found on index_resolved.html")

        # Check Main
        main = page.locator("main")
        if main.count() > 0:
             print("PASS: <main> tag found on index_resolved.html")
        else:
             print("FAIL: <main> tag NOT found on index_resolved.html")

        # Check Footer
        footer = page.locator("footer")
        if footer.count() > 0:
             print("PASS: Footer found on index_resolved.html")
             # Verify computed style for sticky footer check (margin-top should be auto or layout ensures it's at bottom)
             # But visual check is better.
        else:
             print("FAIL: Footer NOT found on index_resolved.html")

        page.screenshot(path="verification/verify_index_resolved.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    verify_resolved_layout()
