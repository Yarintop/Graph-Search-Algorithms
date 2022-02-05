const idToPoint = (id, columns) => {
  let x = Math.floor(id / columns);
  let y = id % (columns);
  return [x, y];
};

const h = (node, end, columns) => {
  let nPoint = idToPoint(node, columns);
  let ePoint = idToPoint(end, columns);
  let res = Math.sqrt(
    Math.pow(nPoint[0] - ePoint[0], 2) + Math.pow(nPoint[1] - ePoint[1], 2)
  );
  return res;
};

const aStar = (graphState) => {
  let {
    edges,
    queue,
    visited,
    parents,
    running,
    end,
    extraParams,
    data,
    columns,
  } = graphState;
  if (queue.length === 0) return graphState;
  let currentNode = queue.shift();
  if (extraParams["gScore"] === undefined) extraParams["gScore"] = {};
  if (extraParams["fScore"] === undefined) extraParams["fScore"] = {};

  if (currentNode === end) return { ...graphState, running: false };
  visited.push(currentNode);
  let nodeNeighbors = edges[currentNode];
  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    let baseValue =
      extraParams["gScore"][currentNode] | data[currentNode].value;
    let addedValue = data[node].value;
    if (
      extraParams["fScore"][node] === undefined ||
      extraParams["fScore"][node] > baseValue + addedValue
    ) {
      parents[node] = currentNode;
      extraParams["gScore"][node] = baseValue + addedValue;
      extraParams["fScore"][node] =
        extraParams["gScore"][node] + h(node, end, columns);
    }
  });

  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    if (!queue.includes(node)) queue.push(node);
  });
  queue.sort((a, b) => extraParams["fScore"][a] - extraParams["fScore"][b]);
  return { edges, queue, visited, parents, running, end };
};

export default aStar;
