gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("mesh").setAttribute("rotation", 0+','+phi+','+0);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})