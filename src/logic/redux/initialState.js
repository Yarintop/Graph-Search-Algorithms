import { kruskal } from "../mazeGeneration/kruskal";
import { getMazeGenerators } from "../algorithmLoader";


export default {
    skip: false,
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
    },
    generationData: {
        running: false,
        queue: [],
        firstRun: true,
        generationAlgorithm: getMazeGenerators()[0],
    },
    algorithms: {
        solve: undefined,
        generate: getMazeGenerators()[0]
    },
    intervalId: {
        generate: undefined,
        solve: undefined,
    }
}