import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ApiTransaction} from '../../types';
import {selectCreateTransactionLoading} from '../../store/transactions/transactionsSlice';
import {createTransaction} from '../../store/transactions/transactionThunks';
import TransactionForm from '../../components/TransactionForm/TransactionForm';
import {fetchCategories} from '../../store/categories/categoriesThunks';

const NewTransaction: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const creatingTransactionLoading = useAppSelector(selectCreateTransactionLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (transaction: ApiTransaction) => {
    await dispatch(createTransaction(transaction));
    navigate('/');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <TransactionForm onSubmit={onSubmit} isLoading={creatingTransactionLoading}/>
      </div>
    </div>
  );
};

export default NewTransaction;