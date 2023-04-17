import { useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useAppContext } from "../../context/AppContext";
import { budgetIcons } from "../../static/budgetIcons";

const AddSavingsAccountModal = ({ show, handleClose }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const maxRef = useRef();
  const interestRef = useRef();
  const { addSavingAccount, lang } = useAppContext();
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

    addSavingAccount({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),  
      interest: interestRef.current.value,
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
            <label className="fs-30">{langTerms(lang, "Savings Account")}</label>
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
              <label htmlFor="max">{langTerms(lang, "Target")}</label>
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
              <label htmlFor="max">{langTerms(lang, "Interest(%p.a.)")}</label>
              <input
                type="number"
                id="max"
                ref={interestRef}
                min={0}
                step={0.01}
              />
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

export default AddSavingsAccountModal;
