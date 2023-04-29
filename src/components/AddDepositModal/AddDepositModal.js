import { useRef } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useAppContext } from "../../context/AppContext";
import { formatDate } from "../../utils/utils";

const AddDepositModal = ({ show, handleClose, savingAccountId }) => {
    const formRef = useRef();
    const amountRef = useRef();
    const dateRef = useRef();
    const { addDeposit, lang } = useAppContext();
    const handleSubmit = (e) => {
      e.preventDefault();
      addDeposit({
        amount: parseFloat(amountRef.current.value),
        date: dateRef.current.value,
        savingsId: savingAccountId,
      });
      formRef.current.reset();
      handleClose();
    };
    const todayDate = formatDate(new Date(), 'yyyy-mm-dd');
    
    return (
      <>
        <div className={show ? "modal show" : "modal"}>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="modal-header flex justify-between align-items-center mv-20">
              <label className="fs-30">{langTerms(lang, "New Deposit")}</label>
              <IoCloseCircleOutline onClick={handleClose} />
            </div>
            <div className="modal-body">
              <div className="form-row mb-20 flex flex-column v-gap-20">
                <label htmlFor="date">{langTerms(lang, "Date")}</label>
                <input
                  type="date"
                  id="date"
                  ref={dateRef}
                  min="2022-01-01"
                  max={todayDate}
                  defaultValue={todayDate}
                  required
                />
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

export default AddDepositModal