import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import AddBudgetModal from "../AddBudgetModal/AddBudgetModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import CardGrid from "../CardGrid/CardGrid";
import ViewExpensesModal from "../ViewExpensesModal/ViewExpensesModal";
import AlertModal from "../AlertModal/AlertModal";
import ToggleView from "../ToggleView/ToggleView";
import AddSavingsAccountModal from "../AddSavingsAccountModal/AddSavingsAccountModal";
import SavingsAccount from "../SavingsAccount/SavingsAccount";
import AddDepositModal from "../AddDepositModal/AddDepositModal";
import ViewDepositsModal from "../ViewDepositsModal/ViewDepositsModal";
import ChooseCardTypeModal from "../ChooseCardTypeModal/ChooseCardTypeModal";
import { AiOutlinePlus } from "react-icons/ai";

const View = () => {
  const { lang, toggleView, savingAccount, deleteSavingAccount } = useAppContext();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showaddDepositModal, setShowAddDepositModal] = useState(false);
  const [addSavingsAccountModal, setAddSavingsAccountModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewDepositsModal, setViewDepositsModal] = useState(false);
  const [showCardTypeModal, setShowCardTypeModal] = useState(false);

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const openAddDepositModal = () => {
    setShowAddDepositModal(true);
  }
  
  const openViewDepositsModal = () => {
    setViewDepositsModal(true);
  }

  return (
    <main className="site-width h-100">
      <div className="view-controls flex flex-wrap justify-between align-items-center mv-50 m-mv-50">
        {
          toggleView === 'budget' &&
          <div className="open-type-btn" onClick={() => setShowCardTypeModal(true)}>
            <button><AiOutlinePlus/></button>
          </div>
        }
        { toggleView === 'savings' && Object.keys(savingAccount).length === 0 &&
          <div
            className="mr-50 m-mr-0"
            onClick={() => setAddSavingsAccountModal(true)}
          >
            <Button
              content={langTerms(lang, "Add Savings Account")}
              variant={"btn-primary"}
            />
          </div>
        }
        <ToggleView />
      </div>

      { 
        toggleView === 'budget' ? 
        (
          <>
          <ChooseCardTypeModal 
            show={showCardTypeModal}
            handleClose={() => setShowCardTypeModal(false)}
            actionType={[
              {
                "name": "addBudget",
                "callback": () => setShowAddBudgetModal(true)
              },
              {
                "name": "addBill",
                "callback": () => alert('Comming Soon!')
              },
              {
                "name": "addLoan",
                "callback": () => alert('Comming Soon!')
              }
            ]}
          />
          <CardGrid
            openAddExpenseModal={openAddExpenseModal}
            setViewExpensesModalBudgetId={setViewExpensesModalBudgetId}
          />
          <AddBudgetModal
            show={showAddBudgetModal}
            handleClose={() => setShowAddBudgetModal(false)}
          />
          <AddExpenseModal
            show={showAddExpenseModal}
            defaultBudgetID={addExpenseModalBudgetId}
            handleClose={() => setShowAddExpenseModal(false)}
          />
          <ViewExpensesModal
            budgetId={viewExpensesModalBudgetId}
            handleClose={() => setViewExpensesModalBudgetId()}
          />
          <AlertModal />
          </>
        ) 
        :
        (
          <>
            <AddSavingsAccountModal 
              show={addSavingsAccountModal}
              handleClose={() => setAddSavingsAccountModal(false)}
            />
            { Object.keys(savingAccount).length !== 0 && 
              <>
              <SavingsAccount 
                savingAccount={savingAccount}
                hasCardOptions={true}
                lang={lang}
                deleteSavingAccount={deleteSavingAccount}
                openAddDepositModal={openAddDepositModal}
                openViewDepositsModal={openViewDepositsModal}
              />
              <AddDepositModal 
                show={showaddDepositModal}
                savingAccountId={savingAccount.id}  
                handleClose={() => setShowAddDepositModal(false)}
              />
              <ViewDepositsModal 
                show={viewDepositsModal}
                savingAccount={savingAccount} 
                handleClose={() => setViewDepositsModal(false)}
              />
              </>
            }
          </>
        )
      }
    </main>
  );
};

export default View;
