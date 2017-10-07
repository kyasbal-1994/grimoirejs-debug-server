gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("object").setAttribute("rotation", 0+','+0+','+phi);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})