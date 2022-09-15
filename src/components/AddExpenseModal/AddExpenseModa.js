import { useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useAppContext } from "../../context/AppContext";

const AddExpenseModal = ({ show, handleClose }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpenses, budgets, lang } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    addExpenses({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  };
  return (
    <div className={show ? "modal show" : "modal"}>
      <form onSubmit={handleSubmit}>
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
          <div className="flex justify-end mt-50">
            <Button content={langTerms(lang, "Add")} variant={"btn-primary"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseModal;
