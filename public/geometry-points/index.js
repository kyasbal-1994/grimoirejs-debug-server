!(() => {
  const n = 100;
  const positions = new Float32Array(3 * n * n)
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
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
    console.log(positions, indices)
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
    return geometry
  });
})()