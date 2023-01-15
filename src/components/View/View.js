import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import AddBudgetModal from "../AddBudgetModal/AddBudgetModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";
import CardGrid from "../CardGrid/CardGrid";
import ViewExpensesModal from "../ViewExpensesModal/ViewExpensesModal";
import Modal from "../Modal/Modal";

const View = () => {
  const { lang } = useAppContext();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <main className="site-width h-100">
      <div className="view-controlls flex flex-wrap m-justify-between align-items-center mv-50 m-mv-50">
        <div
          className="mr-50 m-mr-0"
          onClick={() => setShowAddBudgetModal(true)}
        >
          <Button
            content={langTerms(lang, "Add Budget")}
            variant={"btn-primary"}
          />
        </div>
        <div onClick={openAddExpenseModal}>
          <Button
            content={langTerms(lang, "Add Expense")}
            variant={"btn-outline-primary"}
          />
        </div>
      </div>
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
      <Modal modalHeader={'Alert'} modalBodyText={'Your budget period has come to an end. How would you like to proceed ?'} buttons={true}/>
    </main>
  );
};

export default View;
