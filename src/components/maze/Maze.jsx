import { Grid } from "@material-ui/core";
import React, { Component } from "react";
import { connect, useDispatch } from "react-redux";
import { generateGraph } from "../../logic/graphLogic";
import { putNode, updateGraph } from "../../logic/redux/graphSlice";
import MazeNode from "./MazeNode";
import "./Maze.css";
import { Kruskal } from "../../logic/mazeGeneration/kruskal";

const mapStateToProps = (state) => {
  let vertices = state.graph.graphData.vertices;
  return { vertices };
};

const mapDispatchToProps = (dispatch) => {
  return {
    putNode: (vertex) => dispatch(putNode(vertex)),
    updateGraph: (nx, ny) => {
      updateGraph(generateGraph(nx, ny));
    },
  };
};

class Maze extends Component {
  L = 31;
  constructor(props) {
    super(props);
  }
  state = {
    rows: 0,
    columns: 0,
  };

  componentDidMount() {
    this.initializeMaze();
  }

  initializeMaze = () => {
    let screenWidth = 1920;
    // let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let rows = Math.floor(screenHeight / this.L) + 1;
    if (rows > 40)
      rows = 40;
    let columns = Math.floor(screenWidth / this.L);
    this.setState(
      {
        rows: rows,
        columns: columns,
      },
      () => {
        this.props.onLoad(this.state.rows, this.state.columns);
        // this.props.putNode({type: "start", id: columns + 1});
        // this.props.putNode({type: "end", id: (rows - 1) * columns - 2});
        this.props.putNode({type: "start", id: Math.floor((rows / 2 * columns) + (columns * 3) / 4)});
        this.props.putNode({type: "end", id: Math.floor((rows / 2 * columns) + columns / 4)});
      }
    );

  };

  getCells = (rows, columns) => {
    let cells = [];
    let rowcls = "maze-board";
    this.props.vertices.forEach((v) => {});
    for (let r = 0; r < Math.floor(this.props.vertices.length / columns); r++) {
      let nodes = [];
      for (let c = 0; c < Math.floor(this.props.vertices.length / rows); c++) {
        nodes.push(<MazeNode key={r * columns + c} id={r * columns + c} />);
      }
      cells.push(
        <Grid
          container
          justifyContent="center"
          key={"row-" + r}
          className={rowcls}
        >
          {nodes}
        </Grid>
      );
    }
    return cells;
  };

  render() {
    return (
      <>
        <Grid container justifyContent="center" className="maze-board" direction="row">
          {this.getCells(this.state.rows, this.state.columns)}
        </Grid>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maze);
