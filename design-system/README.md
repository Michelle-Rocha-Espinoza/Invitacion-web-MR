Sistema para invitaciones de boda web con aire de papelería de lujo: papel marfil y vino, mármol veteado, blondas caladas, troquelados, relieve ciego, lacre y detalles en lámina dorada. Todo pensado para leerse primero en el teléfono.

## Esencia

- **Papelería, no aplicación.** Cada sección es un objeto físico: una carta, una tarjeta troquelada, una blonda, un panel de mármol. Nada de tarjetas de interfaz con esquinas redondeadas y sombras genéricas.
- **Escultura y relieve.** El volumen se logra con luz y sombra (`sombra-relieve`, `luz-relieve`, `sombra-texto`), como un estampado en seco o un mármol tallado, no con colores extra.
- **El oro es el hilo.** Filetes, bordes, nodos, lacre y monogramas en dorado unen todas las piezas. Úsalo en trazos finos y acentos pequeños, nunca como fondo de sección.

## Voz y contenido

- Español de Chile, tratamiento **ustedes** para el grupo ("los invitamos", "los esperamos") y **tú** en el formulario ("¿Nos acompañas?").
- Frases breves y cálidas, sin muletillas. Ejemplos: "Con gratitud a Jehová y junto a nuestros padres, tenemos la alegría de invitarlos a celebrar nuestro matrimonio." · "Por favor responde antes del 20 de febrero de 2027." · "El blanco y el marfil quedan reservados para la novia."
- Mayúsculas solo en `eyebrow` y `boton`. Títulos en lettering en tipo oración ("Código de vestimenta").
- Fechas: "Sábado 20 de marzo de 2027" en texto; "20 · 03 · 2027" como dato decorativo. Horas en 24 h: "17:00 hrs".
- Sin emojis. Los ornamentos son la estrella del `Separador`, el lacre y los filetes dorados.

## Color

La paleta nace de los cinco círculos de la inspiración, de oscuro a claro: `vino` #4a0f1c, `burdeos` #7a1a2e, `malva` #9c6b70, `rubor` #e8b9b8, `perla` #f9dedd. A ellos se suman tres dorados: `oro`, `oro-claro` y `oro-profundo`.

| Rol | Token | Regla |
| --- | --- | --- |
| Fondo de página | `fondo` | Marfil de mármol en tema Marfil, vino nocturno en tema Vino. |
| Bandas alternas | `fondo-alterno`, `banda` | Alterna secciones `fondo` → `banda` → `fondo` para dar ritmo de papel claro y papel vino. |
| Papel | `superficie`, `encaje` | Tarjetas y carta en `superficie`; la blonda siempre en `encaje` (claro en ambos temas). |
| Texto | `tinta`, `tinta-suave`, `en-banda`, `en-encaje` | `tinta` sobre fondo y superficie; `en-banda` sobre banda; `en-encaje` sobre la blonda. |
| Acento | `acento`, `acento-hover`, `en-acento` | Títulos en lettering, botón principal, día de la boda. |
| Dorado | `oro`, `oro-claro`, `oro-profundo` | `oro` para filetes y bordes (≥3:1); `oro-profundo` para texto dorado en Marfil (5:1); el degradado `--mb-foil` mezcla los tres para lámina. |
| Foco | `foco` | Anillo de 2px sólido, 3px de separación, en todo control. |

- Proporción aproximada por pantalla: 70 % marfil/perla, 20 % vino/burdeos, 8 % rubor/malva, 2 % oro.
- `malva` no se usa para texto pequeño sobre marfil (4,1:1); es para muestras, flores y fondos.
- Nunca degradados de colores de la paleta entre sí como fondo. El único degradado es la lámina dorada (`--mb-foil`) y el brillo del lacre.

## Tipografía

Dirección **old-world**: vintage dentro de un formato moderno. Tres familias, cada una con un trabajo:

- **Lettering caligráfico, Monsieur La Doulaise** (`--font-lettering`). Para lo importante: nombres (`nombres`), títulos de sección (`titulo`), lugares (`subtitulo`), eventos y firmas (`firma`), monogramas (`monograma`). Nunca para párrafos ni para menos de 28px: sus mayúsculas con rizos necesitan tamaño.
- **Serif grabada, IM Fell French Canon** (`--font-serif`). Nombres completos y fechas en mayúsculas espaciadas (`nombres-caps`), etiquetas y menú (`etiqueta`), frases de enlace y pies de foto en cursiva (`italica`).
- **Máquina de escribir, Special Elite** (`--font-maquina`). Para leer la información: `cuerpo`, `cuerpo-sm`, `dato`, `dato-grande`, `boton`, `nota`. Tiene un solo peso (400): no usar negrita.

