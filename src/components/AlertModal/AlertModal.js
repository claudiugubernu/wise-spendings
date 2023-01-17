import React from 'react'
import { useAppContext } from '../../context/AppContext'
import Modal from '../Modal/Modal'

const AlertModal = () => {
  const {budgets} = useAppContext();
  console.log(budgets)
  return (
    <>
    {
      budgets.map(budget => (
        <Modal key={budget.id} modalHeader={'Alert'} modalBodyText={`Your budget period has come to an end. How would you like to proceed ?`} buttons={true} budgetId={budget.id}/>
      ))
    }
    </>
  )
}

export default AlertModal