const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 100

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  for (var i = 0; i < n; i++) {
    positions[3 * i + 0] = i
    positions[3 * i + 1] = 0.1*i*i + 3*Math.sin(i)
    positions[3 * i + 2] = 0
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  let indices = Array.from({
    length: n
  }, (v, k) => k);
  geometry.addIndex("default", indices, WebGLRenderingContext.LINE_STRIP)
  return geometry
})

GeometryFactory.addType("axis", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  for (var i = 0; i < n; i++) {
    positions[6 * i + 0] = i
    positions[6 * i + 1] = 0
    positions[6 * i + 2] = 0
    positions[6 * i + 3] = i
    positions[6 * i + 4] = n
    positions[6 * i + 5] = 0
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  let indices = Array.from({
    length: 2 * n
  }, (v, k) => k);
  geometry.addIndex("default", indices, WebGLRenderingContext.LINES)
  return geometry
})

gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("#base").setAttribute("rotation", 0+','+phi+','+0);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})