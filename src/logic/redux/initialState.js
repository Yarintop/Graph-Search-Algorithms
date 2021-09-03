import { kruskal } from "../mazeGeneration/kruskal";
import { getMazeGenerators, getSolvers } from "../algorithmLoader";


export default {
    skip: false,
    paused: false,
    graphData: {
        clean: true,
        running: false,
        width: 0,
        height: 0,
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
        running: false,
        firstRun: true,
        queue: [],
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