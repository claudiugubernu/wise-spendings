import { useAppContext } from "../../context/AppContext";
import Card from "../Card/Card";

const TotalBudgetCard = () => {
  const { expenses, budgets, currency } = useAppContext();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (max === 0) return null;

  return (
    <Card
      amount={amount}
      name="Total"
      green
      max={max}
      currency={currency}
      hideButtons
      isDark
    />
  );
};

export default TotalBudgetCard;
