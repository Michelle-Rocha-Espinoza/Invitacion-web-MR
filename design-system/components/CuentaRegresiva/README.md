# CuentaRegresiva

Cuatro celdas (días, horas, minutos, segundos) entre doble filete dorado, con cifras tabulares de máquina que se actualizan cada segundo.

**El consumidor entrega:** la fecha y hora de la ceremonia con zona horaria en `data-mb-cuenta` (ISO, por ejemplo `2027-03-20T17:00:00-03:00`) y las cuatro celdas con `data-unidad`. Escribe valores iniciales en el HTML para que se lea aunque el script no corra.

**Sí:** ubicarla bajo la portada o junto al calendario; funciona sobre `fondo` y sobre `banda`. **No:** animar los números con giros o rebotes; mostrar negativos (se detiene en cero).
