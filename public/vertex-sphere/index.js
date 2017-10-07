const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 100

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  const texCoord = []
  const PI_2 = Math.PI * 2
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions[3 * (n * i + j) + 0] = -Math.sin(Math.PI * i / (n - 1)) * Math.cos(PI_2 * j / (n - 1))
      positions[3 * (n * i + j) + 1] = Math.cos(Math.PI * i / (n - 1))
      positions[3 * (n * i + j) + 2] = Math.sin(Math.PI * i / (n - 1)) * Math.sin(PI_2 * j / (n - 1))
      texCoord[2 * (n * i + j) + 0] = j / (n - 1)
      texCoord[2 * (n * i + j) + 1] = i / (n - 1)
    }
  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addAttributes(positions, {
    NORMAL: {
      size: 3
    }
  })
  geometry.addAttributes(texCoord, {
    TEXCOORD: {
      size: 2
    }
  })
  let indices = []
  for (var j = 0; j < n - 1; j++) {
    for (var i = 0; i < n - 1; i++) {
      indices.push(n * j + i)
      indices.push(n * (j + 1) + i)
      indices.push(n * j + i + 1)
      indices.push(n * j + i + 1)
      indices.push(n * (j + 1) + i)
      indices.push(n * (j + 1) + i + 1)
    }
  }
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES)
  geometry.addIndex("points", Array.from({length:n*n},(v,k)=>k), WebGLRenderingContext.POINTS)
  return geometry
})