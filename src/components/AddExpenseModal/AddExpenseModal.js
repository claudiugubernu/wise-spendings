import { useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import {
  useAppContext,
  UNCATEGORIZED_BUDGET_ID,
} from "../../context/AppContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetID }) => {
  const formRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets, lang } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    formRef.current.reset();
    handleClose();
  };
  return (
    <div className={show ? "modal show" : "modal"}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-header flex justify-between align-items-center mv-20">
          <label className="fs-30">{langTerms(lang, "New Expense")}</label>
          <IoCloseCircleOutline onClick={handleClose} />
        </div>
        <div className="modal-body">
          <div className="form-row mb-20 flex flex-column v-gap-20">
            <label htmlFor="description">
              {langTerms(lang, "Description")}
            </label>
            <input type="text" id="description" ref={descriptionRef} required />
          </div>
          <div className="form-row mb-20 flex flex-column v-gap-20">
            <label htmlFor="amount">{langTerms(lang, "Amount")}</label>
            <input
              type="number"
              id="amount"
              ref={amountRef}
              required
              min={0}
              step={0.01}
            />
          </div>
          <div className="form-row mb-20 flex flex-column v-gap-20">
            <label htmlFor="budgetId">{langTerms(lang, "Budget")}</label>
            <select defaultValue={defaultBudgetID} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>
                {langTerms(lang, "Uncategorized")}
              </option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mt-50">
            <Button
              type={"submit"}
              content={langTerms(lang, "Add")}
              variant={"btn-primary"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseModal;
