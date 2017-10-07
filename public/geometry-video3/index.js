const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory
const Geometry = gr.lib.fundamental.Geometry.Geometry
const n = 100

GeometryFactory.addType("points", {}, gl => {
  const geometry = new Geometry(gl)
  const positions = []
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < n; i++) {
      positions[3 * (i + n * j) + 0] = i - n / 2
      positions[3 * (i + n * j) + 1] = j - n / 2
      positions[3 * (i + n * j) + 2] = 0
    }
  }
  const texCoord = []
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < n; i++) {
      texCoord[2 * (i + n * j) + 0] = i / (n - 1)
      texCoord[2 * (i + n * j) + 1] = 1 - j / (n - 1)
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
  let indices = Array.from({
    length: n * n
  }, (v, k) => k);
  geometry.addIndex("default", indices, WebGLRenderingContext.POINTS)
  return geometry
})

gr.registerComponent("WebCamera", {
  attributes: {
    target: {
      converter: "String",
      default: "texture"
    }
  },
  $mount: function() {
    var _this = this;
    navigator.getUserMedia({
        video: true,
        audio: false
      },
      (localMediaStream) => {
        video = document.createElement('video');
        video.width = n;
        video.height = n;
        video.addEventListener('canplay', function() {
          video.removeEventListener('canplay', arguments.callee, true);
          video.play();
          _this.node.setAttribute(_this.getAttribute("target"), video);
        }, true);
        video.src = window.URL.createObjectURL(localMediaStream);
      },
      () => {}
    );
  }
});
gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("mesh").setAttribute("rotation", 0+','+phi+','+0);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})