const Prim = (graphData, generationData) => {
  let { start, end, vertices, walls } = graphData;
  let { firstRun, queue, running, extraParams, weighted } = generationData;
  let newWalls = [];
  let newPaths = [];
  if (firstRun) {
    vertices.forEach((v) => {
      if (v !== start && v !== end) {
        if (!weighted)
          graphData.data[v].value = Math.floor(Math.random() * 100);
        newWalls.push(v);
      }
    });
    generationData.firstRun = false;
    generationData.queue = [start];
  } else {
    if (queue.length === 0) {
      if (extraParams.leftOuts === undefined) {
        let leftOuts = walls.filter((n) =>
          graphData.data[n].neighbors.reduce(
            (res, n2) => res && walls.includes(n2),
            true
          )
        );
        leftOuts.sort(
          (a, b) => graphData.data[a].value - graphData.data[b].value
        );
        extraParams = { leftOuts };
      }

      let { leftOuts } = extraParams;
      if (leftOuts !== undefined && leftOuts.length !== 0) {
        let l = leftOuts.pop();
        queue.push(l);
        let tmp = graphData.data[l].neighbors.filter(
          (n) => walls.includes(n) && !queue.includes(n)
        );
        if (tmp.length > 0)
          queue.push(tmp[Math.floor(Math.random() * tmp.length)]);
        extraParams = { leftOuts };
      } else
        return { running: false, newWalls: [], newPaths: [], generationData };
    }

    let currentNode = queue.pop();
    let nodeNeighbors = graphData.data[currentNode].neighbors;

    nodeNeighbors = nodeNeighbors.filter(
      (neighbor) => !queue.includes(neighbor) && walls.includes(neighbor)
    );
    nodeNeighbors = nodeNeighbors.filter((neighbor) =>
      graphData.data[neighbor].neighbors.reduce((res, secondNeighbor) => {
        if (secondNeighbor === end) return true;
        if (secondNeighbor === currentNode) return res;
        if (queue.includes(secondNeighbor) || !walls.includes(secondNeighbor))
          return false;
        let cornerNeighbors = graphData.data[secondNeighbor].cornerNeighbors;
        let filteredCorners = cornerNeighbors.filter((n) => !walls.includes(n));
        if (filteredCorners.length > 1) return false;
        return res;
      }, true)
    );

    generationData.queue = [
      ...queue.filter((n) => n !== currentNode),
      ...nodeNeighbors,
    ];
    generationData.queue.sort(
      (a, b) => graphData.data[a].value - graphData.data[b].value
    );
    if (currentNode !== start && currentNode !== end) {
      newPaths = [...newPaths, currentNode];
    }
  }
  return {
    running,
    newPaths: newPaths,
    newWalls: newWalls,
    generationData,
    extraParams,
  };
};

export default Prim;
