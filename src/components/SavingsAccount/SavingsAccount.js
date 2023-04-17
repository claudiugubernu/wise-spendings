import { currencyFormatter } from "../../utils/utils";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useState } from "react";
import { budgetIcons } from "../../static/budgetIcons";
import {ImBin} from 'react-icons/im';

const SavingsAccount = ({
  currency,
  name,
  green,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  lang,
  isDark,
  hasCardOptions,
  savingAccount,
  deleteSavingAccount
}) => {
  const classNames = [];
  let amount = 0;
  // Set clases for cardBackground
  if (amount > savingAccount.max) {
    classNames.push("bg-opacity-10 c-white");
  } else if (green) {
    isDark
      ? classNames.push("bg-primary c-white")
      : classNames.push("bg-primary");
  }

  // Remaining Budget Display
  const [showRemaningBudget, setShowRemainingBudget] = useState(false);

  // Set Icon 
  const icon = budgetIcons.map(icon => icon.id === savingAccount.icon && <div key={icon.id} className="icon-card">{icon.icon}</div>)

  const overBudgetTotal = amount - savingAccount.max;
  const remainingBudget = savingAccount.max - amount;

  const onShowRemaningBudget = () => {
    // Show remaining budget
    setShowRemainingBudget((prev) => !prev)
    // Hide it after 1500ms
    setTimeout(() => {
      setShowRemainingBudget((prev) => !prev)
    }, 1500)
  }

  const [showCardOptions, setShowCardOptions] = useState(false);

  const onShowCardOptions = (e, budgetId) => {
    if(e.currentTarget.id === budgetId) {
      setShowCardOptions((prev) => !prev);
    }
  }

  return (
    <div className={`card ${classNames.join(" ")}`}>
      <div className="card-header flex flex-column v-gap-10">
        <div className="flex justify-between align-items-start">
           <div className="flex flex-wrap justify-between">
            <div className="flex gap-10 align-items-center fs-20 w-100">
              {icon}
              <p className="title fs-20 m-0 tt-capitalize">{savingAccount.name}</p>
            </div>
            <div className="card-amounts flex" onClick={onShowRemaningBudget}>
            {
              showRemaningBudget && !(amount > savingAccount.max) && savingAccount.max ? (
                <p className="m-0 fs-20">Remaining budget: {currencyFormatter(currency).format(remainingBudget)}</p>
              ) : (
                <>
                <p className="m-0 fs-20">
                  {currencyFormatter(currency).format(amount)}
                </p>
                {savingAccount.max && (
                  <span className="max-amount">
                    {" "}
                    / {currencyFormatter(currency).format(savingAccount.max)}{" "}
                  </span>
                )}
                </>
              )
            }
          </div>
        </div>
        {
          hasCardOptions &&
          <div className="card-options" id={savingAccount.id} onClick={(e) => onShowCardOptions(e, savingAccount.id)}>
            <span>...</span>
          </div>
        }
        {
          showCardOptions &&
          <div className="card-options-modal">
            <div
              className="ml-auto option delete"
              id={savingAccount.id}
              onClick={(e) => {
                deleteSavingAccount(savingAccount);
                onShowCardOptions(e, savingAccount.id);
              }}
            >
              <ImBin />
              <p>{langTerms(lang, "Delete")}</p>
            </div>
          </div>
        }
        </div>
        <div className="budget-alert">
          { 
            amount > savingAccount.max && (
              <p className="m-0 fw-bold tt-uppercase">⚠️ {langTerms(lang, "Over budget by")} {currencyFormatter(currency).format(overBudgetTotal)}</p>
            )
          }
        </div>
      </div>
      <p>Interest {savingAccount.interest}%p.a.</p>
    </div>
  );
};

const calculateProgress = (amount, max) => {
  return (amount / max) * 100;
};

const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "bg-safe";
  if (ratio < 0.75) return "bg-warning";
  return "bg-danger";
};

export default SavingsAccount;
