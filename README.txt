README — AQUA365 Landing Page
===============================
Última actualización: julio 2026
Versión: 2.0



────────────────────────────────────────────────
1. CÓMO ACTUALIZAR TEXTOS, FECHAS Y CIFRAS
────────────────────────────────────────────────

Abre el archivo: contenido_aqua365.txt

Ese archivo contiene toda la información editable de la página en formato JSON.
Puedes editarlo con cualquier editor de texto (Block de notas, TextEdit, VS Code).

IMPORTANTE: el archivo debe mantener su formato JSON exacto.
Conserva siempre las comillas " " alrededor de los textos, las comas , entre elementos y las llaves { }.

Ejemplo correcto:
  "anio": "2026",

Ejemplos que no debes usar en este proyecto:
  "anio": 2026,     ← (es un número; el sitio espera un texto entre comillas)
  "anio": "2026"   ← (falta la coma del final cuando vienen más campos)

Campos que puedes modificar:

  programa.anio                    → Año que aparece en el título, eyebrows y footer
  programa.dedicacion_semanal      → Horas semanales estimadas
  programa.modalidad               → Descripción de la modalidad
  programa.costo                   → Precio de participación
  programa.correo                  → Correo de contacto
  programa.link_postulacion        → URL del formulario de postulación
  programa.link_bases              → URL del PDF con las bases
  programa.instagram               → URL de Instagram

  cifras.estudiantes_acumulados    → Número de estudiantes (ej. "+600")
  cifras.versiones                 → Número de la edición (ej. "6")
  cifras.comunidades               → Comunidades participantes
  cifras.organizaciones_aliadas    → Organizaciones aliadas

  desafios[0].nombre               → Nombre del primer desafío comunitario
  desafios[0].region               → Región geográfica del desafío 01
  desafios[0].detalle              → Descripción breve del desafío 01

  desafios[1].nombre               → Nombre del segundo desafío
  desafios[1].region               → Región del desafío 02
  desafios[1].detalle              → Descripción breve del desafío 02

  fechas_clave                     → Tabla de hitos del programa
    (apertura, cierre, inicio, terreno, mentoria-01, presentacion-final)
    → Si una fecha dice "[POR DEFINIR]", esa fila se oculta automáticamente.
    → Cuando tengas la fecha, reemplaza el texto entre comillas.

Para agregar o quitar patrocinadores, edita la sección "patrocinadores":
  - Cada patrocinador tiene: nombre, logo (ruta al archivo) y alt (texto accesible).
  - Para quitar uno, elimina el bloque { ... } completo, incluyendo la coma del final
    (excepto el último elemento, que no lleva coma).
  - Para agregar uno, copia un bloque existente, pégalo al final del arreglo
    y actualiza los valores.



────────────────────────────────────────────────
2. CÓMO CAMBIAR LOGOS Y FOTOGRAFÍAS
────────────────────────────────────────────────

Los archivos de imágenes están en la carpeta multimedia/:

  multimedia/
  ├── logos/
  │   ├── aqua365.png          → Logo principal AQUA365
  │   ├── isotipo-aqua365.png  → Solo el isotipo (gota de agua)
  │   ├── isf-chile.png        → Logo Ingeniería Sin Fronteras Chile
  │   ├── uchile-fcfm.png      → Logo FCFM Universidad de Chile
  │   └── patrocinadores/
  │       ├── bechtel.png
  │       ├── xylem.png
  │       ├── ecopreneur.png
  │       ├── ausenco-foundation.png
  │       └── abinbev.svg
  └── fotos/
      ├── hero-aqua365.jpg     → Foto principal del Hero (ya incluida)
      ├── desafio-01.jpg       → Foto comunidad del desafío 01
      ├── desafio-02.jpg       → Foto comunidad del desafío 02
      ├── terreno.jpg          → Foto de visita o diagnóstico en terreno
      └── estudiantes.jpg      → Foto de estudiantes trabajando

Para reemplazar un archivo:
  → Prepara la nueva imagen con el mismo nombre que el archivo existente.
  → Copia el nuevo archivo a la misma carpeta, reemplazando el anterior.
  → Si mantienes el mismo nombre, no necesitas editar contenido_aqua365.txt.
  → Si usas un nombre distinto, actualiza la ruta en contenido_aqua365.txt.

