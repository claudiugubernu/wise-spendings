import { useAppContext } from "../../context/AppContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const ThemeSwitcher = () => {
  const { lang } = useAppContext();
  return (
    <div className="theme-switcher p-20 flex justify-between align-items-center gap-20">
      <p className="fs-20 m-0">
        {lang === "en" ? "Dark Mode" : "Mod Întunecat"}
      </p>
      <ToggleSwitch />
    </div>
  );
};

export default ThemeSwitcher;
