import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Modal from '../Modal/Modal'

const AlertModal = () => {
  const {budgetAlert} = useAppContext();
  console.log(budgetAlert);
  return (
    <>
    { budgetAlert.id && 
      <Modal key={budgetAlert.id} modalHeader={'Alert'} modalBodyText={`Your budget period has come to an end. How would you like to proceed ?`} buttons={true} budgetAlert={budgetAlert}/>
    }
    </>
  )
}

export default AlertModal