import { removeEdge, restoreEdge } from "../../graphLogic";
import { generators } from "../../algorithmLoader";
import { setAllWalls } from "../graphSlice";

export default {
  generateMaze: (state) => {
    if (!state.generationData.running) return;
    do {
      let f = generators[state.generationData.generationAlgorithm];
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
  setAlgorithm: (state, action) => {
    let { algorithm } = action.payload;
    state.generationData.generationAlgorithm = algorithm;
  },
};
