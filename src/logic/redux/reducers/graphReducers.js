import { removeEdge, restoreEdge } from "../../graphLogic";

//JSON.parse(JSON.stringify())) to read proxy

export default {
  clear: (state) => {
    state.weightCheck = false;
    state.generationData.weighted = false;
    state.graphData.walls = [];
    state.graphData.vertices.forEach((v) => {
      state.graphData.edges[v] = state.graphData.data[v].neighbors;
      state.graphData.data[v].value = -1;
      if (
        state.graphData.data[v].type !== "start" &&
        state.graphData.data[v].type !== "end"
      )
        state.graphData.data[v].type = "";
    });
  },

  putNode: (state, action) => {
    let { type, id } = action.payload;
    let oldVal = state.graphData.data[id];
    state.graphData[type] = id;
    state.graphData.data[id] = { ...oldVal, type };
    if (type === "start") state.graphData["start"] = id;
    else if (type === "end") state.graphData["end"] = id;
  },

  selectNode: (state, action) => {
    if (state.graphData.running || state.generationData.running) return;
    let id = action.payload;
    if (state.selectedNode !== undefined) {
      state.graphData.data[state.selectedNode].type = state.graphData.data[state.selectedNode].type.replace("_s", "");
      state.selectedNode = undefined;
    }
    if (id === state.graphData.start) state.graphData.data[action.payload].type = "start_s";
    else state.graphData.data[action.payload].type = "end_s";
    state.selectedNode = id;
  },

  toggleWall: (state, action) => {
    if (state.graphData.running || state.generationData.running) return;
    let id = action.payload;
    let { type, neighbors } = state.graphData.data[id];

    if (type === "wall") {
      state.graphData.data[id].type = "";
      state.graphData = {
        ...state.graphData,
        walls: state.graphData.walls.filter((v) => v !== id),
        edges: {
          ...restoreEdge(
            state.graphData.edges,
            neighbors,
            state.graphData.walls,
            id
          ),
        },
      };
    } else if (!type.startsWith("start") && !type.startsWith("end") && state.selectedNode === undefined) {
      state.graphData.walls.push(id);
      state.graphData = {
        ...state.graphData,
        edges: { ...removeEdge(state.graphData.edges, id) },
      };
      state.graphData.data[id].type = "wall";
    }

    if (state.selectedNode !== undefined) {
      let type, oldId;
      if (state.selectedNode === state.graphData.start) {
        oldId = state.graphData.start;
        state.graphData.start = id;
        type = "start";
      } else {
        oldId = state.graphData.end;
        state.graphData.end = id;
        type = "end";
      }
      state.graphData.data[oldId] = { ...state.graphData.data[oldId], type: "", value: Math.floor(100 * Math.random()) };
      state.graphData.data[id] = { ...state.graphData.data[id], type, value: 0 };
      state.selectedNode = undefined;
    }
  },

  updateGraph: (state, action) => {
    let { vertices, edges, rows, columns } = action.payload;
    state.graphData.vertices = vertices;
    state.graphData.edges = edges;
    state.graphData.rows = rows;
    state.graphData.columns = columns;

    if (state.graphData.data === undefined) state.graphData.data = {};

    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined)
        state.graphData.data[v] = {
          type: "",
          neighbors: edges[v],
          value: -1,
        };
    });

    vertices.forEach((v) => {
      let cornerNeighbors = state.graphData.data[v].neighbors
        .reduce((res, n) => [...res, ...state.graphData.data[n].neighbors], [])
        .sort();

      cornerNeighbors = cornerNeighbors.reduce((res, n) => {
        res[n] = (res[n] || 0) + 1;
        return res;
      }, {});

      cornerNeighbors = Object.keys(cornerNeighbors).reduce((res, n) => {
        if (cornerNeighbors[n] === 2 && n !== v) res = [...res, n * 1];
        return res;
      }, []);
      let newData = { ...state.graphData.data[v], cornerNeighbors };
      state.graphData.data[v] = newData;
    });
  },
};
