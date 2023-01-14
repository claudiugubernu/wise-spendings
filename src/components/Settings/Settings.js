import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { useAppContext } from "../../context/AppContext";
import { langTerms } from "../../static/langTerms";
import SortByDate from "../SortByDate/SortByDate";

const Settings = () => {
  const { lang } = useAppContext();
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div className="settings">
      <div
        className={open ? "settings-toggle rotate" : "settings-toggle"}
        onClick={onOpen}
      >
        <IoSettingsOutline />
      </div>
      <div className={open ? "settings-modal open" : "settings-modal"}>
        <div className="modal-header flex justify-between p-20">
          <p className="m-0 fs-30">{langTerms(lang, "Settings")}</p>
          <IoCloseCircleOutline onClick={onOpen} />
        </div>
        <div className="modal-body">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <CurrencySwitcher />
          <SortByDate />
        </div>
      </div>
      <div
        className={open ? "overlay active" : "overlay"}
        onClick={onOpen}
      ></div>
    </div>
  );
};

export default Settings;
