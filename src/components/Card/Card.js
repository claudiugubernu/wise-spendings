import { currencyFormatter } from "../../utils/utils";
import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";
import { langTerms } from "../../static/langTerms";

const Card = ({
  currency,
  name,
  amount,
  max,
  green,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  lang,
  isDark,
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

  const overBudgetTotal = amount - max;

  return (
    <div className={`card ${classNames.join(" ")}`}>
      <div className="card-header flex flex-column v-gap-10">
        <div className="flex justify-between">
          <p className="title fs-20 m-0 tt-capitalize">{name}</p>
          <div className="card-amounts flex">
            <p className="m-0 fs-20">
              {currencyFormatter(currency).format(amount)}
            </p>
            {max && (
              <span className="max-amount">
                {" "}
                / {currencyFormatter(currency).format(max)}{" "}
              </span>
            )}
          </div>
        </div>
        <div className="budget-alert">
          { 
            amount > max && (
              <p className="m-0 fw-bold tt-uppercase">⚠️ Over budget by {currencyFormatter(currency).format(overBudgetTotal)}</p>
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
            <div onClick={onViewExpensesClick}>
              <Button
                content={langTerms(lang, "View Expenses")}
                variant={"btn-outline-primary m-w-100"}
              />
            </div>
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
