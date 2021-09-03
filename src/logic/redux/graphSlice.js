import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import controlReducers from "./reducers/controlReducers";
import generationReducers from "./reducers/generationReducers";
import graphReducers from "./reducers/graphReducers";

export const graphSlice = createSlice({
    name: "graph",
    initialState: initialState,
    reducers: {...graphReducers, ...generationReducers, ...controlReducers},
});

export const {
    toggleWall,
    updateGraph,
    putNode,
    removeEdge,
    restoreEdge,
    setAllWalls,
    generateMaze,
    clear,
    setAlgorithm,
    setIntervalId,
    reset,
    generate,
} = graphSlice.actions;

export default graphSlice.reducer;