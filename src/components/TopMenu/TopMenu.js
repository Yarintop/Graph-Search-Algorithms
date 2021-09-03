import ControlSection from "./ControlSection/ControlSection";
import GenerationSection from "./GenerationSection/GenerationSection"
import SolveSection from "./SolveSection/SolverSection";
import './TopMenu.css'

export default (props) => {
    return (
      <div className="TopMenu">
        <div className="GenerationSection">
        <GenerationSection />
        </div>
        <div className="SolveSection">
        <SolveSection />
        </div>
        <div className="ControlSection">
        <ControlSection />
        </div>
      </div>
    );
}