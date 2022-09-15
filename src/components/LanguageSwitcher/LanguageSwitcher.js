import { useAppContext } from "../../context/AppContext";
import { langTerms } from "../../static/langTerms";

const LanguageSwitcher = () => {
  const { onSetLang, lang } = useAppContext();
  return (
    <div className="language-switcher p-20 flex justify-between align-items-center gap-20">
      <label htmlFor="language" className="fs-20">
        {lang === "en" ? "Language:" : "Limbă:"}
      </label>
      <select id="language" value={lang} onChange={onSetLang}>
        <option value="en">{langTerms(lang, "English")}</option>
        <option value="ro">{langTerms(lang, "Romanian")}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
