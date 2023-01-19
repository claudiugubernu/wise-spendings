import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import Button from '../Button/Button';

const Modal = ({modalHeader, modalBodyText, buttons, showBudgetAlert}) => {
  const {lang, onHandleAlert} = useAppContext();
  const {budgetName, budgetId, show} = showBudgetAlert
  return (
    <>
    <div className={show ? "modal show" : "modal"}>
      <div className="modal-header flex justify-between align-items-center mv-20">
        <label className="fs-30">{langTerms(lang, modalHeader)}!</label>
        {budgetId ? (<p className='m-0 fs-20'>{langTerms(lang, 'Budget')} - {budgetName}</p>) : ('')}
      </div>
      <div className="modal-body">
        {langTerms(lang, modalBodyText)}
      </div>
      {buttons && 
      <div className="flex gap-20 mv-20">
        <div onClick={()=>onHandleAlert('delete', budgetId)}>
          <Button
            content={langTerms(lang, "Delete")}
            variant={"btn-outline-primary"}
          />
        </div>
        <div onClick={()=>onHandleAlert('repeat')}>
          <Button
            content={langTerms(lang, "Repeat")}
            variant={"btn-outline-primary"}
          />
        </div>
      </div>
      }
    </div>
  </>
  )
}

export default Modal