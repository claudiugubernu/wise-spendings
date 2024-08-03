import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { currencyFormatter, sortDescending } from '../../utils/utils';
import { langTerms } from '../../static/langTerms';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import ViewWithdrawalForm from '../ViewWithdrawalForm/ViewWithdrawalForm';

const ViewDepositsModal = ({ show, savingAccount, handleClose }) => {
  const { deposits, deleteSavingAccount, withdrawls, currency, lang } =
    useAppContext();
  const [showForm, SetShowForm] = useState(false);
  const depositsWithdrawalls = deposits.concat(withdrawls);
  const sortedDeposits = sortDescending(depositsWithdrawalls);

  const totalDepositsAmount = deposits.reduce(
    (total, withdrawl) => total + withdrawl.amount,
    0
  );
  const totalWithdrawalls = withdrawls.reduce(
    (total, withdrawl) => total + withdrawl.amount,
    0
  );
  const total = totalDepositsAmount - totalWithdrawalls;

  return (
    <>
      <div className={show ? 'modal expenses show' : 'modal expenses'}>
        <div className='modal-header flex justify-between align-items-center mv-20'>
          <label>
            {langTerms(lang, 'Deposits')} - {savingAccount?.name} -{' '}
            {currencyFormatter(currency).format(total)}
          </label>
          <IoCloseCircleOutline onClick={handleClose} />
        </div>
        <div className='modal-body'>
          {sortedDeposits.map((deposit) => (
            <div
              className='grid align-items-center mv-20 m-mv-20'
              key={deposit.id}>
              <p className='m-0'>
                {new Date(deposit.date).toLocaleDateString('en-GB')}
              </p>
              {deposit.isWithdrawl ? (
                <p className='expense-amount c-danger'>
                  -{currencyFormatter(currency).format(deposit.amount)}
                </p>
              ) : (
                <p className='expense-amount c-success'>
                  +{currencyFormatter(currency).format(deposit.amount)}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className='modal-footer flex mt-10 pt-20 pb-10'>
          <div
            onClick={() => {
              SetShowForm(true);
            }}>
            <Button
              content={langTerms(lang, 'Withdrawal')}
              variant='btn-outline'
            />
          </div>
          <div
            className='ml-auto'
            onClick={() => {
              deleteSavingAccount(deposits);
              handleClose();
            }}>
            <Button
              content={langTerms(lang, 'Delete')}
              variant='btn-outline-danger'
            />
          </div>
        </div>
      </div>
      <div
        className={show ? 'overlay active' : 'overlay'}
        onClick={handleClose}></div>
      <ViewWithdrawalForm
        savingAccountId={savingAccount.id}
        handleClose={() => SetShowForm(false)}
        show={showForm}
      />
    </>
  );
};

export default ViewDepositsModal;
