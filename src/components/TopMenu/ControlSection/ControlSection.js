import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Select,
  Slider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { clear, pause, setSpeed, skipToggle } from "../../../logic/redux/graphSlice";
import "./ControlSection.css";

const ControlSection = (props) => {
  const dispatch = useDispatch();
  const isWeighted = useSelector((state) => state.graph.weightCheck);
  const runningGenerator = useSelector(
    (state) => state.graph.generationData.running
  );
  const runningSolution = useSelector((state) => state.graph.graphData.running);
  const isSkip = useSelector((state) => state.graph.skip);
  return (
    <div className="Control">
      <Grid
        className="form-container"
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(pause());
            }}
          >
            Pause
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={(e) => {
              dispatch(clear());
            }}
          >
            Clear
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isSkip}
                onChange={(e) => dispatch(skipToggle())}
              />
            }
            label="Skip Animation"
          />
        </Grid>
        <Grid item xs={10}>
          Speed
          <Slider
            defaultValue={60}
            step={1}
            min={1}
            max={500}
            valueLabelDisplay="auto"
            onChangeCommitted={
                (e, v) => {
                    dispatch(setSpeed({ speed: v }))
                }
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ControlSection;
