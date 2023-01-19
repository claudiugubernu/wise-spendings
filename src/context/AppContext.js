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
  const addBudget = ({ name, max, budgetPeriod, dateAdded }) => {
    setBudgets((prevBudgets) => {
      // If we already have something with same name return originial budget
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max, budgetPeriod, dateAdded }];
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
  
  // Alerts
  const [showBudgetAlert, setShowBudgetAlert] = useState({
    show: false,
    budgetName: '',
    budgetId: ''
  });
  const todayDate = new Date();
  let alarmDay = new Date();

    
  const onHandleAlert = (resolution, id) => {
    console.log(resolution, id)
    if(resolution === 'delete') {
      deleteBudget({id});
    }
    if (resolution === 'repeat') {
    }
    setShowBudgetAlert({...setShowBudgetAlert, show: false})
  }
  
  // Check budgets set period to handle alert
  useEffect(() => {
    budgets.map(budget => {
      switch(budget.budgetPeriod) {
        case 'week':
          alarmDay.setDate(todayDate.getDate() - 1);
          console.log("alarmDay",alarmDay)
          if(alarmDay <= todayDate) {
            setShowBudgetAlert({...showBudgetAlert, show: true, budgetName: budget.name, budgetId: budget.id})
          }
          break;
        case 'month':
          alarmDay.setDate(todayDate.getDate() - 30);
          console.log("alarmDay",alarmDay)
          if(alarmDay <= todayDate) {
            setShowBudgetAlert({...showBudgetAlert, show: true, budgetName: budget.name, budgetId: budget.id})
          }
          break;
        case 'year':
          alarmDay.setDate(todayDate.getDate() - 365);
          console.log("alarmDay",alarmDay)
          if(alarmDay <= todayDate) {
            setShowBudgetAlert({...showBudgetAlert, show: true, budgetName: budget.name, budgetId: budget.id})
          }
          break;
        default: 
          console.log('no budget period found')
          break;
      }
    })
  }, [budgets])

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
        showBudgetAlert,
        onHandleAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
