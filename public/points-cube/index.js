const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 40

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  const PI_2 = Math.PI * 2
  //top
  let fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = 0.5
      positions[fi + 3 * (n * i + j) + 2] = 0.5 - i / (n - 1)
    }
  }
  //back
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 2] = -0.5
    }
  }

  //left
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 0] = -0.5
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 2] = -0.5 + (j + 1) / (n - 1)
    }
  }
  //front
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 0] = -0.5 + (j + 1) / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 2] = 0.5
    }
  }
  //right
  fi = positions.length
  for (var i = 1; i < n - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 0] = 0.5
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 1] = 0.5 - i / (n - 1)
      positions[fi + 3 * ((n - 1) * (i - 1) + j) + 2] = -0.5 + j / (n - 1)
    }
  }
  //bottom
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      positions[fi + 3 * (n * i + j) + 0] = -0.5 + j / (n - 1)
      positions[fi + 3 * (n * i + j) + 1] = -0.5
      positions[fi + 3 * (n * i + j) + 2] = 0.5 - i / (n - 1)
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
  let indices = []
  //top
  for (var i = 0; i < n - 1; i++) {
    for (var j = 0; j < n - 1; j++) {
      indices[6 * ((n - 1) * i + j) + 0] = n * i + j
      indices[6 * ((n - 1) * i + j) + 1] = n * (i + 1) + j + 1
      indices[6 * ((n - 1) * i + j) + 2] = n * (i + 1) + j
      indices[6 * ((n - 1) * i + j) + 3] = n * (i + 1) + j + 1
      indices[6 * ((n - 1) * i + j) + 4] = n * i + j
      indices[6 * ((n - 1) * i + j) + 5] = n * i + j + 1
    }
  }
  geometry.addIndex("points", Array.from({
    length: n * n * n - (n - 2) * (n - 2) * (n - 2)
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES)
  return geometry
})
gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("mesh").setAttribute("rotation", phi+','+phi+','+phi);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})