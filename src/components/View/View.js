import { useState } from "react";
import { currencyFormatter } from "../../utils/utils";
import { useAppContext } from "../../context/AppContext";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import AddBudgetModal from "../AddBudgetModal/AddBudgetModal";
import AddExpenseModal from "../AddExpenseModal/AddExpenseModal";

const View = () => {
  const { currency, lang } = useAppContext();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseMOdalBudgetId, setAddExpenseModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <main className="site-width h-100">
      <div className="view-controlls flex justify-between align-items-center mv-20 m-mv-20">
        <div onClick={() => setShowAddBudgetModal(true)}>
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
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetID={addExpenseMOdalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />

      <div>{currencyFormatter(currency).format(400)}</div>
    </main>
  );
};

export default View;
