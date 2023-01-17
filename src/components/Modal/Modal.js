import React from 'react'
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import Button from '../Button/Button';

const Modal = ({modalHeader, modalBodyText, buttons, budgetId}) => {
  const {lang, showAlert, onHandleAlert} = useAppContext();
  return (
    <>
    <div className={showAlert ? "modal show" : "modal"}>
      <div className="modal-header flex justify-between align-items-center mv-20">
        <label className="fs-30">{langTerms(lang, modalHeader)}!</label>
      </div>
      <div className="modal-body">{langTerms(lang, modalBodyText)}</div>
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