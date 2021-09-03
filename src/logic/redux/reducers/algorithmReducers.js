import { removeEdge, restoreEdge } from "../../graphLogic";
import { generators, solvers } from "../../algorithmLoader";
import { setAllWalls } from "../graphSlice";

export default {
  generateMaze: (state) => {
    if (!state.generationData.running) return;
    do {
      let f = generators[state.algorithms.generate];
      let { newWalls, newPaths, running, generationData } = f(
        state.graphData,
        state.generationData
      );

      state.graphData = {
        ...state.graphData,
        walls: [
          ...state.graphData.walls.filter((wall) => !newPaths.includes(wall)),
          ...newWalls,
        ],
      };

      newWalls.forEach((w) => {
        state.graphData.data[w].type = "wall";
        state.graphData.edges = { ...removeEdge(state.graphData.edges, w) };
      });

      newPaths.forEach((p) => {
        state.graphData.data[p].type = "";
        state.graphData.edges = {
          ...restoreEdge(
            state.graphData.edges,
            state.graphData.data[p].neighbors,
            state.graphData.walls,
            p
          ),
        };
      });

      state.generationData = { ...generationData, running };
    } while (state.skip && state.generationData.running);
  },

  solveStep: (state) => {
    do {
      if (state.graphData.queue.length === 0) state.graphData.running = false;
      if (state.graphData.drawPath) {
        if (state.graphData.queue.length > 0) {
          let pathCell = state.graphData.queue.pop();
          if (state.graphData.data[pathCell].type === "visited")
            state.graphData.data[pathCell].type = "path";
        } else return;
        if (state.skip) continue;
        return;
      }
      let f = solvers[state.algorithms.solve];
      let newGraphData = f(state.graphData);

      if (!newGraphData.running)
        newGraphData = { ...newGraphData, running: true, drawPath: true };
      state.graphData = { ...state.graphData, ...newGraphData };

      if (newGraphData.drawPath) {
        state.graphData.queue = [];
        if (
          state.graphData.end !== -1 &&
          state.graphData.parents[state.graphData.end] !== undefined
        ) {
          let current = state.graphData.end;
          while (state.graphData.parents[current] !== undefined) {
            state.graphData.queue = [...state.graphData.queue, current];
            current = state.graphData.parents[current];
          }
        }
      }

      state.graphData.visited.forEach((v) => {
        if (state.graphData.data[v].type === "")
          state.graphData.data[v].type = "visited";
      });
    } while (
      state.skip &&
      (state.graphData.running || state.graphData.drawPath)
    );
  },

  setAlgorithm: (state, action) => {
    let { algorithm, type } = action.payload;
    state.algorithms[type] = algorithm;
  },
};
