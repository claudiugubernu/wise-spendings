import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import Button from '../Button/Button';

const Modal = ({modalHeader, modalBodyText, buttons, budgetAlert}) => {
  const {lang, onHandleAlert, showBudgetAlert} = useAppContext();
  const {name, id} = budgetAlert

  return (
    <>
    <div className={showBudgetAlert ? `modal alert-${name?.toLowerCase()} show` : `modal alert-${name?.toLowerCase()}`}>
      <div className="modal-header flex justify-between align-items-center mv-20">
        <label className="fs-30">{langTerms(lang, modalHeader)}!</label>
        {id ? (<p className='m-0 fs-20'>{langTerms(lang, 'Budget')} - {name}</p>) : ('')}
      </div>
      <div className="modal-body">
        {langTerms(lang, modalBodyText)}
      </div>
      {buttons && 
      <div className="flex gap-20 mv-20">
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
  </>
  )
}

export default Modal