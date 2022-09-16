import {
  UNCATEGORIZED_BUDGET_ID,
  useAppContext,
} from "../../context/AppContext";
import Card from "../Card/Card";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses, currency } = useAppContext();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <Card amount={amount} currency={currency} name="Uncategorized" {...props} />
  );
};

export default UncategorizedBudgetCard;
