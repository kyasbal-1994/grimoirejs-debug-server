gr(() => {
  var ratio = 0;
  function rotate() {
    gr("#main")("mesh").setAttribute('rotation', '0,' + ratio + ',0');
    ratio += 0.1;
    requestAnimationFrame(rotate);
  }
  rotate();
})