────────────────────────────────────────────────
3. NOMBRES Y FORMATOS RECOMENDADOS
────────────────────────────────────────────────

LOGOS:
  → Preferir SVG (vectorial, se ve nítido a cualquier tamaño).
  → Si no hay SVG, usar PNG con fondo transparente.
  → Nombres: minúsculas, sin espacios, sin tildes, sin caracteres especiales.
    Ejemplos: patrocinador-nuevo.svg, logo-empresa.png

FOTOGRAFÍAS:
  → El proyecto actual utiliza JPG.
  → WebP o AVIF también pueden utilizarse, pero requieren cambiar las rutas
    correspondientes en contenido_aqua365.txt y, para el hero, en index.html.
  → Tamaños mínimos recomendados:
      hero-aqua365.jpg     → 1920 × 1080 px
      desafio-01.jpg       → 1200 × 800 px
      desafio-02.jpg       → 1200 × 800 px
      terreno.jpg          → 1200 × 800 px
      estudiantes.jpg      → 1200 × 800 px
  → Optimizar las fotos antes de subirlas (recomendado: Squoosh, TinyPNG).

ADVERTENCIAS:
  → No deformar ni recolorear logos de patrocinadores sin autorización.
  → Verificar derechos y autorizaciones de uso de todas las imágenes.
  → Pedir autorización expresa a las comunidades antes de publicar sus fotografías.
  → Usar imágenes documentales y auténticas; evitar fotos de stock genéricas.



────────────────────────────────────────────────
4. CÓMO PROBAR EL SITIO LOCALMENTE
────────────────────────────────────────────────

NO funciona abriendo index.html con doble clic.
El archivo de contenido (contenido_aqua365.txt) requiere un servidor web.

Opción 1 — Python (si tienes Python instalado):
  1. Abre una terminal (o símbolo del sistema).
  2. Navega a la carpeta del proyecto:
       cd ruta/a/aqua365-landing
  3. Ejecuta:
       python -m http.server 8000
  4. Abre en el navegador:
       http://localhost:8000

Opción 2 — VS Code con extensión Live Server:
  1. Instala la extensión "Live Server" en VS Code.
  2. Abre la carpeta del proyecto en VS Code.
  3. Haz clic en "Go Live" en la barra inferior.
  4. El navegador se abrirá automáticamente.

IMPORTANTE: prueba siempre en estas resoluciones antes de publicar:
  → Móvil:  320 px y 375 px de ancho
  → Tablet: 768 px de ancho
  → Laptop: 1024 px de ancho
  → Desktop: 1440 px de ancho



────────────────────────────────────────────────
5. CÓMO PUBLICAR EN GITHUB PAGES
────────────────────────────────────────────────

1. Crea un repositorio en GitHub (puede ser público o privado con plan adecuado).

2. Sube todos los archivos del proyecto, manteniendo la misma estructura:
     index.html
     styles.css
     script.js
     contenido_aqua365.txt
     README.txt
     .nojekyll
     multimedia/ (con todos sus subcarpetas y archivos)

3. En GitHub, ve a: Settings → Pages → Source → Deploy from a branch.

4. Selecciona la rama main (o master) y la carpeta / (root).

5. Guarda. GitHub generará la URL pública en pocos minutos.

El archivo .nojekyll (ya incluido) le indica a GitHub Pages que publique
los archivos directamente, sin procesarlos como Jekyll.

URL típica: https://tu-usuario.github.io/nombre-repositorio/



────────────────────────────────────────────────
6. QUÉ REVISAR ANTES DE PUBLICAR
────────────────────────────────────────────────

□ Todas las fechas en contenido_aqua365.txt tienen valores reales (no "[POR DEFINIR]")
□ Los links de postulación y bases apuntan a las URLs correctas
□ El correo es el correcto: aqua365@isf-chile.org
□ Los logos de ISF Chile y todos los patrocinadores están en la carpeta multimedia/logos/
□ Las fotos de las comunidades fueron autorizadas por ellas
□ Las fotografías están optimizadas (no subir JPG de 10 MB)
□ Los desafíos tienen nombre, región y descripción confirmados
□ Se probó en móvil y en escritorio
□ Los links externos abren correctamente
□ El botón "Postula ahora" lleva al formulario correcto
