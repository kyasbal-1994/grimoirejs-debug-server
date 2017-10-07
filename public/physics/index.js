gr.debug = false;
const Quaternion = gr.lib.math.Quaternion;
gr(function() {
  const scene = gr("#main")("scene").single();
  setInterval(function() {
    const n = scene.addChildByName("rigid-sphere", {
      position: [Math.random() * 2 - 1, 6, 0],
      targetBuffer: "wireframe"
    });
    n.on("mouseenter", function() {
      n.setAttribute("color", "blue");
    });
  }, 1000);
});
gr.register(() => {
  gr.registerComponent("PhysicsScene", {
    $awake: function() {
      this.world = new OIMO.World();
    },
    $update: function() {
      this.world.step();
    }
  });
  gr.overrideDeclaration("scene", ["PhysicsScene"]);
  gr.registerComponent("Rigid", {
    attributes: {
      shape: {
        default: "sphere",
        converter: "String"
      },
      move: {
        converter: "Boolean",
        default: true
      }
    },
    $mount: function() {
      this.__bindAttributes();
      this.transform = this.node.getComponent("Transform");
      const oimoScene = this.node.getComponentInAncestor("PhysicsScene");
      this.body = oimoScene.world.add({
        type: this.shape,
        size: [this.transform.scale.X, this.transform.scale.Y, this.transform.scale.Z],
        pos: [this.transform.position.X, this.transform.position.Y, this.transform.position.Z],
        rot: [this.transform.rotation.X, this.transform.rotation.Y, this.transform.rotation.Z],
        move: this.move,
        density: 1
      });
    },
    $update: function() {
      const p = this.body.getPosition();
      this.transform.setAttribute("position", [p.x, p.y, p.z]);
      const r = this.body.getQuaternion();
      this.transform.setAttribute("rotation", new Quaternion([r.x, r.y, r.z, r.w]));
    }
  });
  gr.registerNode("rigid-sphere", ["Rigid"], {
    color: "green",
    geometry: "sphere"
  }, "mesh");
});