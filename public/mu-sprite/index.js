!(() => {
  const n = 10;
  const positions = []
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var k = 0; k < n; k++) {
      for (var j = 0; j < n; j++) {
        for (var i = 0; i < n; i++) {
          positions[3 * (i + n * j + n * n * k) + 0] = i / n - 0.5
          positions[3 * (i + n * j + n * n * k) + 1] = j / n - 0.5
          positions[3 * (i + n * j + n * n * k) + 2] = k / n - 0.5
        }
      }
    }

    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addIndex("default", Array.from({
      length: positions.length / 3
    }, (v, k) => k), WebGLRenderingContext.POINTS)
    return geometry
  });
})()