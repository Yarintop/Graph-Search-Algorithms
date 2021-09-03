const Dijkstra = (graphState) => {
  let { edges, queue, visited, parents, running, end, extraParams, data } =
    graphState;
  if (queue.length === 0) return graphState;
  let currentNode = queue.shift();

  if (currentNode === end) return { ...graphState, running: false };
  visited.push(currentNode);
  let nodeNeighbors = edges[currentNode];
  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    let baseValue = extraParams[currentNode] | data[currentNode].value;
    let addedValue = data[node].value;
    if (
      extraParams[node] === undefined ||
      extraParams[node] > baseValue + addedValue
    ) {
      parents[node] = currentNode;
      extraParams[node] = baseValue + addedValue;
    }
  });

  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    if (!queue.includes(node)) queue.push(node);
  });
  queue.sort((a, b) => extraParams[a] - extraParams[b]);
  return { edges, queue, visited, parents, running, end };
};

export default Dijkstra;
