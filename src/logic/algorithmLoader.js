import { kruskal } from "./mazeGeneration/kruskal";
import BFS from './solvers/BFS';
import DFS from './solvers/DFS';
import DFSGenerator from './mazeGeneration/DFS';
import random from "./mazeGeneration/random";
import Prim from "./mazeGeneration/Prim";
import Dijkstra from "./solvers/Dijkstra";

const generators = {
  "kruskal": kruskal,
  "Prim": Prim,
  "DFS": DFSGenerator,
  "random": random,
};

const solvers = {
  BFS,
  DFS,
  Dijkstra,
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