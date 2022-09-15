import { useAppContext } from "../../context/AppContext";

const LanguageSwitcher = () => {
  const { onSetLang, lang } = useAppContext();
  return (
    <div className="language-switcher p-20 flex justify-between align-items-center gap-20">
      <label htmlFor="language" className="fs-20">
        {lang === "en" ? "Language:" : "Limbă:"}
      </label>
      <select id="language" value={lang} onChange={onSetLang}>
        <option value="en">{lang === "en" ? "English" : "Engleză"}</option>
        <option value="ro">{lang === "en" ? "Romanian" : "Română"}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
