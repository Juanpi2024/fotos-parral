import os
from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Determine the absolute path to educacion.html
        cwd = os.getcwd()
        educacion_url = f"file://{cwd}/educacion.html"

        print(f"Navigating to {educacion_url}")
        page.goto(educacion_url)

        # Take screenshot of educacion.html highlighting the new card
        page.screenshot(path="verification/educacion_updated.png")
        print("Screenshot of educacion.html saved.")

        # Click the new Infografías link
        # We look for a link containing "Infografías" text or heading inside it
        try:
            # Finding the link that wraps the card or clicking the card itself
            page.click("text=Infografías")

            # Wait for navigation
            page.wait_for_load_state('networkidle')

            # Verify we are on infografias.html
            print(f"Navigated to: {page.url}")

            # Take screenshot of infografias.html
            page.screenshot(path="verification/infografias_page.png")
            print("Screenshot of infografias.html saved.")

        except Exception as e:
            print(f"Error navigating: {e}")

        browser.close()

if __name__ == "__main__":
    run()
