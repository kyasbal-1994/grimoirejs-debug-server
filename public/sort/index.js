!(() => {
  const positions = new Float32Array(6)
  const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
  const Geometry = gr.lib.fundamental.Geometry.Geometry
  GeometryFactory.addType("axis", {}, (gl) => {
    const geometry = new Geometry(gl)
    positions[0] = 0
    positions[1] = 0
    positions[2] = 0
    positions[3] = 0
    positions[4] = 1
    positions[5] = 0
    const indices = new Uint16Array(2)
    indices[0] = 1
    indices[1] = 0
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addIndex("default", indices, WebGLRenderingContext.LINES)
    return geometry
  })
})()

gr(() => {
  const array = []
  const n = 300
  const scene = gr("#main")("scene")
  for (var i = 0; i < n; i++) {
    array.push(Math.random());
    scene.addChildByName("mesh", {
      color: [0, 1, array[array.length - 1], 1],
      position: [(i - n / 2) / (n / 10), -1, 0],
      geometry: "axis",
      scale: array[array.length - 1],
      id: "mesh" + (array.length - 1)
    })
  }
  bubbleSort(array)

})
if (!Array.prototype.swap) {
  Array.prototype.swap = function(a, b) {
    var tmp = this[a];
    this[a] = this[b];
    this[b] = tmp;
    return this;
  };
}

async function bubbleSort(array) {
  for (var i = 0; i < array.length - 1; i++) {
    for (var j = array.length - 1; j > i; j--) {
      if (array[j] < array[j - 1]) {
        array.swap(j, j - 1);
      }
    }
    await set(array)
  }
}

function set(array) {
  return new Promise(resolve => {
    array.forEach((v, i) => {
      gr("#main")("#mesh" + i).setAttribute("scale", v * array.length / 100);
      gr("#main")("#mesh" + i).setAttribute("color", [0, 1, v, 1]);
    })
    setTimeout(() => {
      resolve()
    }, 0)
  })
}