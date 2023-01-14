import { useAppContext } from "../../context/AppContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { langTerms } from "../../static/langTerms";

const ThemeSwitcher = () => {
  const { toggleTheme, isDark, lang } = useAppContext();
  return (
    <div className="theme-switcher p-20 flex justify-between align-items-center gap-20">
      <p className="fs-20 m-0">{langTerms(lang, "Dark Mode")}</p>
      <ToggleSwitch checked={isDark} onChange={toggleTheme}/>
    </div>
  );
};

export default ThemeSwitcher;
