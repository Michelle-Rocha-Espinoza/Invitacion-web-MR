# Sobre

Pantalla de entrada de la invitación: un sobre vino de papel verjurado con cantos dorados, encaje de papel en los bordes de la solapa y una cinta de raso rubor bajo el lacre dorado (el encaje y la cinta los agrega `MarmolBlonda.iniciar()`), que al tocarlo abre la solapa (forro de mármol perla) y desliza la carta hacia arriba.

**El consumidor entrega:** la estructura completa (`__dorso`, `__carta`, `__bolsillo`, `__solapa`, el `.mb-lacre` como `<button>` y la `__ayuda` opcional), `data-mb="sobre"` y una llamada a `MarmolBlonda.iniciar()`. Deja 150px libres sobre el sobre para que la carta suba.

- El bolsillo lleva los pliegues marcados con filete `oro` y admite un relieve floral (`<svg class="mb-relieve mb-relieve--oscuro" data-mb="relieve">`); la carta tiene borde deshilachado, doble filete dorado interior y solo tres líneas: eyebrow, nombres en `subtitulo`, fecha en `dato`.
- Movimiento: solapa 0,7 s, carta 0,9 s con 0,45 s de retraso. Con `prefers-reduced-motion` cambia sin animar.
- Tras abrir, la página baja a la portada; el sobre no vuelve a mostrarse en la misma visita.

**Sí:** usarlo una vez, como primera pantalla. **No:** poner música con autoplay (el navegador la bloquea; ofrece un botón de sonido), ni esconder la información si el script falla: la carta debe existir en el HTML.
