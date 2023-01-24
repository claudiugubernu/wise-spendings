import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useAppContext } from "../../context/AppContext";
import { updatedAlertDate } from "../../utils/utils";
import { budgetIcons } from "../../static/budgetIcons";

const AddBudgetModal = ({ show, handleClose }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const maxRef = useRef();
  const budgetPeriodRef = useRef();
  const { addBudget, lang } = useAppContext();
  const [openIconSelector, setOpenIconSelector] = useState(false);
  const [iconId, setIconId] = useState('wallet');

  const onOpenIconSelector = () => {
    setOpenIconSelector((prev) => !prev);
  }

  const onSetIconId = (e) => {
    setIconId(e.currentTarget.id);
    setOpenIconSelector((prev)=> !prev);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetPeriod = updatedAlertDate(budgetPeriodRef.current.value);

    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),  
      budgetPeriod: budgetPeriod,
      alertLength: budgetPeriodRef.current.value,
      dateAdded: new Date(),
      icon: iconId
    });
    formRef.current.reset();
    setIconId('wallet');
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
            <div className="form-row relative mb-20 flex flex-column v-gap-20">
              <label htmlFor="icon">{langTerms(lang, "Icon")}</label>
              <div className="budget-icon" onClick={onOpenIconSelector}>
                {
                  budgetIcons.map(icon => icon.id === iconId && <div key={icon.id}>{icon.icon}</div>)
                }
              </div>
              {
                openIconSelector &&
                <div className="icons-container">
                  {
                    budgetIcons.map(icon => (
                      <div key={icon.id} id={icon.id} onClick={(e) => onSetIconId(e)}>{icon.icon}</div>
                    ))
                  }
                </div>
              }
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
            <select id="budgetPeriod" ref={budgetPeriodRef} required>
              <option value="week">{langTerms(lang, "One Week")}</option>
              <option value="month">{langTerms(lang, "One Month")}</option>
              <option value="quarterly">{langTerms(lang, "Three Months")}</option>
              <option value="halfYear">{langTerms(lang, "Six Months")}</option>
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
