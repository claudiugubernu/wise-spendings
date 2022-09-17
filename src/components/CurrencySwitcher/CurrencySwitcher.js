import React from "react";
import { useAppContext } from "../../context/AppContext";
import { langTerms } from "../../static/langTerms";

const CurrencySwitcher = () => {
  const { lang, onSetCurrency, currency } = useAppContext();

  return (
    <div className="currency-switcher p-20 flex justify-between align-items-center gap-20">
      <label htmlFor="currency" className="fs-20">
        {langTerms(lang, "Currency")}
      </label>
      <select id="currency" onChange={onSetCurrency} value={currency}>
        <option value="GBP" selected>
          GBP
        </option>
        <option value="RON">RON</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
};

export default CurrencySwitcher;
