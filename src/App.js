import logo from "./logo.svg";
import "./App.css";
import Maze from "./components/maze/Maze";
import { useDispatch } from "react-redux";
import { updateGraph } from "./logic/redux/graphSlice";
import { generateGraph } from "./logic/graphLogic";
import TopMenu from "./components/TopMenu/TopMenu";

function App() {
  const dispatch = useDispatch();
  let centerWidth = window.screen.width * 0.765;
  return (
    <>
      <div className="center" style={{ width: centerWidth }}>
        <div className="upperMenu">
          <div style={{ height: 100 }}>
            <TopMenu />
          </div>
        </div>
        <Maze
          className="maze"
          onLoad={(rows, columns) =>
            dispatch(updateGraph(generateGraph(rows, columns)))
          }
        />
      </div>
    </>
  );
}

export default App;
