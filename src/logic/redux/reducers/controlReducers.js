export default {
  reset: (state) => {
    // if (!state.graphData.clean) {
      state.graphData.vertices.forEach((v) => {
        let { type } = state.graphData.data[v];
        if (type !== "start" && type !== "end" && type !== "wall")
          state.graphData.data[v] = {
            ...state.graphData.data[v],
            type: "",
          };
      });
    // }
    clearInterval(state.intervalId.generate);
    clearInterval(state.intervalId.solve);
    state.intervalId = {
      generate: undefined,
      solve: undefined,
    };
    state.graphData.visited.forEach((v) => {
      if (v !== state.graphData.start && v !== state.graphData.end) {
        state.graphData.data[v].type = "";
      }
    });
    state.graphData = {
      ...state.graphData,
      clean: true,
      running: false,
      drawPath: false,
      parents: {},
      visited: [],
      queue: [state.graphData.start],
    };
    state.generationData = {
      ...state.generationData,
      running: false,
      firstRun: true,
      queue: [],
    };
    state.paused = false;
  },
  setIntervalId: (state, action) => {
    let { type, value } = action.payload;
    clearInterval(state.intervalId[type]);
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

  solve: (state) => {
    console.log(JSON.parse(JSON.stringify(state)));
    state.generationData.running = false;
    state.graphData = {
      ...state.graphData,
      running: true,
      clear: false,
      queue: [state.graphData.start],
    };
  },
};
