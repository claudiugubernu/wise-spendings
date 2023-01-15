import { useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useAppContext } from "../../context/AppContext";

const AddBudgetModal = ({ show, handleClose }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const maxRef = useRef();
  const budgetPeriod = useRef();
  const { addBudget, lang } = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
      budgetPeriod: budgetPeriod.current.value,
      dateAdded: new Date()
    });
    formRef.current.reset();
    handleClose();
  };
  return (
    <>
      <div className={show ? "modal show" : "modal"}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="modal-header flex justify-between align-items-center mv-20">
            <label className="fs-30">{langTerms(lang, "New Budget")}</label>
            <IoCloseCircleOutline onClick={handleClose} />
          </div>
          <div className="modal-body">
            <div className="form-row mb-20 flex flex-column v-gap-20">
              <label htmlFor="name">{langTerms(lang, "Name")}</label>
              <input type="text" id="name" ref={nameRef} required />
            </div>
            <div className="form-row mb-20 flex flex-column v-gap-20">
              <label htmlFor="max">{langTerms(lang, "Maximum Spending")}</label>
              <input
                type="number"
                id="max"
                ref={maxRef}
                required
                min={1}
                step={0.01}
              />
            </div>
            <div className="form-row mb-20 flex flex-column v-gap-20">
            <label htmlFor="budgetPeriod">
              {langTerms(lang, "Budget Period")}
            </label>
            <select id="budgetPeriod" ref={budgetPeriod} required>
              <option value="week">{langTerms(lang, "One Week")}</option>
              <option value="month">{langTerms(lang, "One Month")}</option>
              <option value="year">{langTerms(lang, "One Year")}</option>
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
      <div
        className={show ? "overlay active" : "overlay"}
        onClick={handleClose}
      ></div>
    </>
  );
};

export default AddBudgetModal;
