# OrlaFloral

Ornamentos a línea, como dibujados a mano con plumilla: orlas de esquina con rosa, ramas, hojas y florecitas; guirnaldas verticales para los costados; y una floritura simétrica para separar título y texto.

**El consumidor entrega:** los `<svg>` vacíos con su clase y `data-mb`; `MarmolBlonda.iniciar()` los dibuja.

| Pieza | Marcado | Uso |
| --- | --- | --- |
| Orla de esquina | `<svg class="mb-orla mb-orla--ti" data-mb="orla">` (`--ti`, `--td`, `--bi`, `--bd`) | Dentro de un contenedor `.mb-orlado`. Cuatro esquinas en portada y cierre; dos en el resto. |
| Guirnalda | `<svg class="mb-guirnalda mb-guirnalda--i" data-mb="guirnalda">` (`--i`, `--d`) | Dentro de `.mb-con-guirnalda`, que agrega 52px de margen lateral. Se redibuja al cambiar el alto. |
| Floritura | `<svg class="mb-floritura" data-mb="floritura">` | Entre el título y el texto, o antes de un botón. |

- Color: `burdeos` sobre papel claro; `oro` sobre `banda` (automático dentro de `.mb-escena--banda`, o con `.mb-orla--oro`). La floritura siempre en `oro`.
- Son decorativas: siempre con `aria-hidden="true"`.

**Sí:** combinar orlas y guirnaldas en las secciones de texto corto. **No:** ponerlas detrás de texto, usarlas en dos secciones seguidas con las mismas esquinas pegadas, ni cambiarlas por clipart floral.
