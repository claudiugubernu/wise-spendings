import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext(null);

export function useAppContext() {
  return useContext(AppContext);
}

const AppProvider = ({ children }) => {
  // Theme
  const [isDark, setIsDark] = useLocalStorage("theme-dark", false);
  const theme = isDark ? "dark-theme" : "light-theme";
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Lang
  const [lang, setLang] = useLocalStorage("lang", "en");
  const onSetLang = (e) => {
    setLang(e.target.value);
  };

  // Currency
  const [currency, setCurrency] = useLocalStorage("currency", "gpb");
  const onSetCurrency = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        theme,
        toggleTheme,
        lang,
        onSetLang,
        currency,
        onSetCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