Pareja típica: `etiqueta` en `tinta-suave` → `titulo` en `acento` → floritura dorada → `cuerpo` en `tinta`. Interlineado de lectura 26px, máximo 34 caracteres por línea en móvil.

Se cargan desde Google Fonts (lo hace `bundle.css`); respaldo: Pinyon Script / cursive, Cormorant Garamond / Georgia y Courier Prime / monospace.

## Ornamentos dibujados a mano

- **Orlas de esquina:** ramas curvas con hojitas y florecitas de cinco pétalos, en `burdeos` sobre papel claro y en `oro` sobre `banda`. Van en las cuatro esquinas de portada y cierre, y en dos esquinas del resto de las secciones.
- **Florituras:** una línea simétrica con rulos y una flor al centro, en `oro`, entre el título y el texto.
- **Orilla de encaje:** festón con picado que une dos secciones de distinto color.
- **Escultura de mármol:** nicho en arco con columnas estriadas, clave y basa con números romanos; medallón con monograma en relieve ciego.
- **Marcos para fotos:** óvalo dentro de blonda, marco dorado con orlas en las esquinas, arco de mármol y camafeo dorado.

## Materiales y texturas

| Material | Cómo | Dónde |
| --- | --- | --- |
| Mármol | `.mb-marmol`: vetas rubor + nubes, SVG generado | Portada, fondo detrás de tarjetas, forro del sobre. |
| Blonda | `MarcoBlonda`: encaje de papel calado en SVG | Pieza central con nombres o fecha, sobre `banda` o mármol. |
| Troquelado | `.mb-troquel`: borde festoneado (`troquel-feston`, `troquel-fino`) | Tarjetas de ceremonia, recepción, regalos, RSVP. |
| Relieve ciego | `.mb-relieve-texto`, `sombra-relieve` | Monogramas grabados, bordes de botones. |
| Lámina dorada | `.mb-foil`, `.mb-lacre` | Monograma, lacre, rombos del programa. |
| Lacre | `Lacre` | Cierre del sobre y firma final. |

## Composición

- **Móvil primero:** columna de 360–420px centrada; en escritorio la invitación sigue siendo una columna estrecha sobre mármol, como una tarjeta sobre una mesa.
- Márgenes laterales mínimos `espacio-3`; relleno vertical de sección `espacio-6`; entre bloques `espacio-4`.
- Todo centrado y simétrico, como la papelería clásica; el `Programa` es la única pieza con eje asimétrico.
- Orden recomendado: Sobre → PanelMarmol (portada) → CuentaRegresiva → Calendario → TarjetaTroquelada (ceremonia y recepción) → Programa → CodigoVestimenta → regalos → Confirmacion → cierre en `banda` con `nombres` y lacre.
- Esquinas: papel recto (`radio-0`); botones y chips en píldora (`radio-pildora`); fotos en arco u óvalo (`radio-ovalo`).

## Imágenes

- Fotos de los novios en `.mb-arco` u `.mb-ovalo` con filete dorado; tonos cálidos o blanco y negro.
- Pinturas florales al óleo, castillos o jardines antiguos solo como forro de sobre o fondo de cierre, oscurecidas para que el texto `en-banda` se lea.
- Nada de stock genérico, íconos de colores ni ilustraciones planas.

## Movimiento

- Un único momento protagonista: abrir el sobre (solapa 0,7 s, carta 0,9 s).
- El resto aparece con fundidos de 400 ms al hacer scroll, desde un estado visible (nunca contenido oculto esperando animación).
- `prefers-reduced-motion`: sin transiciones.

## Iconografía

No hay set de íconos. Ornamentos permitidos: la estrella de cuatro puntas del `Separador`, rombos dorados, el lacre. Si hace falta un ícono funcional (mapa, calendario), dibujarlo a línea fina de 1px en `oro`, sin rellenos. Nunca emojis.

## Accesibilidad

- Todo texto cumple 4,5:1 sobre el fondo que su token indica, en ambos temas; trazos dorados ≥3:1.
- Controles de al menos 44px de alto, foco visible con `foco`, cada campo con `label`.
- El contenido del sobre y la cuenta regresiva existen en el HTML aunque el script no se ejecute.
- La música, si la hay, solo con un botón; nunca autoplay.
