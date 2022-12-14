import {
  UNCATEGORIZED_BUDGET_ID,
  useAppContext,
} from "../../context/AppContext";
import { sliceString, currencyFormatter } from "../../utils/utils";
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
    <>
      <div className={budgetId != null ? "modal expenses show" : "modal"}>
        <div className="modal-header flex justify-between align-items-center mv-20">
          <label className="">
            {langTerms(lang, "Expenses")} -{budget?.name}
          </label>
          {budgetId !== UNCATEGORIZED_BUDGET_ID && (
            <div
              onClick={() => {
                deleteBudget(budget);
                handleClose();
              }}
            >
              <Button
                content={langTerms(lang, "Delete")}
                variant="btn-outline-danger"
              />
            </div>
          )}
          <IoCloseCircleOutline onClick={handleClose} />
        </div>
        <div className="modal-body">
          {expenses.map((expense) => (
            <div
              className="grid align-items-center mv-20 m-mv-20"
              key={expense.id} title={expense.description}
            >
              <p className="m-0">{sliceString(expense.description)}</p>
              <p className="m-0">
                {new Date(expense.date).toLocaleDateString("en-GB")}
              </p>
              <p className="expense-amount">
                {currencyFormatter(currency).format(expense.amount)}
              </p>
              <div onClick={() => deleteExpense(expense)}>
                <Button content={"x"} variant="btn-outline-danger" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={budgetId != null ? "overlay active" : "overlay"}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default ViewExpensesModal;
