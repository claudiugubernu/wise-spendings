import { currencyFormatter } from '../../utils/utils';
import ProgressBar from '../ProgressBar/ProgressBar';
import Button from '../Button/Button';
import { langTerms } from '../../static/langTerms';
import { useState } from 'react';
import { budgetIcons } from '../../static/budgetIcons';
import { ImBin } from 'react-icons/im';
import { useAppContext } from '../../context/AppContext';

const SavingsAccount = ({
  green,
  hideButtons,
  openAddDepositModal,
  lang,
  isDark,
  hasCardOptions,
  savingAccount,
  deleteSavingAccount,
  openViewDepositsModal,
}) => {
  const { getDeposits, currency, getWithdrawls } = useAppContext();
  const classNames = [];
  const deposits = getDeposits(savingAccount.id).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  const withdrawls = getWithdrawls(savingAccount.id).reduce(
    (total, withdrawl) => total + withdrawl.amount,
    0
  );
  const amount = deposits - withdrawls;

  // Set clases for cardBackground
  if (amount > savingAccount.max) {
    classNames.push('bg-opacity-10 c-white');
  } else if (green) {
    isDark
      ? classNames.push('bg-primary c-white')
      : classNames.push('bg-primary');
  }

  // Remaining Target Display
  const [showRemaningTarget, setShowRemainingTarget] = useState(false);

  // Set Icon
  const icon = budgetIcons.map(
    (icon) =>
      icon.id === savingAccount.icon && (
        <div
          key={icon.id}
          className='icon-card'>
          {icon.icon}
        </div>
      )
  );

  const remainingTarget = savingAccount.max - amount;

  const onShowRemaningTarget = () => {
    // Show remaining Target
    setShowRemainingTarget((prev) => !prev);
    // Hide it after 1500ms
    setTimeout(() => {
      setShowRemainingTarget((prev) => !prev);
    }, 1500);
  };

  const [showCardOptions, setShowCardOptions] = useState(false);

  const onShowCardOptions = (e, budgetId) => {
    if (e.currentTarget.id === budgetId) {
      setShowCardOptions((prev) => !prev);
    }
  };

  return (
    <div className={`card ${classNames.join(' ')}`}>
      <div className='card-header flex flex-column v-gap-10'>
        <div className='flex justify-between align-items-start'>
          <div className='flex flex-wrap justify-between'>
            <div className='flex gap-10 align-items-center fs-20 w-100'>
              {icon}
              <p className='title fs-20 m-0 tt-capitalize'>
                {savingAccount.name}
              </p>
            </div>
            <div
              className='card-amounts flex'
              onClick={onShowRemaningTarget}>
              {showRemaningTarget &&
              !(amount > savingAccount.max) &&
              savingAccount.max ? (
                <p className='m-0 fs-20'>
                  Remaining target:{' '}
                  {currencyFormatter(currency).format(remainingTarget)}
                </p>
              ) : (
                <>
                  <p className='m-0 fs-20'>
                    {currencyFormatter(currency).format(amount)}
                  </p>
                  {savingAccount.max && (
                    <span className='max-amount'>
                      {' '}
                      / {currencyFormatter(currency).format(
                        savingAccount.max
                      )}{' '}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
          {hasCardOptions && (
            <div
              className='card-options'
              id={savingAccount.id}
              onClick={(e) => onShowCardOptions(e, savingAccount.id)}>
              <span>...</span>
            </div>
          )}
          {showCardOptions && (
            <div className='card-options-modal'>
              <div
                className='ml-auto option delete'
                id={savingAccount.id}
                onClick={(e) => {
                  deleteSavingAccount(savingAccount);
                  onShowCardOptions(e, savingAccount.id);
                }}>
                <ImBin />
                <p>{langTerms(lang, 'Close Account')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className='fs-12 m-0'>
        {langTerms(lang, 'Interest')} {savingAccount.interest}% p.a.
      </p>
      <div className='card-body'>
        {savingAccount.max && (
          <ProgressBar
            variant={getProgressBarVariant(amount, savingAccount.max)}
            progress={calculateProgress(amount, savingAccount.max)}
          />
        )}
        {!hideButtons && (
          <div className='flex m-flex-column gap-20 m-gap-0 m-v-gap-20 mt-30'>
            <div onClick={openAddDepositModal}>
              <Button
                content={langTerms(lang, 'Deposit')}
                variant={'btn-primary m-w-100'}
              />
            </div>
            {amount >= 1 && (
              <div onClick={openViewDepositsModal}>
                <Button
                  content={langTerms(lang, 'View Deposits')}
                  variant={'btn-outline-primary m-w-100'}
                />
              </div>
            )}
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
  if (ratio < 0.5) return 'bg-danger';
  if (ratio < 0.75) return 'bg-warning';
  return 'bg-safe';
};

export default SavingsAccount;
