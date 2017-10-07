let imgArray;
document.addEventListener("DOMContentLoaded", () => {
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
  navigator.getUserMedia({
      video: true,
      audio: false
    },
    (localMediaStream) => {
      var url = (window.URL || window.webkitURL);
      video = document.createElement('video');
      video.width = 100;
      video.height = 100;
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      document.body.appendChild(video);
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d')
      setInterval(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        imgArray = ctx.getImageData(0, 0, canvas.width, canvas.height);
        console.log(2)
      }, 1000);
      video.addEventListener('canplay', function() {
        video.removeEventListener('canplay', arguments.callee, true);
        video.play();
      }, true);
      video.src = url.createObjectURL(localMediaStream);
    },
    () => {}
  );
});

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
        colors[4 * (i + n * j) + 0] = 1
        colors[4 * (i + n * j) + 1] = 0
        colors[4 * (i + n * j) + 2] = 0
        colors[4 * (i + n * j) + 3] = 1
      }
    }
    geometry.addAttributes(positions, {
      POSITION: {
        size: 3
      }
    })
    geometry.addAttributes(colors, {
      COLOR: {
        size: 4
      }
    })
    let indices = []

    for (var i = 0; i < n * n; i++) {
      indices[i] = i
    }
    geometry.addIndex("default", indices, WebGLRenderingContext.POINTS, 0)
    pBuffer = geometry.buffers[geometry.accessors["POSITION"].bufferIndex]
    cBuffer = geometry.buffers[geometry.accessors["COLOR"].bufferIndex]
    return geometry
  })
  gr(() => {
    setTimeout(() => {
      setInterval(() => {
        for (var j = 0; j < n; j++) {
          for (var i = 0; i < n; i++) {
            colors[4 * (i + n * j) + 0] = imgArray.data[4 * (i + n * j) + 0] / 255;
            colors[4 * (i + n * j) + 1] = imgArray.data[4 * (i + n * j) + 1] / 255;
            colors[4 * (i + n * j) + 2] = imgArray.data[4 * (i + n * j) + 2] / 255;
            colors[4 * (i + n * j) + 3] = imgArray.data[4 * (i + n * j) + 3] / 255;
          }
        }
      }, 0)
    }, 1200)

    wave()
  })

  function wave(array) {
    const t = String(new Date().getTime()).substr(10) - 0
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < n; i++) {
        positions[3 * (i + n * j) + 0] = i - n / 2
        positions[3 * (i + n * j) + 1] = j - n / 2
        positions[3 * (i + n * j) + 2] = 10 * Math.sin(i / 10 + Math.PI * t / 1000) * Math.cos(j / 10 + Math.PI * t / 1000)
      }
    }
    pBuffer.update(new Float32Array(positions))
    cBuffer.update(new Float32Array(colors))
    requestAnimationFrame(wave)
  }
})()

gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("mesh").setAttribute("rotation", 180 + ',' + phi + ',' + 0);
    phi += 1
    requestAnimationFrame(rotate);
  }
  rotate()
})