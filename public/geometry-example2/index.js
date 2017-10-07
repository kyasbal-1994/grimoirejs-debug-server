!(() => {
  const n = 2000;
  const positions = [];
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var i = 0; i < n; i++) {
      positions[3 * i + 0] = 0.2 * (i - n / 2)
      positions[3 * i + 1] = Math.tan(0.2 * i)
      positions[3 * i + 2] = 0
    }

    const indices = []
    for (var i = 0; i < n; i++) {
      indices[i] = i
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addIndex("default", indices, WebGLRenderingContext.LINE_STRIP, 0)
    return geometry
  });
})()
gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("mesh").setAttribute("rotation", 0+','+phi+','+0);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})