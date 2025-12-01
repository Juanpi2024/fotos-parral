from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Verificar relatos.html y la tarjeta nueva
        url_relatos = "file://" + os.path.abspath("relatos.html")
        page.goto(url_relatos)
        page.wait_for_selector(".grid-galeria")
        page.screenshot(path="verification/relatos_grid.png", clip={"x": 0, "y": 0, "width": 1280, "height": 1200})

        # 2. Navegar a detalle-guaton.html
        # Click en el enlace que contiene "El Guatón Loyola"
        with page.expect_navigation():
            page.click("text=El Guatón Loyola")

        # 3. Verificar detalle-guaton.html
        page.wait_for_selector("h1") # Esperar titulo principal
        page.screenshot(path="verification/detalle_guaton.png", clip={"x": 0, "y": 0, "width": 1280, "height": 1000})

        browser.close()

if __name__ == "__main__":
    run()
