import Card from "../Card/Card";
import {
  useAppContext,
  UNCATEGORIZED_BUDGET_ID,
} from "../../context/AppContext";
import TotalBudgetCard from "../TotalBudgetCard/TotalBudgetCard";
import UncategorizedBudgetCard from "../UncategorizedBudgetCard/UncategorizedBudgetCard";
import { budgetIcons } from "../../static/budgetIcons";

const CardGrid = ({ openAddExpenseModal, setViewExpensesModalBudgetId }) => {
  const { budgets, getBudgetExpenses, currency, lang } = useAppContext();
  return (
    <div className="card-grid">
      {budgets.map((budget) => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        const icon = budgetIcons.map(icon => icon.id === budget.icon && <div key={icon.id} className="icon-card">{icon.icon}</div>)
        return (
          <Card
            currency={currency}
            name={budget.name}
            icon={icon}
            key={budget.id}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
            lang={lang}
          />
        );
      })}
      <UncategorizedBudgetCard
        onAddExpenseClick={openAddExpenseModal}
        onViewExpensesClick={() =>
          setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
        }
      />
      <TotalBudgetCard />
    </div>
  );
};

export default CardGrid;
