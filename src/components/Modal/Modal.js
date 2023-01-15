import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import Button from '../Button/Button';

const Modal = ({modalHeader, modalBodyText, buttons}) => {
  const {lang} = useAppContext();
  const [showModal, setShowModal] = useState(true);
  const handleClose = () => {
    setShowModal((prev) => !prev)
  }

  return (
    <>
    <div className={showModal ? "modal show" : "modal"}>
      <div className="modal-header flex justify-between align-items-center mv-20">
        <label className="fs-30">{langTerms(lang, modalHeader)}!</label>
      </div>
      <div className="modal-body">{langTerms(lang, modalBodyText)}</div>
      {buttons && 
      <div className="flex gap-20 mv-20">
        <div onClick={handleClose}>
          <Button
            content={langTerms(lang, "Delete")}
            variant={"btn-outline-primary"}
          />
        </div>
        <div onClick={handleClose}>
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