import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWall } from "../../logic/redux/graphSlice";
import { Paper } from "@material-ui/core";
import "./MazeNode.css";

const getCSS = (type) => {
  let cls = "node";
  switch (type) {
    case "start":
      cls += " start";
      break;
    case "end":
      cls += " end";
      break;
    case "wall":
      cls += " wall";
      break;
    case "seen":
      cls += " seen";
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
    (oldVal, newVal) => oldVal.type === newVal.type && oldVal.value == newVal.value
  );
  return (
    <Paper
      id={props.id}
      key={props.id}
      className={getCSS(nodeState.type)}
      onMouseDown={(e) => {
        dispatch(toggleWall(props.id));
      }}
      elevation={1}
    ></Paper>
  );
};

export default MazeNode;
