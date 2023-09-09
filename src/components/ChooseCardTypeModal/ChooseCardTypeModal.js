import React from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { AiOutlineBank } from 'react-icons/ai';
import { GiTakeMyMoney } from 'react-icons/gi';
import { RiBillFill } from 'react-icons/ri';
import { langTerms } from '../../static/langTerms';
import { useAppContext } from '../../context/AppContext';

const cardTypes = [
    {
        "name": 'Budget',
        "icon": GiTakeMyMoney,
        "action": 'addBudget'
    },
    {
        "name": 'Bill',
        "icon": RiBillFill,
        "action": 'addBill'
    },
    {
        "name": 'Loan',
        "icon": AiOutlineBank,
        "action": 'addLoan'
    },
];

const ChooseCardTypeModal = ({show, handleClose, actionType }) => {
    const { lang } = useAppContext();
    
    const onOpenActionType = (action) => {
        actionType.forEach(type => {
            if(type.name === action) {
                type.callback();
                handleClose();
            }
        });
    }

  return (
    <>
    <div className={show ? "modal show" : "modal"}>
        <div className="modal-header flex justify-between align-items-center mt-20 mb-30">
            <label className="fs-20">{langTerms(lang, "Choose An Option")}</label>
            <IoCloseCircleOutline onClick={handleClose} />
        </div>
        <div className="modal-body">
            <div className='card-types flex justify-between text-center align-items-center flex-wrap v-gap-20'>
            {
                cardTypes.map((cardType) => (
                    <button key={cardType.name} className='flex flex-column w-45 align-items-center justify-center pv-30' onClick={() => onOpenActionType(cardType.action)}>
                        <span className="fs-12 mb-10">{langTerms(lang, cardType.name)}</span>
                        <cardType.icon/>
                    </button>
                ))
            }
            </div>
        </div>
    </div>
    <div
      className={show ? "overlay active" : "overlay"}
      onClick={handleClose}
    ></div>
    </>
  );
}

export default ChooseCardTypeModal