import os

# Updated list to include all HTML files that might contain the link
files_to_check = [
    "alcaldes.html",
    "detalle-arroz.html",
    "detalle-avenida.html",
    "detalle-bajada.html",
    "detalle-bomberos.html",
    "detalle-guaton.html",
    "detalle-historia.html",
    "detalle-locales.html",
    "detalle-plaza.html",
    "detalle.html",
    "educacion.html",
    "galeria.html",
    "historia.html",
    "index.html",
    "mapa.html",
    "oficios.html",
    "participa.html",
    "relatos.html"
]

target_string_1 = '<li><a href="deportistas.html">Deportistas</a></li>'
target_string_2 = '<li><a href="deportistas.html" class="active">Deportistas</a></li>'
target_string_3 = '<li><a href="deportistas.html"'

for filepath in files_to_check:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        new_lines = []
        for line in lines:
            # Simple check for the link
            if 'href="deportistas.html"' in line:
                continue
            new_lines.append(line)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Processed {filepath}")
    else:
        print(f"File not found: {filepath}")
