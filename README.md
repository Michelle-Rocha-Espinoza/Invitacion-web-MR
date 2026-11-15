# Invitación web · Enlace Riffo Rocha

Invitación de boda web para Marco y Michelle, en dos versiones para elegir.

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada con las dos opciones. |
| `carta.html` | **Opción A · Carta animada.** Un sobre con lacre MR que se abre y deja salir once tarjetas con forma (blonda, arco, cartela, escudo, etiqueta, roseta…). Se pasan deslizando, con flechas o con los rombos. |
| `invitacion.html` | **Opción B · Invitación de scroll.** Una página con sobre de entrada, nicho de mármol, blondas, relieves florales, marcos para fotos, programa, código de vestimenta, regalos y confirmación. |
| `cancion.mp3` | La canción en versión "sala", que se carga al abrir el sobre. |
| `design-system/` | Sistema de diseño "Mármol & Blonda": `tokens.json` (colores, tipografías, espacios), `components/bundle.css` y `bundle.js` (estilos y dibujos de blondas, orlas, sobre, relieves) y una guía por componente. |

Cada página es un solo archivo HTML (unos 100 KB) con sus estilos y scripts. La canción está aparte en `cancion.mp3` y empieza a sonar al tocar el sello. Las tipografías se cargan desde Google Fonts.

## Ver en línea con GitHub Pages

En el repositorio: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**. La portada queda en `https://michelle-rocha-espinoza.github.io/Invitacion-web-MR/`.

## Por completar

Está marcado en las páginas con etiquetas doradas punteadas:

- Fecha definitiva (la del 20 de marzo de 2027 es de ejemplo).
- Hora y dirección del Salón del Reino.
- Nombre, dirección y hora de la recepción.
- Nombres de los padres.
- Datos para transferencias.
- Plazo de confirmación y contacto de coordinación.
- Fotos de los novios.
- Envío real de las confirmaciones (hoy el formulario no guarda respuestas).
