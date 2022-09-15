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
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (green) {
    isDark
      ? classNames.push("bg-primary c-white")
      : classNames.push("bg-primary");
  }

  return (
    <div className={`card ${classNames.join(" ")}`}>
      <div className="card-header flex justify-between">
        <p className="title fs-20 mb-10 m-mb-10 mt-0">{name}</p>
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
      <div className="card-body">
        {max && (
          <ProgressBar
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <div className="flex m-flex-column gap-20 m-gap-0 m-v-gap-20 mt-30">
            <div onClick={() => onAddExpenseClick(true)}>
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

const getProgressBarVariant = (amount, max) => {
  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};

export default Card;
