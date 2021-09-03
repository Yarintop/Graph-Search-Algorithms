const BFS = (graphData) => {
  let { queue, visited, parents, edges, end, running } = graphData;
  let tempQueue = [...queue];
  queue = [];
  while (tempQueue.length > 0) {
    let currV = tempQueue.shift();

    let neighbors = edges[currV];

    neighbors = neighbors
      .filter((v) => !visited.includes(v) && !queue.includes(v))
      .sort((a, b) => a - b);
    neighbors.forEach((v) => (parents[v] = currV));
    queue = [...neighbors, ...queue];
    visited.push(currV);
    if (neighbors.includes(end)) {
      let endNode = neighbors[neighbors.indexOf(end)];
      parents[endNode] = currV;
      running = false;
    }
  }
  return { edges, queue, visited, parents, running, end };
};
export default BFS;
