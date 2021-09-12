import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getMazeGenerators } from "../../../logic/algorithmLoader";
import {
  clear,
  generate,
  generateMaze,
  reset,
  setAlgorithm,
  setAllWalls,
  setIntervalId,
  setWeighted,
} from "../../../logic/redux/graphSlice";
import "./GenerationSection.css";

const getGenerationAlgorithms = () => {
  let selectAlgorithms = [];
  let algorithms = getMazeGenerators();

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

const startGenerating = (dispatch, runningGenerator, speed) => {
  if (!runningGenerator) return;
  // console.log(speed);
  var intervalId = setInterval(() => {
    dispatch(generateMaze());
  }, speed);
  return intervalId;
};

const GenerationSection = (props) => {
  const dispatch = useDispatch();
  const isWeighted = useSelector((state) => state.graph.weightCheck);
  const currentGenerator = useSelector(
    (state) => state.graph.algorithms.generate
  );
  const runningGenerator = useSelector(
    (state) => state.graph.generationData.running
  );
  const runningSolution = useSelector((state) => state.graph.graphData.running);
  const speed = useSelector((state) => state.graph.speed);
  let intervalId = startGenerating(dispatch, runningGenerator, speed);
  dispatch(setIntervalId({ type: "generate", value: intervalId }));
  return (
    <div className="Generation">
      <Grid
        className="form-container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <FormControl variant="filled" className="select">
            <InputLabel htmlFor="generationAlgorithm">Algorithm</InputLabel>
            <Select
              disabled={runningGenerator || runningSolution}
              native
              value={currentGenerator}
              id="generationAlgorithm"
              onChange={(e) => {
                dispatch(
                  setAlgorithm({ type: "generate", algorithm: e.target.value })
                );
              }}
            >
              {getGenerationAlgorithms()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            disabled={runningGenerator || runningSolution}
            variant="contained"
            onClick={(e) => {
              // dispatch(generateMaze());
              dispatch(reset());
              dispatch(clear());
              dispatch(generate(isWeighted));
            }}
          >
            Generate
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={runningGenerator || runningSolution}
                checked={isWeighted}
                onChange={(e) =>
                  dispatch(setWeighted({ isWeighted: e.target.checked }))
                }
              />
            }
            label="Weighted"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default GenerationSection;
