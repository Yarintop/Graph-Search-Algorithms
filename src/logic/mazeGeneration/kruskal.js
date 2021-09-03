import { putNode, setAllWalls } from "../redux/graphSlice";

const kruskal = (graphData, generationData) => {
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
    if (queue.length > 0) {
      let currWall = queue.shift();
      let currFarPaths = getFarNodes(graphData, queue, currWall);
      if (currWall !== graphData.start && currWall !== graphData.end) {
        newPaths.push(currWall);
      }
      if (currFarPaths.length > 0) {
        let currPathId = currFarPaths.shift();
        createPath(graphData.columns, currWall, currPathId, newPaths);
      }
    } else {
      running = false;
      generationData.firstRun = true;
    }
  }
  newPaths = newPaths.filter(
    (n) => n !== graphData.start && n !== graphData.end
  );
  return { newWalls, newPaths, running, generationData };
};

const pushInRandom = (arr, value) => {
  let index = Math.floor(Math.random() * arr.length);
  arr.splice(index, 0, value);
};

const getFarNodes = (graphData, queue, id) => {
  let [x, y] = getPointById(id, graphData.columns);
  let points = [];
  let farWalls = [];
  let farPaths = [];
  points.push([x - 2, y], [x, y - 2], [x + 2, y], [x, y + 2]);
  points = points.filter(
    (v) =>
      v[0] >= 0 &&
      v[1] >= 0 &&
      v[0] < graphData.rows &&
      v[1] < graphData.columns
  );

  let ids = [];
  points.map((v) => ids.push(getIdByPoint(v[0], v[1], graphData.columns)));

  ids.map((i) => {
      if (graphData.data[i].type === "wall" || graphData.data[i].type === "end") {
        farWalls.push(i);
      } else {
        farPaths.push(i);
      }
  });


  farWalls
    .filter((fw) => !queue.includes(fw))
    .map((w) => {
      pushInRandom(queue, w);
    });

  return farPaths;
};

const createPath = (columns, baseId, neighborId, newPaths) => {
  let [basePointX, basePointY] = getPointById(baseId, columns);
  let [neighborX, neighborY] = getPointById(neighborId, columns);

  let betweenX = (basePointX + neighborX) / 2;
  let betweenY = (basePointY + neighborY) / 2;

  let betweenId = getIdByPoint(betweenX, betweenY, columns);

  newPaths.push(betweenId);
  newPaths.push(neighborId);
};

const getPointById = (id, columns) => {
  let x = Math.floor(id / columns);
  let y = id % columns;
  return [x, y];
};

const getIdByPoint = (x, y, columns) => {
  return x * columns + y;
};

export { kruskal };
