export default {
  pause: (state) => {
    state.paused = true;
  },
  unpause: (state) => {
    state.paused = false;
  },
  skipToggle: (state) => {
    state.skip = !state.skip;
  },
  setSpeed: (state, action) => {
    let { speed } = action.payload;
    state.speed = speed;
  },
  reset: (state) => {
    if (!state.graphData.clean) {
      state.graphData.vertices.forEach((v) => {
        let { type } = state.graphData.data[v];
        if (!state.generationData.weighted) state.graphData.data[v].value = 0;
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
      extraParams: {},
    };
    state.paused = false;
  },
  setWeighted: (state, action) => {
    let { isWeighted } = action.payload;
    state.weightCheck = isWeighted;
    state.generationData.weighted = isWeighted;
  },
  setIntervalId: (state, action) => {
    let { type, value } = action.payload;
    clearInterval(state.intervalId[type]);
    state.intervalId[type] = value;
  },
  generate: (state, action) => {
    state.generationData.weighted = action.payload;
    state.weightCheck = action.payload
    state.graphData.clean = false;
    state.generationData = {
      ...state.generationData,
      running: true,
      firstRun: true,
      queue: [state.graphData.start],
      extraParams: {},
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
      extraParams: {},
    };
  },
};
