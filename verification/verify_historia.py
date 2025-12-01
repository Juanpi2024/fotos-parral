from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Cargar el archivo HTML local directamente
        url = "file://" + os.path.abspath("historia.html")
        page.goto(url)

        # Esperar a que el timeline se renderice (aunque es sincrónico, no está de más)
        page.wait_for_selector("#timeline")

        # Tomar capturas de pantalla de diferentes secciones
        # 1. Hero y Filtros
        page.screenshot(path="verification/historia_hero.png", clip={"x": 0, "y": 0, "width": 1280, "height": 800})

        # 2. Timeline (scrollear un poco)
        page.evaluate("window.scrollTo(0, 800)")
        page.wait_for_timeout(500) # Esperar renderizado/animacion
        page.screenshot(path="verification/historia_timeline.png", clip={"x": 0, "y": 0, "width": 1280, "height": 800})

        browser.close()

if __name__ == "__main__":
    run()
