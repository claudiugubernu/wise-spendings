import {
  UNCATEGORIZED_BUDGET_ID,
  useAppContext,
} from "../../context/AppContext";
import Card from "../Card/Card";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useAppContext();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <Card amount={amount} name="Uncategorized" gray {...props} />;
};

export default UncategorizedBudgetCard;
