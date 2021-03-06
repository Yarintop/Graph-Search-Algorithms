import { kruskal } from "../mazeGeneration/kruskal";
import { getMazeGenerators, getSolvers } from "../algorithmLoader";


export default {
    selectedNode: undefined,
    skip: false,
    paused: false,
    weightCheck: false,
    speed: 60,
    graphData: {
        clean: true,
        running: false,
        rows: 0,
        columns: 0,
        vertices: [],
        edges: {},
        data: {},
        walls: [],
        start: -1,
        end: -1,
        parents: {},
        visited: [],
        queue: [],
        drawPath: false,
    },
    generationData: {
        weighted: false,
        running: false,
        firstRun: true,
        queue: [],
        extraParams: {}
    },
    algorithms: {
        generate: getMazeGenerators()[0],
        solve: getSolvers()[0],
    },
    intervalId: {
        generate: undefined,
        solve: undefined,
    }
}