import Card from "../Card/Card";
import { useAppContext } from "../../context/AppContext";
import TotalBudgetCard from "../TotalBudgetCard/TotalBudgetCard";

const CardGrid = ({ openAddExpenseModal, setViewExpensesModalBudgetId }) => {
  const { budgets, getBudgetExpenses, currency, lang } = useAppContext();
  return (
    <div className="card-grid">
      {budgets.map((budget) => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount,
          0
        );
        return (
          <Card
            currency={currency}
            name={budget.name}
            key={budget.id}
            amount={amount}
            max={budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
            lang={lang}
          />
        );
      })}
      <TotalBudgetCard />
    </div>
  );
};

export default CardGrid;
