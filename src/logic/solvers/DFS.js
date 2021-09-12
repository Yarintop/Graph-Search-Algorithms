const DFS = (graphData) => {
  let { queue, visited, parents, edges, start, end, running } = graphData;

  let currV = queue.shift();
  // console.log("s " + start);

  let neighbors = getNotVisitedNeighbors(currV, edges, visited, queue, start);

  while (neighbors.length === 0 && parents[currV] !== undefined) {
    currV = parents[currV];
    neighbors = getNotVisitedNeighbors(currV, edges, visited, queue, start);
  }

  if (neighbors.length === 0) {
    return { ...graphData, running: false };
  }

  let currNeighbor = neighbors[0];
  queue.push(currNeighbor);
  parents[currNeighbor] = currV;
  visited.push(currNeighbor);

  if (neighbors.includes(end)) {
    let endNode = neighbors[neighbors.indexOf(end)];
    parents[endNode] = currV;
    running = false;
  }
  return { edges, queue, visited, parents, running, end };
};

const getNotVisitedNeighbors = (currV, edges, visited, queue, start) => {
  let neighbors = edges[currV];
  neighbors = neighbors
    .filter((v) => !visited.includes(v) && !queue.includes(v) && v !== start)
    .sort((a, b) => a - b);
  return neighbors;
};
export default DFS;
