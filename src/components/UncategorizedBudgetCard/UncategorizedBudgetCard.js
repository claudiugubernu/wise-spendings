import {
  UNCATEGORIZED_BUDGET_ID,
  useAppContext,
} from "../../context/AppContext";
import Card from "../Card/Card";
import { langTerms } from "../../static/langTerms";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses, currency, lang } = useAppContext();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return (
    <Card
      {...props}
      amount={amount}
      currency={currency}
      name={langTerms(lang, "Uncategorized")}
      lang={lang}
    />
  );
};

export default UncategorizedBudgetCard;
