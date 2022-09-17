import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

const AppContext = createContext(null);

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

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
  const [currency, setCurrency] = useLocalStorage("currency", "GBP");
  const onSetCurrency = (e) => {
    setCurrency(e.target.value);
  };

  // Budget & Expenses
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Get Budget
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  // Add Expense
  const addExpense = ({ description, date, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, date, amount, budgetId },
      ];
    });
  };

  // Add Budget
  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      // If we already have something with same name return originial budget
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  // Delete Budget
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        // If budget has expense move to uncategorized
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  };

  // Delete Expense
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
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
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
