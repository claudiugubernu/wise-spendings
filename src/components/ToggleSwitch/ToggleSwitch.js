import { useAppContext } from "../../context/AppContext";

const ToggleSwitch = () => {
  const { toggleTheme, isDark } = useAppContext();
  return (
    <div className="toggle-switch">
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
