gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("object").setAttribute("rotation", phi+','+phi+','+phi);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})