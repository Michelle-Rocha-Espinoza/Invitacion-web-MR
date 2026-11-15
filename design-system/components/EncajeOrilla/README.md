# EncajeOrilla

Borde de encaje (festón con una fila de picado) que une dos secciones de distinto color, como la orilla de una blonda de papel.

**El consumidor entrega:** un `<div class="mb-encaje-orilla">` entre dos secciones, con `--mb-encaje` = color de la sección de arriba y `--mb-hueco` = color de la de abajo, y la sección siguiente con `margin-top: -26px` para que el festón se monte sobre ella. Con `.mb-encaje-orilla--arriba` el festón apunta hacia arriba.

**Sí:** usarlo donde cambia el color de fondo (marfil → vino, vino → marfil). **No:** ponerlo entre dos secciones del mismo color, ni más de una vez cada dos secciones.
