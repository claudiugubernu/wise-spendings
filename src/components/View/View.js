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

const View = () => {
  const { lang, toggleView, savingAccount, deleteSavingAccount } = useAppContext();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addSavingsAccountModal, setAddSavingsAccountModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <main className="site-width h-100">
      <div className="view-controls flex flex-wrap justify-between align-items-center mv-50 m-mv-50">
        {
          toggleView === 'budget' &&
          <div
            className="mr-50 m-mr-0"
            onClick={() => setShowAddBudgetModal(true)}
          >
            <Button
              content={langTerms(lang, "Add Budget")}
              variant={"btn-primary"}
            />
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
              <SavingsAccount 
                savingAccount={savingAccount}       
                hasCardOptions={true}
                lang={lang}
                deleteSavingAccount={deleteSavingAccount}
              />
            }
          </>
        )
      }
    </main>
  );
};

export default View;
