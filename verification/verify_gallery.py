import os
from playwright.sync_api import sync_playwright

def verify_gallery():
    cwd = os.getcwd()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Verify Galeria
        page.goto(f"file://{cwd}/galeria.html")
        page.screenshot(path="verification/screenshot_galeria.png", full_page=True)
        print("Captured screenshot_galeria.png")

        # Verify grid layout existence
        grid = page.locator(".grid-galeria")
        if grid.count() > 0:
            print("Grid gallery found in galeria.html")

            # Check for column-count style
            column_count = grid.evaluate("element => getComputedStyle(element).columnCount")
            print(f"Grid column count: {column_count}")
        else:
            print("ERROR: Grid gallery not found in galeria.html")

        # Verify Relatos
        page.goto(f"file://{cwd}/relatos.html")
        page.screenshot(path="verification/screenshot_relatos.png", full_page=True)
        print("Captured screenshot_relatos.png")

        # Verify links work
        page.click("text=El Guatón Loyola")
        if "detalle-guaton.html" in page.url:
             print("Navigation to detalle-guaton.html successful")
        else:
             print(f"Navigation failed, current url: {page.url}")

        browser.close()

if __name__ == "__main__":
    verify_gallery()
