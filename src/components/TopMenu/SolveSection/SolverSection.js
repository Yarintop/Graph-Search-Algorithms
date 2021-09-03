import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSolvers } from "../../../logic/algorithmLoader";
import {
  reset,
  setAlgorithm,
  setIntervalId,
  solve,
  solveStep,
} from "../../../logic/redux/graphSlice";
import "./SolverSection.css";

const getSolveAlgorithms = () => {
  let selectAlgorithms = [];
  let algorithms = getSolvers();

  algorithms.forEach((a) => {
    selectAlgorithms.push(
      <option value={a} key={a}>
        {a}
      </option>
    );
  });
  selectAlgorithms = [, selectAlgorithms];
  return selectAlgorithms;
};

const startSolving = (dispatch, runningSolution, oldTimer) => {
  if (!runningSolution) return;
  var temp = 0;
  const intervalId = setInterval(() => {
    dispatch(solveStep());
  }, 1);
  return intervalId;
};

const SolveSection = (props) => {
  const dispatch = useDispatch();
  const currentSolver = useSelector((state) => state.graph.algorithms.solve);
  const runningSolution = useSelector((state) => state.graph.graphData.running);
  const oldTimer = useSelector(
    (state) => state.graph.intervalId.solve,
    () => true
  );
  let intervalId = startSolving(dispatch, runningSolution, oldTimer);
  dispatch(setIntervalId({ type: "solve", value: intervalId }));
  return (
    <div className="Solution">
      <Grid
        className="form-container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4}>
          <FormControl variant="filled" className="select">
            <InputLabel htmlFor="generationAlgorithm">Algorithm</InputLabel>
            <Select
              native
              value={currentSolver}
              id="generationAlgorithm"
              onChange={(e) => {
                dispatch(setAlgorithm({ algorithm: e.target.value }));
              }}
            >
              {getSolveAlgorithms()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(reset());
              dispatch(solve());
            }}
          >
            Solve
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(reset());
            }}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SolveSection;
