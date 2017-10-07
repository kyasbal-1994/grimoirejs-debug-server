!(() => {
  const n = 100;
  const positions = []
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  let bufferPositions;
  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions[3 * (i + n * j) + 0] = i - n / 2
        positions[3 * (i + n * j) + 1] = j - n / 2
        positions[3 * (i + n * j) + 2] = 0
      }
    }

    const indices = new Uint16Array(n * n)
    for (var i = 0; i < indices.length; i++) {
      indices[i] = i
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
    bufferPositions = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
    return geometry
  });
  gr(() => {
    wave()
  })

  function wave() {
    const t = new Date().getTime() / 1000
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions[3 * (i + n * j) + 0] = i - n / 2
        positions[3 * (i + n * j) + 1] = j - n / 2
        positions[3 * (i + n * j) + 2] = 7 * Math.sin(i / 10 + t) * Math.cos(j / 10 + t)
      }
    }
    bufferPositions.update(new Float32Array(positions))
    requestAnimationFrame(wave)
  }
})()