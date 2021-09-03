import { Button, FormControl, Grid, InputLabel, Select } from "@material-ui/core";

const SolveSection = (props) => {
    return (
        <div className="Solution">
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
                //   value={currentGenerator}
                  id="generationAlgorithm"
                  onChange={(e) => {
                    // dispatch(setAlgorithm({ algorithm: e.target.value }));
                  }}
                >
                  {/* {getGenerationAlgorithms()} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                onClick={(e) => {
                //   dispatch(reset());
                //   dispatch(clear());
                //   dispatch(generate());
                }}
              >
                Generate
              </Button>
            </Grid>
          </Grid>
        </div>
    )
}

export default SolveSection;