import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import Button from '../Button/Button';
import { RiErrorWarningLine } from "react-icons/ri";

const Modal = ({modalHeader, modalBodyText, buttons, budgetAlert}) => {
  const {lang, onHandleAlert, showBudgetAlert} = useAppContext();
  const {name, id} = budgetAlert

  return (
    <>
    <div className={showBudgetAlert ? `modal alert-${name?.toLowerCase()} show` : `modal alert-${name?.toLowerCase()}`}>
      <div className="modal-header flex justify-center align-items-center mv-20">
        <div className='flex gap-10 justify-center align-items-center c-danger'>
        <label className="fs-30">{langTerms(lang, modalHeader)}</label>
        <RiErrorWarningLine />
        </div>
      </div>
      <div className="modal-body">
      {id ? (<p className='mt-0 fs-20 text-center'>{langTerms(lang, 'Budget')} - {name}</p>) : ('')}
        <p className='text-center'>
          {langTerms(lang, modalBodyText)}
        </p>
      </div>
      {buttons && 
      <div className="flex justify-center gap-20 mv-20">
        <div onClick={()=>onHandleAlert('delete', budgetAlert)}>
          <Button
            content={langTerms(lang, "Delete")}
            variant={"btn-outline-primary"}
          />
        </div>
        <div onClick={()=>onHandleAlert('repeat', budgetAlert)}>
          <Button
            content={langTerms(lang, "Repeat")}
            variant={"btn-outline-primary"}
          />
        </div>
      </div>
      }
    </div>
    <div
        className={showBudgetAlert ? "overlay active" : "overlay"}></div>
  </>
  )
}

export default Modal