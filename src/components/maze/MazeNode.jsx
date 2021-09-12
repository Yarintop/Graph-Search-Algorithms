import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNode, toggleWall } from "../../logic/redux/graphSlice";
import { FormControlLabel, Paper } from "@material-ui/core";
import "./MazeNode.css";

const getCSS = (type) => {
  let cls = "node";
  switch (type) {
    case "start":
      cls += " start";
      break;
    case "start_s":
      cls += " start_s";
      break;
    case "end":
      cls += " end";
      break;
    case "end_s":
      cls += " end_s";
      break;
    case "wall":
      cls += " wall";
      break;
    case "visited":
      cls += " visited";
      break;
    case "path":
      cls += " path";
      break;
    default:
      break;
  }
  return cls;
};

const MazeNode = (props) => {
  const dispatch = useDispatch();
  let nodeState = useSelector(
    (state) => state.graph.graphData.data[props.id],
    (oldVal, newVal) =>
      oldVal.type === newVal.type && oldVal.value == newVal.value
  );
  let weighted = useSelector(
    (state) => state.graph.generationData.weighted
  );
  // console.log(weighted);
  return (
    <Paper
      draggable='false'
      id={props.id}
      key={props.id}
      className={getCSS(nodeState.type)}
      onMouseEnter={(e) => {
        if (e.buttons === 1) 
          if (nodeState.type === "start" || nodeState.type === "end") dispatch(selectNode(props.id));
          else dispatch(toggleWall(props.id));
      }}
      onPointerDown={(e) => {
        if (nodeState.type === "start" || nodeState.type === "end") dispatch(selectNode(props.id));
        else dispatch(toggleWall(props.id));
      }}
      elevation={1}
    >
      {weighted &&
      (nodeState.type === "" || nodeState.type === "visited") &&
      nodeState.value > -1
        ? nodeState.value
        : undefined}
    </Paper>
  );
};

export default MazeNode;
