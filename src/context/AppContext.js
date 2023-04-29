import { createContext, useContext, useEffect, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { updatedAlertDate } from "../utils/utils"

const AppContext = createContext(null)

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useAppContext() {
  return useContext(AppContext)
}

const AppProvider = ({ children }) => {
  // Theme
  const [isDark, setIsDark] = useLocalStorage("theme-dark", false)
  const theme = isDark ? "dark-theme" : "light-theme"
  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  // Lang
  const [lang, setLang] = useLocalStorage("lang", "en")
  const onSetLang = (e) => {
    setLang(e.target.value)
  }

  // Currency
  const [currency, setCurrency] = useLocalStorage("currency", "GBP")
  const onSetCurrency = (e) => {
    setCurrency(e.target.value)
  }

  // Sort Expenses by Date
  const [sortByDate, setSortByDate] = useLocalStorage("sortByDate", false)
  const onSortByDate = () => {
    setSortByDate((prev)=> !prev)
  }

  // Card Options
  const hasCardOptions = true;

  // Budget & Expenses
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses", [])
  const [savingAccount, setSavingAccount] = useLocalStorage("savings", {});
  const [deposits, setDeposits] = useLocalStorage("deposits", []);
  
  // Add Expense
  const addExpense = ({ description, date, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [
        ...prevExpenses,
        { id: uuidV4(), description, date, amount, budgetId },
      ]
    })
  }
  
  // Delete Expense
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id)
    })
  }
  
  // Get Budget expesnses
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId)
  }

  // Add Budget
  const addBudget = ({ name, max, budgetPeriod, dateAdded, alertLength, icon }) => {
    setBudgets((prevBudgets) => {
      // If we already have something with same name return originial budget
      if (prevBudgets.find((budget) => budget.name.toLowerCase() === name.toLowerCase())) {
        alert('A budget with that name has been found.')
        return prevBudgets
      }
      return [...prevBudgets, { id: uuidV4(), name, max, budgetPeriod, dateAdded, alertLength, icon }]
    })
  }

  // Update Budget
  const updateBudget = ({ id, budgetPeriod, alertLength }) => {
    const updatedAlert = updatedAlertDate(alertLength, budgetPeriod)
    const newBudgets = budgets.map((budget) => {
      if (budget.id === id) {
        return {...budget, budgetPeriod: updatedAlert}
      }
      return budget
    })
    const newExpenses = expenses.map((expense) => {
      if (expense.budgetId === id) {
        return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      }
      return expense
    })
    setBudgets(newBudgets)
    setExpenses(newExpenses)
  }

  // Delete Budget
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense
        // If budget has expense move to uncategorized
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
      })
    })

    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id)
    })
  }

  // Add Savings 
  const addSavingAccount = ({name, max, interest, dateAdded, icon}) => {
    setSavingAccount( {...savingAccount, id: uuidV4(), name, max, interest, dateAdded, icon})
  }
  
  // Delete Savings 
  const deleteSavingAccount = ({id}) => {
    if(savingAccount.id === id) {
      setSavingAccount({})
    }
  }

  // Deposit Savings
  const addDeposit = ({ amount, date, savingsId }) => {
    setDeposits((prevDeposits) => {
      return [
        ...prevDeposits,
        { id: uuidV4(), amount, date, savingsId},
      ];
    })
  }

  // Widthdraw Savings
  const withdrawSavigns = ({ id }) => {

  }

  // Get Deposits
  const getDeposits = (savingsId) => {
    return deposits.filter((deposit) => deposit.savingsId === savingsId)
  }

  // Alerts
  const [budgetAlert, setBudgetAlert] = useState({})
  const [showBudgetAlert, setShowBudgetAlert] = useState(false)
    
  const onHandleAlert = (resolution, budget) => {
    const {id, budgetPeriod, alertLength} = budget
    if(resolution === 'delete') {
      deleteBudget({id})
      setBudgetAlert({})
    }
    if (resolution === 'repeat') {
      updateBudget({id, budgetPeriod, alertLength})
      setBudgetAlert({})
    }
    setShowBudgetAlert(false)
  }

  const currentDate = new Date().valueOf()

  useEffect(() => {
    budgets.forEach((budget) => {
      let alertDate = new Date(budget.budgetPeriod).setHours(0,0,0,0).valueOf();
      if(currentDate >= alertDate) {
        setBudgetAlert({
          id: budget.id,
          name: budget.name,
          alertLength: budget.alertLength,
          budgetPeriod: budget.budgetPeriod
        })
        setShowBudgetAlert(true)
      }
    })
  },[budgets, currentDate])

  // Toggle View
  const [toggleView, setToggleView] = useState('budget');

  const onToggleView = (e) => {
    setToggleView(e.target.id);
  }

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
        onHandleAlert,
        toggleView,
        onToggleView,
        hasCardOptions,
        addSavingAccount,
        deleteSavingAccount,
        savingAccount,
        addDeposit,
        withdrawSavigns,
        getDeposits
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
