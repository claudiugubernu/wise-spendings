import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { currencyFormatter } from "../../utils/utils";
import { langTerms } from "../../static/langTerms";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "../Button/Button";
import ViewWidthdrawForm from "../ViewWidthdrawForm/ViewWidthdrawForm";

const ViewDepositsModal = ({ show, savingAccount, handleClose }) =>  {
    const {
    deposits,
    deleteSavingAccount,
    currency,
    lang,
  } = useAppContext();
  const [showForm, SetShowForm] = useState(false);

  return (
    <>
    <div className={show ? "modal expenses show" : "modal expenses"}>
        <div className="modal-header flex justify-between align-items-center mv-20">
          <label>
            {langTerms(lang, "Deposits")} - {savingAccount?.name}
          </label>
          <IoCloseCircleOutline onClick={handleClose} />
        </div>
        <div className="modal-body">
          {deposits.map((deposit) => (
            <div
              className="grid align-items-center mv-20 m-mv-20"
              key={deposit.id}
            >
              <p className="m-0">
                {new Date(deposit.date).toLocaleDateString("en-GB")}
              </p>
              <p className="expense-amount">
                {currencyFormatter(currency).format(deposit.amount)}
              </p>
            </div>
          ))}
        </div>
        <div className="modal-footer flex mt-10 pt-20 pb-10">
            <div
              onClick={() => {
                SetShowForm(true);
              }}
            >
              <Button
                content={langTerms(lang, "Widthdraw")}
                variant="btn-outline"
              />
            </div>
            <div
              className="ml-auto"
              onClick={() => {
                deleteSavingAccount(deposits);
                handleClose();
              }}
            >
              <Button
                content={langTerms(lang, "Delete")}
                variant="btn-outline-danger"
              />
            </div>
        </div>
      </div>
      <div
        className={show ? "overlay active" : "overlay"}
        onClick={handleClose}
      ></div>
      <ViewWidthdrawForm 
        savingAccountId={savingAccount.id}
        handleClose={() => SetShowForm(false)}
        show={showForm}
      />
    </>
  );
};

export default ViewDepositsModal