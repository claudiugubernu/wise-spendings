import { useAppContext } from "../../context/AppContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { langTerms } from "../../static/langTerms";

const SortByDate = () => {
  const { sortByDate, onSortByDate, lang } = useAppContext();
  return (
    <div className="theme-switcher p-20 flex justify-between align-items-center gap-20">
      <p className="fs-20 m-0">{langTerms(lang, "Sort by date")}</p>
      <ToggleSwitch checked={sortByDate} onChange={onSortByDate}/>
    </div>
  );
};

export default SortByDate;
