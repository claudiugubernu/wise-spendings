import { useAppContext } from "../../context/AppContext";
import { langTerms } from "../../static/langTerms";

const ToggleView = () => {
    const { lang, onToggleView, toggleView } = useAppContext();
    const setToggleView = (e) => {
        onToggleView(e);
    }
    
  return (
    <div className="toggle-switch view">
        <div className="switches-container">
            <input type="radio" id="budget" name="switchPlan" value="budget" checked={toggleView === 'budget' && true} onChange={(e) => setToggleView(e)}/>
            <input type="radio" id="savings" name="switchPlan" value="savings" onChange={(e) => setToggleView(e)}/>
            <label htmlFor="budget">{langTerms(lang, "Budget")}</label>
            <label htmlFor="savings">{langTerms(lang,"Savings")}</label>
            <div className="switch-wrapper">
                <div className="switch">
                    <div>{langTerms(lang, "Budget")}</div>
                    <div>{langTerms(lang,"Savings")}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ToggleView