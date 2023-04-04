import { useAppContext } from "../../context/AppContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { langTerms } from "../../static/langTerms";

const ToggleView = () => {
    const { toggleTheme, isDark, lang } = useAppContext();

  return (
    <div className="toggle-switch view">
     <div className="switches-container">
    <input type="radio" id="switchBudget" name="switchPlan" value="Budget" checked="checked" />
    <input type="radio" id="switchSavings" name="switchPlan" value="Savings" />
    <label htmlFor="switchBudget">Budget</label>
    <label htmlFor="switchSavings">Savings</label>
    <div className="switch-wrapper">
      <div className="switch"></div>
    </div>
  </div>
    </div>
  )
}

export default ToggleView