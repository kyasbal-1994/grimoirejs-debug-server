!(() => {
  const n = 100;
  let color = [];
  let color2 = Array.from({
    length: n * n * 4
  }, v => 0);
  const positions = []
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions.push(i - n / 2)
        positions.push(j - n / 2)
        positions.push(0)
      }
    }
    for (var i = 0; i < n * n * 4; i++) {
      color.push(0)
      color.push(0)
      color.push(0)
      color.push(Math.round(Math.random()))
    }
    const indices = Array.from({
      length: n * n
    }, (v, k) => k);
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    });
    geometry.addAttributes(color, {
      COLOR: {
        size: 4
      }
    })
    cBuffer = geometry.buffers[geometry.accessors["COLOR"].bufferIndex]
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
    return geometry
  });
  gr(() => {
    let phi = 0
    setInterval(() => {
      wave();
      gr("#main")("mesh").setAttribute('rotation', [0, phi, 0]);
      phi+=0.1;
    }, 100)
  })
  const wave = () => {
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        var v = roundState(
          color[4 * (i + n * (j - 1)) + 3],
          color[4 * ((i + 1) + n * (j - 1)) + 3],
          color[4 * ((i + 1) + n * j) + 3],
          color[4 * ((i + 1) + n * (j + 1)) + 3],
          color[4 * (i + n * (j + 1)) + 3],
          color[4 * ((i - 1) + n * (j + 1)) + 3],
          color[4 * ((i - 1) + n * j) + 3],
          color[4 * ((i - 1) + n * (j - 1)) + 3],
          color[4 * (i + n * j) + 3]
        );

        var c = roundStateColor(
          color[4 * (i + n * (j - 1)) + 3],
          color[4 * ((i + 1) + n * (j - 1)) + 3],
          color[4 * ((i + 1) + n * j) + 3],
          color[4 * ((i + 1) + n * (j + 1)) + 3],
          color[4 * (i + n * (j + 1)) + 3],
          color[4 * ((i - 1) + n * (j + 1)) + 3],
          color[4 * ((i - 1) + n * j) + 3],
          color[4 * ((i - 1) + n * (j - 1)) + 3],
          color[4 * (i + n * j) + 3]
        );

        color2[4 * (i + n * j) + 0] = c[0]
        color2[4 * (i + n * j) + 1] = c[1]
        color2[4 * (i + n * j) + 2] = c[2]
        color2[4 * (i + n * j) + 3] = v;
      }
    }

    function roundState(t, tr, r, br, b, bl, l, tl, self) {

      const p = t + tr + r + br + b + bl + l + tl;
      if (p === NaN) return 0;
      if (p === 2) return self;
      return 2 < p && p < 4 ? 1 : 0;
    }

    function roundStateColor(t, tr, r, br, b, bl, l, tl, self) {
      const p = t + tr + r + br + b + bl + l + tl;
      switch (p) {
        case 2:
          return [1, 0, 0]
        case 3:
          return [0, 1, 0]
        default:
          return [0, 0, 0]
      }
    }
    let temp;
    temp = color;
    color = color2;
    color2 = temp;
    cBuffer.update(new Float32Array(color))
  }
})();