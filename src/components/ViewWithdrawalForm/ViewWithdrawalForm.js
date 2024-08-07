import { useRef, useState } from 'react';
import { formatDate } from '../../utils/utils';
import { useAppContext } from '../../context/AppContext';
import { langTerms } from '../../static/langTerms';
import { IoCloseCircleOutline } from 'react-icons/io5';
import Button from '../Button/Button';

const ViewWithdrawalForm = ({
  show,
  handleClose,
  savingAccountId,
  totalSavingsAmount,
}) => {
  const { withdrawSavigns, lang } = useAppContext();

  const formRef = useRef();
  const amountRef = useRef();
  const todayDate = formatDate(new Date(), 'yyyy-mm-dd');
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amountRef.current.value > totalSavingsAmount) {
      setError('Amount exceeds total savings amount');
      setHasError(true);
      return;
    } else {
      withdrawSavigns({
        amount: parseFloat(amountRef.current.value),
        date: todayDate,
        savingsId: savingAccountId,
      });
      formRef.current.reset();
      handleClose();
      setHasError(false);
      setError('');
    }
  };

  return (
    <>
      <div className={show ? 'modal show' : 'modal'}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}>
          <div className='modal-header flex justify-between align-items-center mv-20'>
            <label className='fs-30'>{langTerms(lang, 'Withdrawal')}</label>
            <IoCloseCircleOutline onClick={handleClose} />
          </div>
          <div className='modal-body'>
            <div className='form-row mb-20 flex flex-column v-gap-20'>
              <label htmlFor='amount'>{langTerms(lang, 'Amount')}</label>
              <input
                type='number'
                id='amount'
                ref={amountRef}
                required
                min={0}
                step={0.01}
              />
            </div>
            {hasError && (
              <div className='form-row mb-20'>
                <p className='c-danger'>{error}</p>
              </div>
            )}
            <div className='flex justify-end mt-50'>
              <Button
                type={'submit'}
                content={langTerms(lang, 'Withdrawal')}
                variant={'btn-primary'}
              />
            </div>
          </div>
        </form>
      </div>
      <div
        className={show ? 'overlay active' : 'overlay'}
        onClick={handleClose}></div>
    </>
  );
};

export default ViewWithdrawalForm;
