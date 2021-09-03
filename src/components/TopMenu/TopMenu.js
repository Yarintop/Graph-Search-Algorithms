import GenerationSection from "./GenerationSection/GenerationSection"
import SolveSection from "./SolveSection/SolverSection";
import './TopMenu.css'

export default (props) => {
    return (
      <div className="TopMenu">
        <div className="GenerationSection">
        <GenerationSection />
        <SolveSection />
        </div>
      </div>
    );
}