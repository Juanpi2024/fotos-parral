
import os
from playwright.sync_api import sync_playwright

def verify_oficios():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Determine the absolute path to the file
        cwd = os.getcwd()
        relatos_path = os.path.join(cwd, 'relatos.html')
        oficios_path = os.path.join(cwd, 'oficios.html')

        print(f"Loading Relatos page: file://{relatos_path}")
        page.goto(f'file://{relatos_path}')

        # Verify the link exists and screenshot the grid
        link = page.locator('a[href="oficios.html"]')
        if link.count() > 0:
            print("Link to oficios.html found.")
        else:
            print("Error: Link to oficios.html not found.")
            return

        page.screenshot(path='verification/relatos_oficios_link.png')

        # Click the link
        print("Clicking the link...")
        link.click()

        # Wait for navigation (or just wait for load since it's local file navigation)
        page.wait_for_load_state('networkidle')

        current_url = page.url
        print(f"Current URL: {current_url}")

        if "oficios.html" in current_url:
            print("Successfully navigated to oficios.html")
        else:
            print(f"Error: Expected to be on oficios.html, but am on {current_url}")

        # Verify elements on oficios.html
        # Check for charts
        charts = page.locator('canvas')
        count = charts.count()
        print(f"Found {count} canvas elements (charts).")

        # Check for sections
        section1 = page.locator('#epoca-1')
        if section1.count() > 0:
            print("Section 'epoca-1' found.")

        # Take screenshot of the new page (top and a bit down)
        page.screenshot(path='verification/oficios_page_top.png')

        # Scroll down to see a chart
        page.evaluate("window.scrollTo(0, 500)")
        page.wait_for_timeout(500) # Wait for potential animations
        page.screenshot(path='verification/oficios_page_chart.png')

        browser.close()

if __name__ == "__main__":
    verify_oficios()
