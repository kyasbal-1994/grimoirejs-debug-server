!(() => {
  const n = 100;
  const positions = [];
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


    const indices = []
    const color = []
    for (var i = 0; i < n * n; i++) {
      indices[i] = i
      color[i] = 0.2 + Math.sin(i)
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addAttributes(color, {
      COLOR: {
        size: 1
      }
    })
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
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