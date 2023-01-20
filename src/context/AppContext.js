import { createContext, useContext, useEffect, useState } from "react";
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

  // Sort Expenses by Date
  const [sortByDate, setSortByDate] = useLocalStorage("sortByDate", false);
  const onSortByDate = () => {
    setSortByDate((prev)=> !prev)
  }

  // Budget & Expenses
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);
  
  // Add Expense
  const addExpense = ({ description, date, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, date, amount, budgetId },
      ];
    });
  };
  
  // Delete Expense
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
  };
  
  // Get Budget
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  // Add Budget
  const addBudget = ({ name, max, budgetPeriod, dateAdded }) => {
    setBudgets((prevBudgets) => {
      // If we already have something with same name return originial budget
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max, budgetPeriod, dateAdded }];
    });
  };
  
  // Update Budget
  const updateBudget = ({ id }) => {
    
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

  // Alerts
  const [budgetAlert, setBudgetAlert] = useState({});
  const [showBudgetAlert, setShowBudgetAlert] = useState(false)
    
  const onHandleAlert = (resolution, budget) => {
    const {id} = budget
    if(resolution === 'delete') {
      deleteBudget({id});
      setBudgetAlert({})
    }
    // if (resolution === 'repeat') {
    //   updateBudget({id, name, budgetPeriod, max, dateAdded, show:false})
    // }
    setShowBudgetAlert(false)
  }

  // const currentDate = new Date();
  const currentDate = new Date(1674893827165).valueOf(); // 28

  useEffect(() => {
    budgets.map((budget) => {
      let alertDate = new Date(budget.budgetPeriod).valueOf()
      console.log(budget.name, alertDate)
      console.log('currentDate', currentDate)
      if(currentDate >= alertDate) {
        console.log(budget.name);
        setBudgetAlert({
          id: budget.id,
          name: budget.name,
        })
        setShowBudgetAlert(true)
      }
    })
  },[budgets, currentDate, budgetAlert])

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
        onSortByDate,
        sortByDate,
        budgetAlert,
        showBudgetAlert,
        onHandleAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
