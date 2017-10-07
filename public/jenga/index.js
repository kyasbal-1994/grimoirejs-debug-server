gr(() => {
  const scene = gr("#main")("scene").first();
  for (var i = 0; i < 30; i++) {
    const stage = (Math.floor(i / 3) % 2);
    const x = stage == 0 ? (i % 3 - 1) * 0.4 : 0;
    const z = stage == 1 ? (i % 3 - 1) * 0.4 : 0;
    const node = scene.addChildByName("mesh", {
      geometry: "cube",
      scale: [0.2, 0.2, 0.6],
      position: [x, (Math.floor(i / 3)) * 0.4, z],
      rotation: '0,' + 90 * stage + ',0',
      albedo: "orange"
    });
    node.addComponent("RigidBody");
    node.on("mouseenter", function() {
      node.remove();
    });
  }

});