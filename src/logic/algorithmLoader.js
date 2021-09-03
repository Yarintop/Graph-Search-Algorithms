import { kruskal } from "./mazeGeneration/kruskal";
import BFS from './solvers/BFS';

const generators = {
  "kruskal": kruskal,
  "Prim": null,
};

const solvers = {
  BFS
}

const getMazeGenerators = () => {
  let generatorNames = [];
  for (let g in generators) generatorNames.push(g);
  return generatorNames;
}

const getSolvers = () => {
  let solverNames = [];
  for (let n in solvers) solverNames.push(n);
  return solverNames;
}

export { generators, getMazeGenerators, solvers, getSolvers}