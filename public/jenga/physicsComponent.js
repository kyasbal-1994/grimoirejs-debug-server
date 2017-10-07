const Quaternion = gr.lib.math.Quaternion;
const Vector3 = gr.lib.math.Vector3;
gr.register(() => {
  gr.registerComponent("OimoScene", {
    attributes: {},
    $awake: function() {
      this.world = new OIMO.World();
    },
    $update: function() {
      this.world.step();
    }
  });
  gr.overrideDeclaration("scene", ["OimoScene"]);
  gr.registerComponent("RigidBody", {
    attributes: {
      shape: {
        default: "box",
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
      const oimoScene = this.node.getComponentInAncestor("OimoScene");
      const eularRotation = Vector3.multiply(180 / Math.PI, this.transform.rotation.eularAngles);
      this.body = oimoScene.world.add({
        type: this.shape,
        size: [this.transform.scale.X * 2, this.transform.scale.Y * 2, this.transform.scale.Z * 2],
        pos: [this.transform.position.X, this.transform.position.Y, this.transform.position.Z],
        rot: [eularRotation.X, eularRotation.Y, eularRotation.Z],
        move: this.move,
        density: 1
      });
    },
    $update: function() {
      const p = this.body.getPosition();
      this.transform.setAttribute("position", [p.x, p.y, p.z]);
      const r = this.body.getQuaternion();
      this.transform.setAttribute("rotation", [r.x, r.y, r.z, r.w]);
    },
    $unmount: function() {
      this.body.remove();
    }
  });
});