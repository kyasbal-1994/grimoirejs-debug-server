gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("#spinner").setAttribute("rotation", phi+','+phi+','+phi);
    phi+=1
    requestAnimationFrame(rotate);
  }
  rotate()
})