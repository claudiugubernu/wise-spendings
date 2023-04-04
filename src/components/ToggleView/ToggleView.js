import { useAppContext } from "../../context/AppContext";
import { langTerms } from "../../static/langTerms";

const ToggleView = () => {
    const { lang, onToggleView } = useAppContext();
    const setToggleView = (e) => {
        onToggleView(e);
    }
  return (
    <div className="toggle-switch view">
        <div className="switches-container">
            <input type="radio" id="budget" name="switchPlan" value="budget" onChange={(e) => setToggleView(e)}/>
            <input type="radio" id="savings" name="switchPlan" value="savings" onChange={(e) => setToggleView(e)}/>
            <label htmlFor="budget">Budget</label>
            <label htmlFor="savings">Savings</label>
            <div className="switch-wrapper">
                <div className="switch"></div>
            </div>
        </div>
    </div>
  )
}

export default ToggleView