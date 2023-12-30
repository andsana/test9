import React from 'react';
import dayjs from "dayjs";
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteTransaction} from "../../store/transactions/transactionThunks";
import {selectDeleteTransactionLoading} from "../../store/transactions/transactionsSlice";
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import {Category, Transaction} from '../../types';

interface Props {
  transaction: Transaction;
  category: Category;
}

const TransactionItem: React.FC<Props> = ({transaction, category}) => {
  const dispatch = useAppDispatch();
  const deleteTransactionLoading = useAppSelector(selectDeleteTransactionLoading);

  return (
    <div className="card card-body mb-3" style={{maxWidth: '800px'}}>
      <div className="row align-items-center">
        <div className="col">
          <span>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
        </div>
        <div className="col">
          <span>{category.name}</span>
        </div>
        <div className="col text-end">
          <span className="me-3" style={{color: category.type === 'income' ? "green" : "red"}}>
            {category.type === 'income' ? transaction.amount : -transaction.amount} KGS
          </span>
          <Link className="btn btn-primary me-3" to={'/update-category/' + transaction.id}>Edit</Link>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteTransaction(transaction.id))}
            disabled={deleteTransactionLoading ? deleteTransactionLoading === transaction.id : false}
          >
            {deleteTransactionLoading && deleteTransactionLoading === transaction.id && (<ButtonSpinner/>)}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;