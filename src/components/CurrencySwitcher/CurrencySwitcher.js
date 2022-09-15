import React from "react";
import { useAppContext } from "../../context/AppContext";

const CurrencySwitcher = () => {
  const { lang, onSetCurrency, currency } = useAppContext();

  return (
    <div className="currency-switcher p-20 flex justify-between align-items-center gap-20">
      <label htmlFor="currency" className="fs-20">
        {lang === "en" ? "Currency:" : "Valută:"}
      </label>
      <select id="currency" onChange={onSetCurrency} value={currency}>
        <option value="gbp" defaultValue>
          GBP
        </option>
        <option value="ron">RON</option>
        <option value="usd">USD</option>
      </select>
    </div>
  );
};

export default CurrencySwitcher;
