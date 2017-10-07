gr(() => {
  let phi = 0
  const rotate = () => {
    gr("#main")("#spinner").setAttribute("rotation", '0,0,'+phi);
    phi+=50
    requestAnimationFrame(rotate);
  }
  rotate()
})