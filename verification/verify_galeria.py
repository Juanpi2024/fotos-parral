
import os
from playwright.sync_api import sync_playwright

def verify_galeria():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Determine the absolute path to the file
        cwd = os.getcwd()
        galeria_path = os.path.join(cwd, 'galeria.html')

        print(f"Loading Galeria page: file://{galeria_path}")
        page.goto(f'file://{galeria_path}')

        # Verify deduplication of Bomberos
        bomberos_links = page.locator('a[href="detalle-bomberos.html"]')
        count_bomberos = bomberos_links.count()
        print(f"Found {count_bomberos} links to detalle-bomberos.html (Expected 1).")

        # Verify fix of Avenida
        avenida_links = page.locator('a[href="detalle-avenida.html"]')
        count_avenida = avenida_links.count()
        print(f"Found {count_avenida} links to detalle-avenida.html (Expected 1).")

        # Verify images source for known cards
        # Plaza
        plaza_img = page.locator('img[src="img/plaza-original.jpg"]')
        if plaza_img.count() > 0:
            print("Plaza image updated to original.")
        else:
             print("Plaza image NOT updated.")

        # Arroz
        arroz_img = page.locator('img[src="img/arroz-original.jpg"]')
        if arroz_img.count() > 0:
            print("Arroz image updated to original.")
        else:
             print("Arroz image NOT updated.")

        # Avenida
        avenida_img = page.locator('img[src="img/avenida-original.jpg"]')
        if avenida_img.count() > 0:
            print("Avenida image updated to original.")
        else:
             print("Avenida image NOT updated.")

        # Take screenshot of the gallery grid
        page.screenshot(path='verification/galeria_cleaned.png')

        browser.close()

if __name__ == "__main__":
    verify_galeria()
