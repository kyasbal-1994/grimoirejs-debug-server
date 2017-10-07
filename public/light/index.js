gr.debug = false;
gr(() => {
  const canvas = document.getElementsByClassName('gr-container')[0].childNodes[0];
  const mouse = {
    x: 0.5,
    y: 0.5
  }
  const onMouseMove = (e) => {
    mouse.x = e.viewportNormalizedX * canvas.width / Math.min(canvas.width, canvas.height);
    mouse.y = e.viewportNormalizedY * canvas.height / Math.min(canvas.width, canvas.height);
  }
  canvas.addEventListener('mousemove', onMouseMove);
  const update = () => {
    requestAnimationFrame(update);
    gr("#main")("render-quad").setAttribute("mouse", [mouse.x, mouse.y]);
  };
  update();
  const h1 = document.createElement('h1');
  h1.innerHTML = "What are you lookin' at?";
  document.body.appendChild(h1);
});