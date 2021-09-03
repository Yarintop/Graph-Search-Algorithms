
function generateGraph(rows, columns) {
  let vertices = [];
  let edges = {};
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let id = r * columns + c;
      vertices.push(id);
      if (edges[id] === undefined) edges[id] = [];
      if (id - 1 >= 0 && id % columns !== 0) {
        edges[id].push(id - 1);
        edges[id - 1].push(id);
      }
      if (id - columns >= 0) {
        edges[id].push(id - columns);
        edges[id - columns].push(id);
      }
    }
  }
  return { vertices, edges, rows, columns};
}

const removeEdge = (e, node) => {
  let edges = { ...e };
  let neighbors = edges[node];
  neighbors.forEach((n) => {
    edges[n] = edges[n].filter((v) => v !== node);
  });
  edges[node] = [];
  return edges;
}

const restoreEdge = (e, neighbors, walls, node) => {
  let edges = { ...e };
  neighbors.forEach((n) => {
    if (!walls.includes(n)) edges[n] = [...edges[n], node];
    edges[node] = [...neighbors.filter((n) => !walls.includes(n))];
  })
  return edges;
}

export { generateGraph, removeEdge, restoreEdge};