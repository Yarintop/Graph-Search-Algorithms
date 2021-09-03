const DFS = (graphData, generationData) => {
  let { start, end, vertices, walls } = graphData;
  let { firstRun, queue, running } = generationData;

  let newWalls = [];
  let newPaths = [];

  if (firstRun) {
    vertices.forEach((v) => {
      if (v !== start && v !== end) {
        newWalls.push(v);
      }
    });
    generationData.firstRun = false;
  } else {
    let neighbors, wallNeighbors, currNode;
    do {
      if (queue.length === 0)
        return {
          running: false,
          newWalls: [],
          newPaths: [],
          generationData,
        };
      currNode = queue.shift();
      neighbors = graphData.data[currNode].neighbors;
      wallNeighbors = neighbors.filter((n) => walls.includes(n));
    } while (
      neighbors.length - wallNeighbors.length > 1 &&
      !neighbors.includes(end)
    );

    neighbors.sort((a, b) => 0.75 - Math.random());
    queue = [...neighbors, ...queue.filter((n) => !neighbors.includes(n))];
    if (currNode !== start && currNode !== end) {
      newPaths = [...newPaths, currNode];
    }
    generationData = { ...generationData, queue };
  }
  return { running, newPaths, newWalls, generationData };
};

export default DFS;
