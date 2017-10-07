const GeometryFactory = gr.lib.fundamental.Geometry.GeometryFactory;
const Geometry = gr.lib.fundamental.Geometry.Geometry;
GeometryFactory.addType("points-cloud", {}, (gl) => {
  const geometry = new Geometry(gl);
  geometry.addAttributes([-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0], {
    POSITION: {
      size: 3
    }
  });
  const n = 100;
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(Math.random() * 10 - 5);
    array.push(Math.random() * 10 - 5);
    array.push(Math.random() * 10 - 5);
  }
  geometry.addAttributes(array, {
    POSITION_BASE: {
      size: 3,
      instancingDivisor: 4
    }
  });
  geometry.addIndex("default", n * 4, [0, 2, 1, 3, 2, 0]);
  return geometry;
});