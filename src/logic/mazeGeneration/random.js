const PATH_PROBABILITY = 0.6; //will change the denseness of the maze

const random = (graphData, generationData) => {
  let { start, end, vertices } = graphData;
  let newWalls = [],
    newPaths = [];
  vertices.forEach((v) => {
    if (v !== start && v !== end && Math.random() > PATH_PROBABILITY)
      newWalls.push(v);
  });
  return {
    running: false,
    newWalls: newWalls,
    newPaths: newPaths,
    generationData,
  };
}

export default random;