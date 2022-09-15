import {
  UNCATEGORIZED_BUDGET_ID,
  useAppContext,
} from "../../context/AppContext";
import { currencyFormatter } from "../../utils/utils";
import { langTerms } from "../../static/langTerms";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const {
    getBudgetExpenses,
    budgets,
    deleteBudget,
    deleteExpense,
    currency,
    lang,
  } = useAppContext();

  const expenses = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? {
          name: "Uncategorized",
          id: UNCATEGORIZED_BUDGET_ID,
        }
      : budgets.find((budget) => budget.id === budgetId);
  return (
    <div className={budgetId != null ? "modal show" : "modal"}>
      <div className="modal-header flex justify-between align-items-center mv-20">
        <label className="fs-30">
          {langTerms(lang, "Expenses")} -{budget?.name}
        </label>
        <IoCloseCircleOutline onClick={handleClose} />
      </div>
      {budgetId !== UNCATEGORIZED_BUDGET_ID && (
        <div
          onClick={() => {
            deleteBudget(budget);
            handleClose();
          }}
        >
          <Button
            content={langTerms(lang, "Delete")}
            variant="outline-danger"
          />
        </div>
      )}
      <div className="modal-body">
        {expenses.map((expense) => (
          <div className="flex justify-between" key={expense.id}>
            <div className="">{expense.description}</div>
            <div className="">
              {currencyFormatter(currency).format(expense.amount)}
            </div>
            <div onClick={() => deleteExpense(expense)}>
              <Button content={"x"} variant="outline-danger" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewExpensesModal;
