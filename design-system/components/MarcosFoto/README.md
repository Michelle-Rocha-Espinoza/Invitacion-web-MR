# MarcosFoto

Tres marcos para fotos con aire de museo: un marco dorado tallado con paspartú perla y orlas en las esquinas, un arco de mármol y un camafeo ovalado en lámina dorada.

**El consumidor entrega:** cada foto como `<img>` dentro de `.mb-foto` (cubre el espacio con `object-fit: cover`) y un `figcaption.mb-pie-foto` corto. Sin foto, `.mb-foto` muestra mármol rosado y el texto `.mb-foto__txt`.

| Marco | Clase | Proporción |
| --- | --- | --- |
| Dorado con orlas | `.mb-marco-dorado` > `.mb-marco-dorado__paspartu` > `.mb-foto` (+ 4 `.mb-orla`) | 4:3, horizontal |
| Arco de mármol | `.mb-arco-foto` > `.mb-foto` | 3:4, vertical |
| Camafeo | `.mb-camafeo` > `.mb-foto` | 3:4, ovalado |

- Composición recomendada: el marco dorado a todo el ancho y debajo arco y camafeo lado a lado.
- El óvalo dentro de blonda está en `NichoMarmol` (`.mb-foto-ovalo`).

**Sí:** pies de foto en `mb-pie-foto` (serif cursiva). **No:** más de tres fotos por sección, ni marcos de distinto estilo en una misma fila.
