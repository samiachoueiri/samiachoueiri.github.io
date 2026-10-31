/*
 * Infographics built from small data specs (no image files). SITE.infographic(spec) returns a DOM node.
 * Types:
 *   pipeline  { lanes: [{ label, stages: [...], highlight }], badges }
 *   flows     { zones: [left, middle, right], flows: [{ label, dir: 'out'|'in', allow: bool }], badges }
 *   groups    { source, groups: [{ label, items: [...] }], badges }
 *   sketch    { input, stages: [...], rows, cols, output: [...], note, badges }
 *   humanoid  { joints, force, steps: [...], badges }
 *   dpu       { sources, chip, stages, ok, alert, host, caption }   (SVG diagram)
 *   threshold { flows: [{ id, v }], threshold, engine, inLabel, outLabel, caption }   (SVG diagram)
 *   cms       { engine, sketch, rows, cols, attackCells, normalLabel, attackLabel, ok, alert, pill, rate, caption }   (SVG diagram)
 *   testbed   { origin, slice, nodes, cores, coreLabel, caption }   (SVG diagram)
 * `badges: [{ value, label }]` adds headline facts under any type.
 * Colours come from the theme tokens, so everything follows light/dark mode.
 */
(function () {
  var h = SITE.h;
  var types = {};

  function badges(list) {
    if (!list || !list.length) return null;
    return h('div', { class: 'ig-badges' }, list.map(function (b) {
      return h('div', { class: 'ig-badge' }, h('b', null, b.value), h('span', null, b.label));
    }));
  }

  function steps(list, cls) {
    return h('ol', { class: 'ig-steps' + (cls ? ' ' + cls : '') }, list.map(function (s) {
      return h('li', { class: 'ig-step' }, s);
    }));
  }

  types.pipeline = function (s) {
    return [
      s.lanes.map(function (lane) {
        return h('div', { class: 'ig-lane' + (lane.highlight ? ' hl' : '') },
          h('div', { class: 'ig-lane-label' }, lane.label),
          steps(lane.stages));
      })
    ];
  };

  types.flows = function (s) {
    return [
      h('div', { class: 'ig-zones' }, s.zones.map(function (z, i) {
        return h('div', { class: 'ig-zone' + (i === 1 ? ' mid' : '') }, z);
      })),
      h('div', { class: 'ig-flow-rows' }, s.flows.map(function (f) {
        var cls = 'ig-flow ' + f.dir + ' ' + (f.allow ? 'ok' : 'no');
        return h('div', { class: cls },
          h('div', { class: 'ig-arrow' }),
          h('div', { class: 'ig-flow-label' },
            h('span', { class: 'ig-state', 'aria-hidden': 'true' }, f.allow ? '✓' : '✕'),
            f.label, h('span', { class: 'sr-only' }, f.allow ? ' (allowed)' : ' (dropped)')));
      }))
    ];
  };

  types.groups = function (s) {
    var total = s.groups.reduce(function (n, g) { return n + g.items.length; }, 0);
    return [
      h('div', { class: 'ig-source' }, s.source, h('span', { class: 'ig-to' }, '→'),
        h('b', null, s.groups.length + ' families · ' + total + ' models')),
      h('div', { class: 'ig-groups' }, s.groups.map(function (g) {
        return h('div', { class: 'ig-group' },
          h('div', { class: 'ig-group-head' }, h('b', null, g.label),
            h('span', { class: 'ig-pips', title: g.items.length + ' model' + (g.items.length > 1 ? 's' : '') },
              g.items.map(function () { return h('i'); }))),
          h('div', { class: 'ig-chips' }, g.items.map(function (it) { return h('span', { class: 'ig-chip' }, it); })));
      }))
    ];
  };

  types.sketch = function (s) {
    var rows = s.rows || 4, cols = s.cols || 10;
    // Deterministic, illustrative counter values: a few hot columns stand out.
    var hot = s.hot || [2, 7];
    var grid = h('div', { class: 'ig-grid', style: { gridTemplateColumns: 'repeat(' + cols + ', 1fr)' }, role: 'img', 'aria-label': 'Illustrative grid of hashed counters, with a few hot cells' });
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var v = hot.indexOf((c + r * 3) % cols) !== -1 ? 1 : ((c * 7 + r * 5) % 9) / 22;
        grid.append(h('i', { style: { opacity: (0.15 + v * 0.85).toFixed(2) } }));
      }
    }
    return [
      h('div', { class: 'ig-sketch' },
        h('div', { class: 'ig-sk-col' },
          h('div', { class: 'ig-flowlines' }, [3, 1, 6, 1, 2, 1].map(function (w) { return h('i', { style: { height: w + 'px' } }); })),
          h('span', { class: 'ig-cap' }, s.input)),
        h('span', { class: 'ig-to' }, '→'),
        h('div', { class: 'ig-sk-col grow' }, grid, h('span', { class: 'ig-cap' }, s.gridLabel)),
        h('span', { class: 'ig-to' }, '→'),
        h('div', { class: 'ig-sk-col' },
          h('div', { class: 'ig-hh' }, s.output.map(function (o) { return h('span', null, o); })),
          h('span', { class: 'ig-cap' }, s.outputLabel))),
      s.stages ? steps(s.stages, 'compact') : null,
      s.note ? h('p', { class: 'ig-note' }, s.note) : null
    ];
  };

  types.humanoid = function (s) {
    var NS = 'http://www.w3.org/2000/svg';
    function el(tag, attrs) {
      var e = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      return e;
    }
    var svg = el('svg', { viewBox: '0 0 120 170', class: 'ig-body', role: 'img', 'aria-label': 'Humanoid outline with joint sensors and an external force hitting the torso' });
    var limbs = [[60, 34, 60, 92], [60, 44, 36, 64], [36, 64, 30, 88], [60, 44, 84, 64], [84, 64, 90, 88],
                 [60, 92, 46, 124], [46, 124, 44, 156], [60, 92, 74, 124], [74, 124, 76, 156]];
    limbs.forEach(function (l) { svg.append(el('line', { x1: l[0], y1: l[1], x2: l[2], y2: l[3], class: 'ig-limb' })); });
    svg.append(el('circle', { cx: 60, cy: 20, r: 11, class: 'ig-head' }));
    [[60, 34], [60, 44], [36, 64], [84, 64], [30, 88], [90, 88], [60, 66], [60, 92], [46, 124], [74, 124], [44, 156], [76, 156]]
      .forEach(function (p) { svg.append(el('circle', { cx: p[0], cy: p[1], r: 3.6, class: 'ig-joint' })); });
    // Force arrow hitting the torso from the right
    svg.append(el('line', { x1: 112, y1: 58, x2: 68, y2: 72, class: 'ig-force' }));
    svg.append(el('path', { d: 'M66 73 L75 66 L76 76 Z', class: 'ig-force-head' }));
    var label = el('text', { x: 104, y: 52, class: 'ig-force-label' });
    label.textContent = 'F';
    svg.append(label);

    return [
      h('div', { class: 'ig-humanoid' },
        h('div', { class: 'ig-body-wrap' }, svg,
          h('span', { class: 'ig-cap' }, s.joints)),
        steps(s.steps, 'vertical'))
    ];
  };

  /* ---------- SVG diagrams (scale with the card; colours from theme tokens) ---------- */

  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, text) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { if (attrs[k] != null) e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function svgRoot(w, hgt, label) {
    return s('svg', { viewBox: '0 0 ' + w + ' ' + hgt, class: 'ig-svg', role: 'img', 'aria-label': label });
  }
  function box(x, y, w, hgt, cls) { return s('rect', { x: x, y: y, width: w, height: hgt, rx: 8, class: cls || 'ig-s-box' }); }
  function text(x, y, t, cls, anchor) { return s('text', { x: x, y: y, class: cls || 'ig-s-t', 'text-anchor': anchor || 'middle' }, t); }
  function flow(d, cls) { return s('path', { d: d, class: 'ig-s-link ' + (cls || '') }); }
  function arrowHead(x, y, cls) {
    var d = /\bdown\b/.test(cls || '')
      ? 'M' + (x - 4) + ' ' + (y - 7) + ' L' + x + ' ' + y + ' L' + (x + 4) + ' ' + (y - 7) + ' Z'   // pointing down
      : 'M' + (x - 7) + ' ' + (y - 4) + ' L' + x + ' ' + y + ' L' + (x - 7) + ' ' + (y + 4) + ' Z';  // pointing right
    return s('path', { d: d, class: cls || 'ig-s-head' });
  }

  /* dpu: devices -> DPU chip (stages inside) -> forward / alert, host CPU left idle
     { sources: [..2], chip, stages: [..3], ok: [title, sub], alert: [title, sub], host, caption } */
  types.dpu = function (o) {
    var g = svgRoot(480, 250, 'Traffic from ' + o.sources.join(' and ') + ' is analysed inside the ' + o.chip + '; normal traffic is forwarded, attacks and faults raise an alert, and the host CPU is not used.');
    // sources
    o.sources.forEach(function (src, i) {
      var y = 52 + i * 80;
      g.append(box(8, y, 74, 38), text(45, y + 23, src, 'ig-s-t strong'));
      g.append(flow('M82 ' + (y + 19) + ' C 104 ' + (y + 19) + ', 104 112, 126 112', 'moving'));
    });
    g.append(arrowHead(130, 112));
    // chip with pins
    for (var p = 0; p < 9; p++) {
      g.append(s('line', { x1: 150 + p * 20, y1: 10, x2: 150 + p * 20, y2: 18, class: 'ig-s-pin' }));
      g.append(s('line', { x1: 150 + p * 20, y1: 206, x2: 150 + p * 20, y2: 214, class: 'ig-s-pin' }));
    }
    g.append(box(132, 18, 196, 188, 'ig-s-chip'));
    g.append(text(230, 40, o.chip, 'ig-s-t chip-label'));
    o.stages.forEach(function (st, i) {
      var y = 54 + i * 48;
      g.append(box(150, y, 160, 34, 'ig-s-stage'), text(i === 2 ? 210 : 230, y + 21, st, 'ig-s-t'));
      if (i < o.stages.length - 1) g.append(s('path', { d: 'M230 ' + (y + 35) + ' v5', class: 'ig-s-link' }), arrowHead(230, y + 47, 'ig-s-head down'));
    });
    // little forest in the last stage
    [262, 278, 294].forEach(function (x, i) {
      g.append(s('path', { d: 'M' + x + ' ' + (154 - (i % 2) * 3) + ' l-7 12 h14 Z', class: 'ig-s-tree' }));
      g.append(s('line', { x1: x, y1: 166, x2: x, y2: 170, class: 'ig-s-trunk' }));
    });
    // outputs
    g.append(flow('M328 112 C 350 112, 350 70, 372 70', 'ok moving'), arrowHead(376, 70, 'ig-s-head ok'));
    g.append(flow('M328 112 C 350 112, 350 150, 372 150', 'bad'), arrowHead(376, 150, 'ig-s-head bad'));
    g.append(text(384, 66, '✓ ' + o.ok[0], 'ig-s-t ok', 'start'), text(384, 82, o.ok[1], 'ig-s-t sub', 'start'));
    g.append(text(384, 146, '⚠ ' + o.alert[0], 'ig-s-t bad', 'start'), text(384, 162, o.alert[1], 'ig-s-t sub', 'start'));
    // idle host CPU
    g.append(box(360, 200, 112, 40, 'ig-s-ghost'), text(416, 217, o.host[0], 'ig-s-t sub strong'), text(416, 232, o.host[1], 'ig-s-t sub'));
    return [g, o.caption ? h('p', { class: 'ig-note' }, o.caption) : null];
  };

  /* threshold: flows of different size -> per-flow counters vs a threshold -> heavy hitters flagged
     { flows: [{ id, v }], threshold, engine, inLabel, outLabel, caption } */
  types.threshold = function (o) {
    var max = Math.max.apply(null, o.flows.map(function (f) { return f.v; }));
    var g = svgRoot(480, 230, 'Illustration: flows are counted in a ' + o.engine + '; flows whose count crosses the threshold are reported as heavy hitters.');
    var n = o.flows.length, top = 44, base = 180, x0 = 150, slot = 160 / n;
    // incoming flows, thickness ~ size
    o.flows.forEach(function (f, i) {
      var y = 60 + i * (110 / (n - 1));
      g.append(s('path', { d: 'M8 ' + y + ' C 70 ' + y + ', 90 112, 132 112', class: 'ig-s-flow' + (f.v >= o.threshold ? ' hot moving' : ''), 'stroke-width': (1 + f.v / max * 5).toFixed(1) }));
    });
    g.append(text(52, 34, o.inLabel, 'ig-s-t sub'));
    // engine box with bars
    g.append(box(136, 18, 188, 196, 'ig-s-chip'), text(230, 38, o.engine, 'ig-s-t chip-label'));
    var ty = base - (o.threshold / max) * (base - top - 10);
    o.flows.forEach(function (f, i) {
      var bh = (f.v / max) * (base - top - 10), bx = x0 + i * slot + 4, bw = slot - 8;
      var hot = f.v >= o.threshold;
      var bar = s('path', { d: 'M' + bx + ' ' + base + ' v-' + (bh - 4) + ' q0 -4 4 -4 h' + (bw - 8) + ' q4 0 4 4 v' + (bh - 4) + ' Z', class: 'ig-s-bar' + (hot ? ' hot' : '') });
      bar.append(s('title', null, 'Flow ' + f.id + (hot ? ' — above threshold' : '')));
      g.append(bar, text(bx + bw / 2, base + 14, f.id, 'ig-s-t sub'));
    });
    g.append(s('line', { x1: 146, y1: ty, x2: 314, y2: ty, class: 'ig-s-threshold' }), text(314, ty - 5, 'threshold', 'ig-s-t sub', 'end'));
    // heavy hitters out
    var hot = o.flows.filter(function (f) { return f.v >= o.threshold; });
    hot.forEach(function (f, i) {
      var y = 92 + i * 40;
      g.append(flow('M324 112 C 346 112, 346 ' + y + ', 368 ' + y, 'hot moving'), arrowHead(372, y, 'ig-s-head hot'));
      g.append(box(376, y - 13, 94, 26, 'ig-s-flag'), text(423, y + 4, '⚑ flow ' + f.id, 'ig-s-t flag'));
    });
    g.append(text(423, 70, o.outLabel, 'ig-s-t sub'));
    return [g, o.caption ? h('p', { class: 'ig-note' }, o.caption) : null];
  };

  /* cms: mixed traffic -> P4-DPDK pipeline with a Count-Min Sketch -> normal traffic forwarded at line rate,
     heavy-hitter attack identified.
     { engine, sketch, rows, cols, attackCells: [col per row], normalLabel, attackLabel, ok: [title, sub], alert: [title, sub], pill, rate, caption } */
  types.cms = function (o) {
    var rows = o.rows || 3, cols = o.cols || 8;
    var attackCells = o.attackCells || [2, 5, 1];
    var g = svgRoot(480, 252, 'Normal flows and a heavy-hitter attack flow enter a ' + o.engine + '. A ' + o.sketch +
      ' with ' + rows + ' hash rows counts packets; the attack flow\'s counters exceed the threshold, so the attack is identified while normal traffic is forwarded at ' + o.rate + '.');

    // incoming traffic: several thin normal flows + one thick attack flow
    [44, 66, 88, 178, 202].forEach(function (y) {
      g.append(s('path', { d: 'M8 ' + y + ' C 70 ' + y + ', 92 126, 132 126', class: 'ig-s-flow ok-flow moving', 'stroke-width': 1.6 }));
    });
    g.append(s('path', { d: 'M8 112 C 70 112, 92 126, 132 126', class: 'ig-s-flow attack moving', 'stroke-width': 6 }));
    g.append(text(8, 30, o.normalLabel, 'ig-s-t sub', 'start'));
    g.append(text(8, 132, '⚠ ' + o.attackLabel, 'ig-s-t bad', 'start'));

    // pipeline box
    g.append(box(134, 14, 196, 224, 'ig-s-chip'), text(232, 34, o.engine, 'ig-s-t chip-label'));
    g.append(text(232, 54, o.sketch, 'ig-s-t strong'));

    // Count-Min Sketch grid
    var gx = 172, gy = 66, cw = 18, ch = 22, gap = 2;
    for (var r = 0; r < rows; r++) {
      var y = gy + r * (ch + gap);
      g.append(text(gx - 10, y + 15, 'h' + '₁₂₃₄₅'.charAt(r), 'ig-s-t sub strong'));
      for (var c = 0; c < cols; c++) {
        var isAttack = attackCells[r] === c;
        var cell = s('rect', {
          x: gx + c * (cw + gap), y: y, width: cw, height: ch, rx: 3,
          class: isAttack ? 'ig-s-cell attack' : 'ig-s-cell',
          style: isAttack ? null : 'opacity:' + (0.25 + ((c * 5 + r * 3) % 7) / 14).toFixed(2)
        });
        cell.append(s('title', null, 'Row h' + (r + 1) + ', counter ' + (c + 1) + (isAttack ? ': hit by the attack flow — very high count' : ': normal count')));
        g.append(cell);
      }
    }
    // the attack packet hashed into one counter per row
    var px = 143, py = gy + (rows * (ch + gap)) / 2 - 1;
    g.append(s('circle', { cx: px, cy: py, r: 4, class: 'ig-s-pkt' }));
    for (var k = 0; k < rows; k++) {
      var cx = gx + attackCells[k] * (cw + gap) + cw / 2, cy = gy + k * (ch + gap) + ch / 2;
      g.append(s('path', { d: 'M' + px + ' ' + py + ' Q ' + (px + 10) + ' ' + cy + ' ' + (cx - cw / 2 - 1) + ' ' + cy, class: 'ig-s-hash' }));
    }

    // decision
    var dy = gy + rows * (ch + gap) + 20;
    g.append(text(232, dy, 'min(h₁, h₂, h₃) ≥ threshold', 'ig-s-t'));
    g.append(s('rect', { x: 166, y: dy + 10, width: 132, height: 26, rx: 13, class: 'ig-s-alert' }));
    g.append(text(232, dy + 27, '⚠ ' + (o.pill || o.alert[0]), 'ig-s-t alert-label'));

    // outputs
    g.append(flow('M330 126 C 352 126, 352 72, 374 72', 'ok moving'), arrowHead(378, 72, 'ig-s-head ok'));
    g.append(text(384, 54, o.rate, 'ig-s-t rate', 'start'));
    g.append(text(384, 72, '✓ ' + o.ok[0], 'ig-s-t ok', 'start'), text(384, 87, o.ok[1], 'ig-s-t sub', 'start'));
    g.append(flow('M330 126 C 352 126, 352 176, 374 176', 'bad'), arrowHead(378, 176, 'ig-s-head bad'));
    g.append(text(384, 172, '⚠ ' + o.alert[0], 'ig-s-t bad', 'start'), text(384, 187, o.alert[1], 'ig-s-t sub', 'start'));

    return [g, o.caption ? h('p', { class: 'ig-note' }, o.caption) : null];
  };

  /* testbed: notebook provisions a slice with hosts around a multicore P4-DPDK node
     { origin, slice, nodes: [left, center, right], cores, coreLabel, caption } */
  types.testbed = function (o) {
    var g = svgRoot(480, 230, o.origin + ' provisions a ' + o.slice + ' with ' + o.nodes.join(', ') + '; the middle node runs a multicore P4-DPDK pipeline.');
    // notebook
    g.append(box(8, 78, 76, 74, 'ig-s-box'));
    [96, 108, 120, 132].forEach(function (y, i) { g.append(s('line', { x1: 20, y1: y, x2: i === 3 ? 52 : 72, y2: y, class: 'ig-s-code' })); });
    g.append(text(46, 170, o.origin, 'ig-s-t strong'));
    g.append(flow('M84 115 H 108', 'moving'), arrowHead(112, 115));
    // slice panel
    g.append(s('rect', { x: 116, y: 14, width: 356, height: 202, rx: 14, class: 'ig-s-slice' }), text(130, 36, o.slice, 'ig-s-t chip-label', 'start'));
    var pos = [[170, 120], [294, 120], [418, 120]];
    g.append(flow('M196 120 H 250', 'moving'), flow('M338 120 H 392', 'moving'));
    pos.forEach(function (p, i) {
      var center = i === 1;
      var w = center ? 88 : 52, ht = center ? 76 : 52;
      g.append(box(p[0] - w / 2, p[1] - ht / 2, w, ht, center ? 'ig-s-stage hot' : 'ig-s-box'));
      if (center) {
        for (var c = 0; c < o.cores; c++) {
          var cx = p[0] - (o.cores * 16 - 4) / 2 + c * 16;
          g.append(s('rect', { x: cx, y: p[1] - 4, width: 12, height: 12, rx: 2, class: 'ig-s-core' }));
        }
        g.append(text(p[0], p[1] - 14, 'P4-DPDK', 'ig-s-t strong'));
      } else {
        g.append(s('rect', { x: p[0] - 14, y: p[1] - 12, width: 28, height: 18, rx: 3, class: 'ig-s-screen' }), s('line', { x1: p[0] - 8, y1: p[1] + 12, x2: p[0] + 8, y2: p[1] + 12, class: 'ig-s-code' }));
      }
      g.append(text(p[0], p[1] + ht / 2 + 18, o.nodes[i], 'ig-s-t'));
    });
    g.append(text(294, 200, o.coreLabel, 'ig-s-t sub'));
    return [g, o.caption ? h('p', { class: 'ig-note' }, o.caption) : null];
  };

  SITE.infographic = function (spec) {
    var render = types[spec.type];
    if (!render) return null;
    return h('figure', { class: 'ig ig-type-' + spec.type }, render(spec), badges(spec.badges));
  };
  SITE.infographicTypes = types; // add new types here from other files if needed
})();
