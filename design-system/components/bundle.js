/* Mármol & Blonda — utilidades sin dependencias. window.MarmolBlonda */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  function nodo(nombre, attrs) {
    var e = document.createElementNS(NS, nombre);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* Puntos equiespaciados (por longitud de arco) sobre una elipse. ang = ángulo de la normal en grados. */
  function anillo(a, b, cx, cy, paso) {
    var M = 720, L = [0], total = 0, px = 0, py = 0, i;
    for (i = 0; i <= M; i++) {
      var t = i / M * 2 * Math.PI, x = cx + a * Math.cos(t), y = cy + b * Math.sin(t);
      if (i) { total += Math.hypot(x - px, y - py); L.push(total); }
      px = x; py = y;
    }
    var n = Math.max(8, Math.round(total / paso)), out = [], j = 0;
    for (i = 0; i < n; i++) {
      var s = i * total / n;
      while (j < M - 1 && L[j + 1] < s) j++;
      var f = (s - L[j]) / ((L[j + 1] - L[j]) || 1);
      var tt = (j + f) / M * 2 * Math.PI;
      out.push({
        x: cx + a * Math.cos(tt),
        y: cy + b * Math.sin(tt),
        ang: Math.atan2(a * Math.sin(tt), b * Math.cos(tt)) * 180 / Math.PI
      });
    }
    return out;
  }

  /* Blonda: encaje de papel ovalado y calado. host = .mb-blonda (el texto va en .mb-blonda__texto). */
  /* Igual que anillo(), pero con un número fijo de puntos y un desfase (0–1 de paso) para filas alternadas. */
  function anilloN(a, b, cx, cy, n, fase) {
    var M = 720, L = [0], total = 0, px = 0, py = 0, i, j = 0, out = [];
    for (i = 0; i <= M; i++) {
      var t = i / M * 2 * Math.PI, x = cx + a * Math.cos(t), y = cy + b * Math.sin(t);
      if (i) { total += Math.hypot(x - px, y - py); L.push(total); }
      px = x; py = y;
    }
    for (i = 0; i < n; i++) {
      var s = ((i + (fase || 0)) / n) * total;
      while (j < M - 1 && L[j + 1] < s) j++;
      var tt = (j + (s - L[j]) / ((L[j + 1] - L[j]) || 1)) / M * 2 * Math.PI;
      out.push({ x: cx + a * Math.cos(tt), y: cy + b * Math.sin(tt), ang: Math.atan2(a * Math.sin(tt), b * Math.cos(tt)) * 180 / Math.PI });
    }
    return out;
  }
  function perimetro(a, b) { return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b))); }
  function rad(g) { return g * Math.PI / 180; }

  /* Blonda: encaje de papel ovalado, calado a mano, en anillos:
     festón con piquitos · ojales · abanicos · picado · malla de rombos · flores caladas · picado fino · filetes dorados */
  function blonda(host, o) {
    o = o || {};
    var W = o.ancho || 400, H = o.alto || 500, r = o.feston || 8;
    var cx = W / 2, cy = H / 2, a = W / 2, b = H / 2, id = 'mb-blonda-' + (++uid);
    var svg = nodo('svg', { viewBox: '0 0 ' + W + ' ' + H, 'aria-hidden': 'true', focusable: 'false' });
    var defs = nodo('defs', {});
    var mask = nodo('mask', { id: id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H });
    function papel(el) { el.setAttribute('fill', '#fff'); mask.appendChild(el); }
    function hueco(el) { el.setAttribute('fill', '#000'); mask.appendChild(el); }
    function anilloA(prof, paso, fase) { var ra = a - prof * r, rb = b - prof * r; return anilloN(ra, rb, cx, cy, Math.round(perimetro(ra, rb) / (paso * r)), fase || 0); }
    function gota(x, y, ang, largo, ancho) { return nodo('ellipse', { cx: x.toFixed(2), cy: y.toFixed(2), rx: (largo / 2).toFixed(2), ry: (ancho / 2).toFixed(2), transform: 'rotate(' + ang.toFixed(1) + ' ' + x.toFixed(2) + ' ' + y.toFixed(2) + ')' }); }

    // 1. papel y festón con tres piquitos por onda
    papel(nodo('ellipse', { cx: cx, cy: cy, rx: a - r, ry: b - r }));
    anilloA(1, 1.7).forEach(function (p) {
      papel(nodo('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: r }));
      [-38, 0, 38].forEach(function (d) {
        var g = rad(p.ang + d);
        papel(nodo('circle', { cx: (p.x + Math.cos(g) * r * 1.05).toFixed(2), cy: (p.y + Math.sin(g) * r * 1.05).toFixed(2), r: (r * .26).toFixed(2) }));
      });
    });
    // 2. ojales bajo cada onda
    anilloA(2.05, 1.7).forEach(function (p) { hueco(nodo('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: (r * .32).toFixed(2) })); });
    // 3. abanicos calados
    anilloA(3.6, 3.4).forEach(function (p) {
      [-48, -24, 0, 24, 48].forEach(function (d) {
        var g = rad(p.ang + d);
        hueco(gota(p.x + Math.cos(g) * r * .75, p.y + Math.sin(g) * r * .75, p.ang + d, r * 1.25, r * .34));
      });
      hueco(nodo('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: (r * .2).toFixed(2) }));
    });
    // 4. picado entre abanicos y malla
    anilloA(4.95, .95).forEach(function (p) { hueco(nodo('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: (r * .16).toFixed(2) })); });
    // 5. malla de rombos en dos filas alternadas
    var nMalla = Math.round(perimetro(a - 5.8 * r, b - 5.8 * r) / (1.35 * r));
    [[5.8, 0], [6.55, .5]].forEach(function (f) {
      anilloN(a - f[0] * r, b - f[0] * r, cx, cy, nMalla, f[1]).forEach(function (p) {
        var s = r * .34;
        hueco(nodo('rect', { x: (p.x - s / 2).toFixed(2), y: (p.y - s / 2).toFixed(2), width: s.toFixed(2), height: s.toFixed(2), transform: 'rotate(' + (p.ang + 45).toFixed(1) + ' ' + p.x.toFixed(2) + ' ' + p.y.toFixed(2) + ')' }));
      });
    });
    // 6. flores caladas de cinco pétalos con hojitas
    anilloA(7.9, 4.2).forEach(function (p, i, arr) {
      for (var k = 0; k < 5; k++) {
        var g = p.ang + k * 72;
        hueco(gota(p.x + Math.cos(rad(g)) * r * .55, p.y + Math.sin(rad(g)) * r * .55, g, r * .78, r * .42));
      }
      var q = arr[(i + 1) % arr.length], mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, tang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;
      hueco(gota(mx - Math.cos(rad(tang)) * r * .55, my - Math.sin(rad(tang)) * r * .55, tang + 30, r * .9, r * .3));
      hueco(gota(mx + Math.cos(rad(tang)) * r * .55, my + Math.sin(rad(tang)) * r * .55, tang - 30, r * .9, r * .3));
    });
    // 7. picado fino interior
    anilloA(9.3, .75).forEach(function (p) { hueco(nodo('circle', { cx: p.x.toFixed(2), cy: p.y.toFixed(2), r: (r * .13).toFixed(2) })); });

    // grano de papel hecho a mano
    var fid = id + '-grano';
    var filtro = nodo('filter', { id: fid, x: 0, y: 0, width: '100%', height: '100%' });
    filtro.appendChild(nodo('feTurbulence', { type: 'fractalNoise', baseFrequency: '.85', numOctaves: '2', seed: '3' }));
    filtro.appendChild(nodo('feColorMatrix', { values: '0 0 0 0 .45  0 0 0 0 .2  0 0 0 0 .22  0 0 0 .14 0' }));
    defs.appendChild(filtro);
    defs.appendChild(mask);
    svg.appendChild(defs);
    svg.appendChild(nodo('rect', { width: W, height: H, fill: 'currentColor', mask: 'url(#' + id + ')' }));
    svg.appendChild(nodo('rect', { width: W, height: H, filter: 'url(#' + fid + ')', mask: 'url(#' + id + ')' }));

    // filetes dorados interiores
    svg.appendChild(nodo('ellipse', { cx: cx, cy: cy, rx: a - 10 * r, ry: b - 10 * r, fill: 'none', style: 'stroke:var(--oro);stroke-width:1.2' }));
    svg.appendChild(nodo('ellipse', { cx: cx, cy: cy, rx: a - 10.6 * r, ry: b - 10.6 * r, fill: 'none', style: 'stroke:var(--oro);stroke-width:.7;stroke-dasharray:1 3;stroke-linecap:round' }));

    host.insertBefore(svg, host.firstChild);
    return svg;
  }

  /* Encaje sobre los bordes de la solapa del sobre */
  function encajeSolapa(solapa) {
    var box = solapa.getBoundingClientRect(), w = Math.round(box.width), h = Math.round(box.height);
    if (!w || !h) return;
    var vieja = solapa.querySelector('.mb-sobre__encaje');
    if (vieja) vieja.remove();
    var id = 'mb-solapa-' + (++uid), r = Math.max(4.5, w / 64), B = r * 3.4;
    var svg = nodo('svg', { 'class': 'mb-sobre__encaje', viewBox: '0 0 ' + w + ' ' + h, 'aria-hidden': 'true', focusable: 'false' });
    var defs = nodo('defs', {}), mask = nodo('mask', { id: id, maskUnits: 'userSpaceOnUse', x: -30, y: -30, width: w + 60, height: h + 60 });
    mask.appendChild(nodo('rect', { x: -30, y: -30, width: w + 60, height: h + 60, fill: '#000' }));
    var hilos = [];
    function f2(v) { return v.toFixed(2); }
    [[0, 0, w / 2, h], [w, 0, w / 2, h]].forEach(function (e, lado) {
      var dx = e[2] - e[0], dy = e[3] - e[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
      var nx = lado ? dy / len : -dy / len, ny = lado ? -dx / len : dx / len; // normal hacia afuera de la solapa
      var angN = Math.atan2(ny, nx) * 180 / Math.PI, fin = len - r * 4;
      function P(t, u) { return [e[0] + ux * t + nx * u, e[1] + uy * t + ny * u]; }
      function papel(el) { el.setAttribute('fill', '#fff'); mask.appendChild(el); }
      function hueco(el) { el.setAttribute('fill', '#000'); mask.appendChild(el); }
      function circ(t, u, rr) { var q = P(t, u); return nodo('circle', { cx: f2(q[0]), cy: f2(q[1]), r: f2(rr) }); }
      function gota(t, u, ang, largo, ancho) { var q = P(t, u); return nodo('ellipse', { cx: f2(q[0]), cy: f2(q[1]), rx: f2(largo / 2), ry: f2(ancho / 2), transform: 'rotate(' + ang.toFixed(1) + ' ' + f2(q[0]) + ' ' + f2(q[1]) + ')' }); }
      // cinta de papel de la puntilla
      var a0 = P(0, -B / 2), a1 = P(fin + r, -B / 2);
      papel(nodo('line', { x1: f2(a0[0]), y1: f2(a0[1]), x2: f2(a1[0]), y2: f2(a1[1]), stroke: '#fff', 'stroke-width': f2(B) }));
      // borde interior ondulado
      for (var ti = r * .5; ti < fin; ti += r * .9) papel(circ(ti, -B, r * .42));
      // festón exterior con tres piquitos y ojal
      for (var t = r; t < fin; t += r * 1.9) {
        papel(circ(t, r * .15, r));
        [-42, 0, 42].forEach(function (d) {
          var g = (angN + d) * Math.PI / 180, cx = Math.cos(g) * r * 1.08, cy = Math.sin(g) * r * 1.08, q = P(t, r * .15);
          papel(nodo('circle', { cx: f2(q[0] + cx), cy: f2(q[1] + cy), r: f2(r * .24) }));
        });
        hueco(circ(t, r * .25, r * .3));
      }
      // abanicos calados entre ondas
      for (var ta = r * 1.95; ta < fin - r; ta += r * 3.8) {
        [-34, 0, 34].forEach(function (d) {
          var g = (angN + d) * Math.PI / 180, q = P(ta, -r * 1.05);
          hueco(nodo('ellipse', { cx: f2(q[0] + Math.cos(g) * r * .55), cy: f2(q[1] + Math.sin(g) * r * .55), rx: f2(r * .5), ry: f2(r * .17), transform: 'rotate(' + (angN + d).toFixed(1) + ' ' + f2(q[0] + Math.cos(g) * r * .55) + ' ' + f2(q[1] + Math.sin(g) * r * .55) + ')' }));
        });
        hueco(circ(ta, -r * 1.05, r * .14));
      }
      // flores caladas alternadas con los abanicos
      for (var tf = r * 3.85; tf < fin - r; tf += r * 3.8) {
        for (var k = 0; k < 4; k++) hueco(gota(tf, -r * 1.05, angN + 45 + k * 90, r * .55, r * .26));
      }
      // fila de rombos
      for (var tr = r * .8; tr < fin; tr += r * 1.15) {
        var q = P(tr, -r * 2.2), sz = r * .36;
        hueco(nodo('rect', { x: f2(q[0] - sz / 2), y: f2(q[1] - sz / 2), width: f2(sz), height: f2(sz), transform: 'rotate(' + (angN + 45).toFixed(1) + ' ' + f2(q[0]) + ' ' + f2(q[1]) + ')' }));
      }
      // picado fino junto al borde interior
      for (var tp = r * .5; tp < fin; tp += r * .9) hueco(circ(tp, -B + r * .18, r * .11));
      var h0 = P(r * .5, -r * 1.7), h1 = P(fin, -r * 1.7);
      hilos.push(f2(h0[0]) + ',' + f2(h0[1]) + ' ' + f2(h1[0]) + ',' + f2(h1[1]));
    });
    defs.appendChild(mask);
    var recorte = nodo('clipPath', { id: id + '-r' });
    recorte.appendChild(nodo('rect', { x: 0, y: 0, width: w, height: h + 40 }));
    defs.appendChild(recorte);
    svg.appendChild(defs);
    var capa = nodo('g', { 'clip-path': 'url(#' + id + '-r)' });
    capa.appendChild(nodo('rect', { x: -30, y: -30, width: w + 60, height: h + 60, 'class': 'mb-sobre__encaje-papel', mask: 'url(#' + id + ')' }));
    hilos.forEach(function (pts) { capa.appendChild(nodo('polyline', { points: pts, fill: 'none', 'class': 'mb-sobre__encaje-filete' })); });
    svg.appendChild(capa);
    solapa.appendChild(svg);
  }

  /* Sobre: abre y cierra con el lacre. host = .mb-sobre */
  function sobre(host) {
    var boton = host.querySelector(':scope > .mb-lacre');
    if (!boton) return;
    if (host.getAttribute('data-mb-listo')) return;
    host.setAttribute('data-mb-listo', '1');
    var solapa = host.querySelector(':scope > .mb-sobre__solapa');
    if (solapa) {
      encajeSolapa(solapa);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { encajeSolapa(solapa); });
    }
    if (!host.querySelector('.mb-sobre__cinta')) {
      var cinta = document.createElement('div');
      cinta.className = 'mb-sobre__cinta';
      cinta.setAttribute('aria-hidden', 'true');
      host.insertBefore(cinta, boton);
    }
    boton.setAttribute('aria-expanded', 'false');
    boton.addEventListener('click', function () {
      var abierto = host.classList.toggle('is-abierto');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      boton.setAttribute('aria-label', abierto ? 'Cerrar invitación' : 'Abrir invitación');
    });
    var ayuda = host.querySelector(':scope > .mb-sobre__ayuda');
    if (ayuda) ayuda.addEventListener('click', function () { boton.click(); });
  }

  /* Cuenta regresiva. host contiene [data-unidad="dias|horas|minutos|segundos"]. Devuelve una función para detenerla. */
  function cuentaRegresiva(host, fecha) {
    var fin = new Date(fecha).getTime();
    function dos(n) { return (n < 10 ? '0' : '') + n; }
    function tick() {
      var s = Math.max(0, Math.floor((fin - Date.now()) / 1000));
      var v = { dias: Math.floor(s / 86400), horas: Math.floor(s % 86400 / 3600), minutos: Math.floor(s % 3600 / 60), segundos: s % 60 };
      for (var k in v) {
        var n = host.querySelector('[data-unidad="' + k + '"]');
        if (n) n.textContent = k === 'dias' ? String(v[k]) : dos(v[k]);
      }
    }
    tick();
    var t = setInterval(tick, 1000);
    return function () { clearInterval(t); };
  }

  /* ================= Ornamentos dibujados a mano ================= */
  function n(tag, a, parent) { var e = nodo(tag, a); if (parent) parent.appendChild(e); return e; }
  function f1(v) { return v.toFixed(1); }

  function florete(g, x, y, r) {
    var f = n('g', { transform: 'translate(' + f1(x) + ' ' + f1(y) + ')' }, g);
    for (var i = 0; i < 5; i++) {
      var a = i * 72 - 90, cx = Math.cos(a * Math.PI / 180) * r * .62, cy = Math.sin(a * Math.PI / 180) * r * .62;
      n('ellipse', { cx: f1(cx), cy: f1(cy), rx: f1(r * .52), ry: f1(r * .32), transform: 'rotate(' + a + ' ' + f1(cx) + ' ' + f1(cy) + ')', 'class': 'mb-trazo mb-trazo--fino' }, f);
    }
    n('circle', { cx: 0, cy: 0, r: f1(r * .22), 'class': 'mb-relleno' }, f);
  }
  function hoja(g, x, y, len, ang) {
    var h = n('g', { transform: 'translate(' + f1(x) + ' ' + f1(y) + ') rotate(' + f1(ang) + ')' }, g);
    n('path', { d: 'M0 0Q' + len * .5 + ' ' + (-len * .34) + ' ' + len + ' 0Q' + len * .5 + ' ' + len * .34 + ' 0 0Z', 'class': 'mb-trazo mb-trazo--fino' }, h);
    n('path', { d: 'M1 0L' + (len * .82) + ' 0', 'class': 'mb-trazo mb-trazo--fino' }, h);
  }
  function rosaLinea(g, x, y, r) {
    var f = n('g', { transform: 'translate(' + x + ' ' + y + ')' }, g);
    n('path', { d: 'M0 0c0-2 3-2 3 0 0 3-5 4-6 0-1-5 5-8 9-5 5 4 1 11-5 11', transform: 'scale(' + (r / 10).toFixed(2) + ')', 'class': 'mb-trazo' }, f);
    for (var i = 0; i < 5; i++) {
      var a = i * 72 * Math.PI / 180, b = a + 1.15;
      n('path', { d: 'M' + f1(Math.cos(a) * r) + ' ' + f1(Math.sin(a) * r) + 'Q' + f1(Math.cos(a + .58) * r * 1.45) + ' ' + f1(Math.sin(a + .58) * r * 1.45) + ' ' + f1(Math.cos(b) * r) + ' ' + f1(Math.sin(b) * r), 'class': 'mb-trazo' }, f);
    }
  }
  function brotes(g, path, hojas, flores) {
    var L = path.getTotalLength();
    hojas.forEach(function (t, i) {
      var p = path.getPointAtLength(L * t), q = path.getPointAtLength(Math.min(L, L * t + 1));
      hoja(g, p.x, p.y, 12, Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + (i % 2 ? 48 : -48));
    });
    flores.forEach(function (t) { var p = path.getPointAtLength(L * t); florete(g, p.x, p.y, 5.5); });
  }

  /* Orla de esquina: dos ramas que abrazan el borde, rosa, hojas y florecitas. */
  function orla(svg) {
    svg.replaceChildren();
    svg.setAttribute('viewBox', '0 0 120 120');
    var g = n('g', {}, svg);
    n('path', { d: 'M14 22c-2-9 9-14 14-7 3 5-2 10-6 7-3-2-1-6 2-5', 'class': 'mb-trazo' }, g);
    var top = n('path', { d: 'M26 14C44 6 54 22 72 13S100 8 116 12', 'class': 'mb-trazo' }, g);
    var izq = n('path', { d: 'M14 26C6 44 22 54 13 72S8 100 12 116', 'class': 'mb-trazo' }, g);
    n('path', { d: 'M72 13c4-8 13-7 13-1 0 4-5 5-7 2', 'class': 'mb-trazo mb-trazo--fino' }, g);
    n('path', { d: 'M13 72c-8 4-7 13-1 13 4 0 5-5 2-7', 'class': 'mb-trazo mb-trazo--fino' }, g);
    n('path', { d: 'M30 30c10 2 14 10 12 18', 'class': 'mb-trazo mb-trazo--fino' }, g);
    brotes(g, top, [.18, .42, .66, .9], [.55]);
    brotes(g, izq, [.18, .42, .66, .9], [.55]);
    rosaLinea(g, 32, 32, 9);
    hoja(g, 40, 40, 13, 45);
    florete(g, 52, 30, 4.5);
    florete(g, 30, 52, 4.5);
    n('circle', { cx: 44, cy: 50, r: 1.6, 'class': 'mb-relleno' }, g);
    n('circle', { cx: 50, cy: 44, r: 1.2, 'class': 'mb-relleno' }, g);
  }

  /* Floritura horizontal simétrica */
  function floritura(svg) {
    svg.replaceChildren();
    svg.setAttribute('viewBox', '0 0 300 40');
    var g = n('g', {}, svg);
    [1, -1].forEach(function (s) {
      var lado = n('g', { transform: s === 1 ? '' : 'translate(300 0) scale(-1 1)' }, g);
      var p = n('path', { d: 'M136 20C120 4 104 34 88 20S54 8 40 20c-8 7-20 4-18-5 2-7 11-6 11 0', 'class': 'mb-trazo' }, lado);
      n('path', { d: 'M88 20c-2 8-10 10-14 6', 'class': 'mb-trazo mb-trazo--fino' }, lado);
      brotes(lado, p, [.15, .35, .62], []);
      n('circle', { cx: 16, cy: 20, r: 1.6, 'class': 'mb-relleno' }, lado);
    });
    florete(g, 150, 20, 8);
  }

  /* Guirnalda vertical: se ajusta al alto real del elemento */
  function guirnalda(svg) {
    var h = Math.round(svg.getBoundingClientRect().height);
    if (!h) return;
    svg.replaceChildren();
    svg.setAttribute('viewBox', '0 0 34 ' + h);
    var g = n('g', {}, svg), d = 'M17 0', paso = 46, y, i = 0;
    for (y = 0; y < h; y += paso) d += 'Q' + (17 + ((y / paso) % 2 ? -9 : 9)) + ' ' + (y + paso / 2) + ' 17 ' + Math.min(h, y + paso);
    var p = n('path', { d: d, 'class': 'mb-trazo' }, g), L = p.getTotalLength();
    for (var t = 18; t < L - 10; t += 23, i++) {
      var a = p.getPointAtLength(t), b = p.getPointAtLength(t + 1);
      if (i % 5 === 2) florete(g, a.x, a.y, 5.5);
      else hoja(g, a.x, a.y, 11, Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + (i % 2 ? 55 : -55));
    }
    rosaLinea(g, 17, 6, 7);
    rosaLinea(g, 17, h - 6, 7);
  }

  /* Relieve floral ciego: rosas, flores y hojas rellenas del color del papel */
  function petalos(g, cuantos, dist, rx, ry, giro) {
    for (var i = 0; i < cuantos; i++) {
      var a = i * 360 / cuantos + giro, cx = Math.cos(a * Math.PI / 180) * dist, cy = Math.sin(a * Math.PI / 180) * dist;
      n('ellipse', { cx: f1(cx), cy: f1(cy), rx: f1(rx), ry: f1(ry), transform: 'rotate(' + f1(a) + ' ' + f1(cx) + ' ' + f1(cy) + ')', 'class': 'rv' }, g);
    }
  }
  function rosaRV(g, x, y, r) {
    var f = n('g', { transform: 'translate(' + f1(x) + ' ' + f1(y) + ')' }, g);
    petalos(f, 6, r * .58, r * .5, r * .36, 0);
    petalos(f, 5, r * .3, r * .32, r * .24, 30);
    n('circle', { cx: 0, cy: 0, r: f1(r * .2), 'class': 'rv' }, f);
  }
  function florRV(g, x, y, r) {
    var f = n('g', { transform: 'translate(' + f1(x) + ' ' + f1(y) + ')' }, g);
    petalos(f, 5, r * .6, r * .55, r * .38, -90);
    n('circle', { cx: 0, cy: 0, r: f1(r * .24), 'class': 'rv' }, f);
  }
  function hojaRV(g, x, y, len, ang) {
    var h = n('g', { transform: 'translate(' + f1(x) + ' ' + f1(y) + ') rotate(' + f1(ang) + ')' }, g);
    n('path', { d: 'M0 0Q' + len * .5 + ' ' + (-len * .36) + ' ' + len + ' 0Q' + len * .5 + ' ' + len * .36 + ' 0 0Z', 'class': 'rv' }, h);
    n('path', { d: 'M2 0L' + (len * .8) + ' 0', 'class': 'rv', style: 'fill:none' }, h);
  }
  function ramaRV(g, d, hojas, flores) {
    var p = n('path', { d: d, 'class': 'rv-tallo' }, g), L = p.getTotalLength();
    for (var t = 0; t < hojas; t++) {
      var s = (t + .5) / hojas, a = p.getPointAtLength(L * s), b = p.getPointAtLength(Math.min(L, L * s + 1));
      hojaRV(g, a.x, a.y, 16, Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI + (t % 2 ? 50 : -50));
    }
    flores.forEach(function (s) { var a = p.getPointAtLength(L * s); florRV(g, a.x, a.y, 6); });
  }
  function relieve(svg) {
    var box = svg.getBoundingClientRect(), w = Math.round(box.width), h = Math.round(box.height), m = 30;
    if (!w || !h) return;
    svg.replaceChildren();
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var g = n('g', { 'class': 'capa' }, svg);
    function ola(x1, y1, x2, y2, amp) {
      var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len, steps = Math.max(2, Math.round(len / 60)), d = 'M' + x1 + ' ' + y1;
      for (var i = 1; i <= steps; i++) {
        var t0 = (i - .5) / steps, t1 = i / steps, s = (i % 2 ? 1 : -1) * amp;
        d += 'Q' + f1(x1 + dx * t0 + nx * s) + ' ' + f1(y1 + dy * t0 + ny * s) + ' ' + f1(x1 + dx * t1) + ' ' + f1(y1 + dy * t1);
      }
      return d;
    }
    var hx = Math.max(2, Math.round((w - 2 * m - 90) / 70)), hy = Math.max(2, Math.round((h - 2 * m - 90) / 70));
    ramaRV(g, ola(m + 44, m - 8, w - m - 44, m - 8, 6), hx * 2, [.5]);
    ramaRV(g, ola(m + 44, h - m + 8, w - m - 44, h - m + 8, 6), hx * 2, [.5]);
    ramaRV(g, ola(m - 8, m + 44, m - 8, h - m - 44, 6), hy * 2, [.5]);
    ramaRV(g, ola(w - m + 8, m + 44, w - m + 8, h - m - 44, 6), hy * 2, [.5]);
    [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]].forEach(function (c) {
      var x = c[0], y = c[1], sx = c[2], sy = c[3];
      hojaRV(g, x, y, 30, sx > 0 ? 0 : 180);
      hojaRV(g, x, y, 30, sy > 0 ? 90 : -90);
      hojaRV(g, x, y, 24, Math.atan2(sy, sx) * 180 / Math.PI);
      rosaRV(g, x + sx * 30, y + sy * 8, 11);
      rosaRV(g, x + sx * 8, y + sy * 30, 11);
      rosaRV(g, x, y, 17);
    });
  }

  function cada(root, sel, fn) { Array.prototype.forEach.call(root.querySelectorAll(sel), fn); }
  function medidos(root) {
    cada(root, '[data-mb="relieve"]', relieve);
    cada(root, '[data-mb="guirnalda"]', guirnalda);
  }
  var escuchando = false;

  /* Inicia todo lo marcado con data-mb dentro de root. */
  /* Centra el monograma por su trazo real (la caligráfica tiene rizos que descentran la caja del texto) */
  var lienzo;
  function centrarIniciales(el) {
    var letras = el.children;
    if (!letras.length || !el.offsetWidth) return;
    lienzo = lienzo || document.createElement('canvas');
    var ctx = lienzo.getContext('2d'), cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
    ctx.font = fs + 'px ' + cs.fontFamily;
    el.style.transform = 'none';
    var x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
    Array.prototype.forEach.call(letras, function (s) {
      var m = ctx.measureText(s.textContent);
      var asc = m.fontBoundingBoxAscent || fs * .8, des = m.fontBoundingBoxDescent || fs * .2;
      var base = (s.offsetHeight - (asc + des)) / 2 + asc;
      var tr = getComputedStyle(s).transform, dy = 0;
      if (tr && tr !== 'none' && window.DOMMatrix) dy = new DOMMatrix(tr).m42;
      var x = s.offsetLeft, y = s.offsetTop + dy + base;
      x0 = Math.min(x0, x - m.actualBoundingBoxLeft); x1 = Math.max(x1, x + m.actualBoundingBoxRight);
      y0 = Math.min(y0, y - m.actualBoundingBoxAscent); y1 = Math.max(y1, y + m.actualBoundingBoxDescent);
    });
    var dx = el.offsetWidth / 2 - (x0 + x1) / 2, dyc = el.offsetHeight / 2 - (y0 + y1) / 2;
    el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dyc.toFixed(1) + 'px)';
  }

  function iniciar(root) {
    root = root || document;
    cada(root, '.mb-iniciales', centrarIniciales);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { cada(root, '.mb-iniciales', centrarIniciales); });
    cada(root, '[data-mb="blonda"]', function (el) { if (!el.querySelector(':scope > svg')) blonda(el, { ancho: +el.getAttribute('data-ancho') || 0, alto: +el.getAttribute('data-alto') || 0 }); });
    cada(root, '[data-mb="sobre"]', sobre);
    cada(root, '[data-mb-cuenta]', function (el) { cuentaRegresiva(el, el.getAttribute('data-mb-cuenta')); });
    cada(root, '[data-mb="orla"]', orla);
    cada(root, '[data-mb="floritura"]', floritura);
    cada(root, '[data-mb="florete"]', function (s) { s.replaceChildren(); s.setAttribute('viewBox', '-10 -10 20 20'); florete(s, 0, 0, 7.5); });
    medidos(root);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medidos(root); });
    if (!escuchando) {
      escuchando = true;
      var espera;
      window.addEventListener('resize', function () { clearTimeout(espera); espera = setTimeout(function () { medidos(document); }, 200); });
    }
  }

  window.MarmolBlonda = { centrarIniciales: centrarIniciales, blonda: blonda, sobre: sobre, cuentaRegresiva: cuentaRegresiva, orla: orla, floritura: floritura, guirnalda: guirnalda, relieve: relieve, iniciar: iniciar };
})();
