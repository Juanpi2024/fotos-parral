
import os
from playwright.sync_api import sync_playwright

def verify_alcaldes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Determine the absolute path to the file
        cwd = os.getcwd()
        relatos_path = os.path.join(cwd, 'relatos.html')
        alcaldes_path = os.path.join(cwd, 'alcaldes.html')

        print(f"Loading Relatos page: file://{relatos_path}")
        page.goto(f'file://{relatos_path}')

        # Verify the link exists and screenshot the grid
        link = page.locator('a[href="alcaldes.html"]')
        if link.count() > 0:
            print("Link to alcaldes.html found.")
        else:
            print("Error: Link to alcaldes.html not found.")
            return

        page.screenshot(path='verification/relatos_alcaldes_link.png')

        # Click the link
        print("Clicking the link...")
        link.click()

        # Wait for navigation
        page.wait_for_load_state('networkidle')

        current_url = page.url
        print(f"Current URL: {current_url}")

        if "alcaldes.html" in current_url:
            print("Successfully navigated to alcaldes.html")
        else:
            print(f"Error: Expected to be on alcaldes.html, but am on {current_url}")

        # Verify elements on alcaldes.html
        # Check for timeline container
        timeline = page.locator('#timelineContainer')
        if timeline.count() > 0:
             print("Timeline container found.")

        # Check for at least one card
        cards = page.locator('.card')
        count = cards.count()
        print(f"Found {count} mayor cards.")

        # Take screenshot of the new page
        page.screenshot(path='verification/alcaldes_page.png')

        # Test "Ver Ficha" (Preview) logic implicitly by checking button existence
        buttons = page.locator('button.btn-primary')
        if buttons.count() > 0:
            print("Buttons for 'Ver Ficha' found.")

        browser.close()

if __name__ == "__main__":
    verify_alcaldes()
