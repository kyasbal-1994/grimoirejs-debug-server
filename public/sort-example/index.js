const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 20

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  const PI_2 = Math.PI * 2
  //top
  let fi = positions.length
  const distance = (i, j) => Math.sqrt(0.75 + -(i + j) / (n - 1) + (j * j + i * i) / ((n - 1) * (n - 1)))
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (-0.5 + j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = 0.5 / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - i / (n - 1)) / d
    }
  }
  //back
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (-0.5 + j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = -0.5 / d
    }
  }
  //front
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (0.5 - j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = 0.5 / d
    }
  }
  //left
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = -0.5 / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - j / (n - 1)) / d
    }
  }
  //right
  fi = positions.length
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = 0.5 / d
      positions[fi + 3 * (n * i + j) + 1] = (0.5 - i / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 2] = (-0.5 + j / (n - 1)) / d
    }
  }

  //bottom
  fi = positions.length

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      const d = distance(i, j)
      positions[fi + 3 * (n * i + j) + 0] = (0.5 - j / (n - 1)) / d
      positions[fi + 3 * (n * i + j) + 1] = -0.5 / d
      positions[fi + 3 * (n * i + j) + 2] = (0.5 - i / (n - 1)) / d
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
  const texcoord = []
  for (var k = 0; k < 6; k++) {
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        texcoord.push(1 - j / (n - 1))
        texcoord.push(i / (n - 1))
      }
    }
  }
  geometry.addAttributes(texcoord, {
    TEXCOORD: {
      size: 2
    }
  })

  const indices = []
  let offset = 0
  for (var k = 0; k < 6; k++) {
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1; j++) {
        indices[offset + 6 * ((n - 1) * i + j) + 0] = n * n * k + n * i + j
        indices[offset + 6 * ((n - 1) * i + j) + 1] = n * n * k + n * (i + 1) + j + 1
        indices[offset + 6 * ((n - 1) * i + j) + 2] = n * n * k + n * (i + 1) + j
        indices[offset + 6 * ((n - 1) * i + j) + 3] = n * n * k + n * i + j
        indices[offset + 6 * ((n - 1) * i + j) + 4] = n * n * k + n * i + j + 1
        indices[offset + 6 * ((n - 1) * i + j) + 5] = n * n * k + n * (i + 1) + j + 1
      }
    }
    offset = indices.length
  }
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES)
  geometry.addIndex("points", Array.from({
    length: n * n * 6
  }, (v, k) => k), WebGLRenderingContext.POINTS)
  return geometry
})

gr(() => {
  var ratio = 0;
  function rot() {
    gr('#main')('#base').setAttribute('rotation', ratio + ',' + ratio + ',' + ratio);
    ratio += 1;
    requestAnimationFrame(rot);
  }
  rot();
})