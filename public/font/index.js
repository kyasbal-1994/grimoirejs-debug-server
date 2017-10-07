let fontData;
const request = new XMLHttpRequest();
request.onreadystatechange = () => {
  if (request.readyState === 4 && request.status === 200) {
    fontData = JSON.parse(request.response)
  }
}
request.open("GET", "./font.json", false);
request.send(null);


const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
GeometryFactory.addType("letter", {
  letters: {
    converter: "String",
    default: "hello world"
  },
  textAlign: {
    converter: "String",
    default: "center"
  },
  textBaseline: {
    converter: "String",
    default: "middle"
  },
  back: {
    converter: "Boolean",
    default: true
  }
}, (gl, attrs) => {
  const geometry = new Geometry(gl)
  const positions = []
  const texCoord = []
  const indices = []
  let offsetX = 0;
  const ls = attrs.letters.split(/\r\n|\r|\n|\\n/);
  const lsjoin = ls.join("");
  const letterMaxLength = ls.reduce((a, b) => a.length <= b.length ? b.length : a.length)
  switch (attrs.textAlign) {
    case "center":
      offsetX = letterMaxLength / 2
      break;
    case "right":
      offsetX = letterMaxLength
      break;
    case "left":
      offsetX = 0;
      break;
  }
  let offsetY = 0;
  switch (attrs.textBaseline) {
    case "middle":
      offsetY = ls.length / 2
      break;
    case "top":
      offsetY = 0;
      break;
    case "bottom":
      offsetY = ls.length
      break;
  }
  for (var j = 0; j < ls.length; j++) {
    for (var i = 0; i < ls[j].length; i++) {
      positions.push(0 + i - offsetX)
      positions.push(0 + offsetY - j)
      positions.push(0)

      positions.push(1 + i - offsetX)
      positions.push(0 + offsetY - j)
      positions.push(0)

      positions.push(1 + i - offsetX)
      positions.push(-1 + offsetY - j)
      positions.push(0)

      positions.push(0 + i - offsetX)
      positions.push(-1 + offsetY - j)
      positions.push(0)
    }
  }
  for (var i = 0; i < lsjoin.length; i++) {
    const p = fontData[lsjoin.charCodeAt(i)];
    texCoord.push(p.u)
    texCoord.push(1 - p.v - p.h)

    texCoord.push(p.u + p.w)
    texCoord.push(1 - p.v - p.h)

    texCoord.push(p.u + p.w)
    texCoord.push(1 - p.v)

    texCoord.push(p.u)
    texCoord.push(1 - p.v)
  }

  for (var i = 0; i < lsjoin.length; i++) {
    indices.push(0 + i * 4)
    indices.push(3 + i * 4)
    indices.push(2 + i * 4)

    indices.push(0 + i * 4)
    indices.push(2 + i * 4)
    indices.push(1 + i * 4)
  }


  if (attrs.back) {
    for (var i = 0; i < lsjoin.length; i++) {
      indices.push(0 + i * 4)
      indices.push(2 + i * 4)
      indices.push(3 + i * 4)

      indices.push(0 + i * 4)
      indices.push(1 + i * 4)
      indices.push(2 + i * 4)
    }

  }
  geometry.addAttributes(positions, {
    POSITION: {
      size: 3
    }
  })
  geometry.addAttributes(texCoord, {
    TEXCOORD: {
      size: 2
    }
  })
  geometry.addIndex("default", indices, WebGLRenderingContext.TRIANGLES)
  return geometry
})