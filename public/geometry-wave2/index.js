!(() => {
  const n = 100;
  const positions = []
  const colors = []

  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  let pBuffer
  let cBuffer

  GeometryFactory.addType("points", {}, (gl) => {
    const geometry = new Geometry(gl)
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions[3 * (i + n * j) + 0] = i - n / 2
        positions[3 * (i + n * j) + 1] = j - n / 2
        positions[3 * (i + n * j) + 2] = 0
        colors[3 * (i + n * j) + 0] = 0.2 + Math.sin(i)
        colors[3 * (i + n * j) + 1] = 0.2 + Math.cos(i)
        colors[3 * (i + n * j) + 2] = 0
      }
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addAttributes(colors, {
      COLOR: {
        size: 3
      }
    })
    let indices = []

    for (var i = 0; i < n * n; i++) {
      indices[i] = i
    }
    let copy = indices.concat()
    copy.pop()
    copy.shift()
    copy = copy.filter(function(element, index, array) {
      return (element % n !== n - 1 && element % n !== 0)
    })
    //horizontal
    indices = indices.concat(copy)
    geometry.addIndex("default", indices, WebGLRenderingContext.LINES, 0)
    pBuffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
    cBuffer = geometry.buffers[geometry.accessors["COLOR"].bufferIndex]
    return geometry
  })
  gr(() => {
    wave()
  })

  function wave() {
    const t = String(new Date().getTime()).substr(10) - 0
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions[3 * (i + n * j) + 0] = i - n / 2
        positions[3 * (i + n * j) + 1] = j - n / 2
        positions[3 * (i + n * j) + 2] = 10 * Math.ceil(i / 10 + Math.PI * t / 1000) * Math.sin(j / 10 + Math.PI * t / 1000)
        colors[3 * (i + n * j) + 0] = Math.abs(Math.sin(i / 10 + Math.PI * t / 1000) * Math.cos(j / 10 + Math.PI * t / 1000))
        colors[3 * (i + n * j) + 1] = Math.abs(Math.cos(i / 10 + Math.PI * t / 1000) * Math.sin(j / 10 + Math.PI * t / 1000))
        colors[3 * (i + n * j) + 2] = 1
      }
    }
    pBuffer.update(new Float32Array(positions))
    cBuffer.update(new Float32Array(colors))
    requestAnimationFrame(wave)
  }
})()