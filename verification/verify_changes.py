from playwright.sync_api import sync_playwright
import os

def check_new_content():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Determine the absolute path to the local files
        cwd = os.getcwd()
        galeria_url = f"file://{cwd}/galeria.html"
        detalle_url = f"file://{cwd}/detalle-locales.html"

        print(f"Checking {galeria_url}...")
        page.goto(galeria_url)

        # Check if the new card is visible
        card_locator = page.get_by_role("heading", name="Locales Comerciales de Siempre")
        if card_locator.is_visible():
            print("Card found in galeria.html")
            page.screenshot(path="verification/galeria_check.png")
        else:
            print("Card NOT found in galeria.html")

        print(f"Checking {detalle_url}...")
        page.goto(detalle_url)

        # Check title
        if page.get_by_role("heading", name="Colección: Locales Comerciales de Siempre").is_visible():
            print("Title found in detalle-locales.html")
        else:
             print("Title NOT found in detalle-locales.html")

        # Take a screenshot of the detail page
        page.screenshot(path="verification/detalle_check.png")

        browser.close()

if __name__ == "__main__":
    check_new_content()
