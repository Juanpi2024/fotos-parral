import os
from playwright.sync_api import sync_playwright, expect

def check_all_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        cwd = os.getcwd()
        def get_url(filename):
            return f"file://{cwd}/{filename}"

        print("--- Verifying Alcaldes ---")
        page.goto(get_url("alcaldes.html"))
        # We have multiple h1s (site title and page title). Target specific text or the main content one.
        # The page title is "Alcaldes de Parral – Línea de Tiempo" in the toolbar
        expect(page.get_by_text("Alcaldes de Parral – Línea de Tiempo")).to_be_visible()
        expect(page.locator(".card")).to_have_count(27)
        page.screenshot(path="verification/alcaldes_final.png")
        print("Alcaldes: OK")

        print("--- Verifying Oficios ---")
        page.goto(get_url("oficios.html"))
        # Using get_by_role for heading level 1 that isn't the site title if possible, or text
        expect(page.get_by_text("Oficios de Parral", exact=True)).to_be_visible()
        expect(page.locator("#chartEpoca1")).to_be_visible()
        page.screenshot(path="verification/oficios_final.png")
        print("Oficios: OK")

        print("--- Verifying Relatos Navigation ---")
        page.goto(get_url("relatos.html"))
        expect(page.locator("a[href='alcaldes.html']")).to_be_visible()
        expect(page.locator("a[href='oficios.html']")).to_be_visible()
        page.screenshot(path="verification/relatos_final.png")
        print("Relatos: OK")

        print("--- Verifying Galeria Cleanup ---")
        page.goto(get_url("galeria.html"))
        page.screenshot(path="verification/galeria_final.png")
        print("Galeria: OK")

        browser.close()

if __name__ == "__main__":
    check_all_pages()
