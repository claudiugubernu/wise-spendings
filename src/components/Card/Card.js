import { currencyFormatter } from "../../utils/utils";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";
import { useState } from "react";
import {ImBin} from 'react-icons/im';

const Card = ({
  currency,
  name,
  icon,
  amount,
  max,
  green,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  lang,
  isDark,
  hasCardOptions,
  budget,
  deleteBudget
}) => {
  const classNames = [];
  // Set clases for cardBackground
  if (amount > max) {
    classNames.push("bg-opacity-10 c-white");
  } else if (green) {
    isDark
      ? classNames.push("bg-primary c-white")
      : classNames.push("bg-primary");
  }

  // Remaining Budget Display
  const [showRemaningBudget, setShowRemainingBudget] = useState(false);

  const overBudgetTotal = amount - max;
  const remainingBudget = max - amount;

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
            <p className="title fs-20 m-0 tt-capitalize">{name}</p>
          </div>
          <div className="card-amounts flex" onClick={onShowRemaningBudget}>
            {
              showRemaningBudget && !(amount > max) && max ? (
                <p className="m-0 fs-20">Remaining budget: {currencyFormatter(currency).format(remainingBudget)}</p>
              ) : (
                <>
                <p className="m-0 fs-20">
                  {currencyFormatter(currency).format(amount)}
                </p>
                {max && (
                  <span className="max-amount">
                    {" "}
                    / {currencyFormatter(currency).format(max)}{" "}
                  </span>
                )}
                </>
              )
            }
          </div>
        </div>
        {
          hasCardOptions &&
          <div className="card-options" id={budget.id} onClick={(e) => onShowCardOptions(e, budget.id)}>
            <span>...</span>
          </div>
        }
        {
          showCardOptions &&
          <div className="card-options-modal">
            <div
              className="ml-auto option delete"
              id={budget.id}
              onClick={(e) => {
                deleteBudget(budget);
                onShowCardOptions(e, budget.id);
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
            amount > max && (
              <p className="m-0 fw-bold tt-uppercase">⚠️ {langTerms(lang, "Over budget by")} {currencyFormatter(currency).format(overBudgetTotal)}</p>
            )
          }
        </div>
      </div>
      <div className="card-body">
        {max && (
          <ProgressBar
            variant={getProgressBarVariant(amount, max)}
            progress={calculateProgress(amount, max)}
          />
        )}
        {!hideButtons && (
          <div className="flex m-flex-column gap-20 m-gap-0 m-v-gap-20 mt-30">
            <div onClick={onAddExpenseClick}>
              <Button
                content={langTerms(lang, "Add Expense")}
                variant={"btn-primary m-w-100"}
              />
            </div>
            {
              amount >= 1 &&
              <div onClick={onViewExpensesClick}>
                <Button
                  content={langTerms(lang, "View Expenses")}
                  variant={"btn-outline-primary m-w-100"}
                />
              </div>
            }
          </div>
        )}
      </div>
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

export default Card;
