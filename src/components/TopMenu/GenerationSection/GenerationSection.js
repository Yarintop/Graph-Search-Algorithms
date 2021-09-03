import {
  Button,
  FormControl,
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

const startGenerating = (dispatch, runningGenerator, oldTimer) => {
  if (!runningGenerator) return;
  var intervalId = setInterval(() => {
    dispatch(generateMaze());
  }, 1);
  return intervalId;
};

const GenerationSection = (props) => {
  const dispatch = useDispatch();
  const currentGenerator = useSelector(
    (state) => state.graph.algorithms.generate
  );
  const runningGenerator = useSelector((state) => state.graph.generationData.running);
  const oldTimer = useSelector(
    (state) => state.graph.intervalId.generate,
    () => true
  );
  let intervalId = startGenerating(dispatch, runningGenerator, oldTimer);
  dispatch(setIntervalId({ type: "generate", value: intervalId }));
  return (
    <div className="Generation">
      <Grid
        className="form-container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <FormControl variant="filled" className="select">
            <InputLabel htmlFor="generationAlgorithm">Algorithm</InputLabel>
            <Select
              native
              value={currentGenerator}
              id="generationAlgorithm"
              onChange={(e) => {
                dispatch(setAlgorithm({ type:'generate', algorithm: e.target.value}));
              }}
            >
              {getGenerationAlgorithms()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={(e) => {
              // dispatch(generateMaze());
              dispatch(reset());
              dispatch(clear());
              dispatch(generate());
            }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default GenerationSection;
