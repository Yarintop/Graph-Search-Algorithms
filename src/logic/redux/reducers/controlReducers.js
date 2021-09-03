export default {
  reset: (state) => {
    if (!state.graphData.clean) {
      state.graphData.vertices.forEach((v) => {
        let { type } = state.graphData.data[v];
        if (type !== "start" && type !== "end" && type !== "wall")
          state.graphData.data[v] = {
            ...state.graphData.data[v],
            type: "",
          };
      });
    }
    clearInterval(state.intervalId.generate);
    clearInterval(state.intervalId.solve);
    state.intervalId = {
      generate: undefined,
      solve: undefined,
    };
    state.graphData = {
      ...state.graphData,
      clean: true,
      running: false,
      queue: [state.graphData.start],
    };
    state.generationData = {
      ...state.generationData,
      running: false,
      queue: [],
      firstRun: true,
    };
    state.paused = false;
  },
  setIntervalId: (state, action) => {
    let { type, value } = action.payload;
    state.intervalId[type] = value;
  },
  generate: (state) => {
    state.graphData.clean = false;
    state.generationData = {
      ...state.generationData,
      running: true,
      firstRun: true,
      queue: [state.graphData.start],
    };
  },
};