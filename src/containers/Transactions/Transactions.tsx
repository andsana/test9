import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchTransactionsLoading, selectTransactions} from '../../store/transactions/transactionsSlice';
import {selectCategories} from '../../store/categories/categoriesSlise';
import {useEffect} from 'react';
import {fetchTransactions} from '../../store/transactions/transactionThunks';
import {fetchCategories} from '../../store/categories/categoriesThunks';
import TransactionItem from './TransactionItem';
import Spinner from '../../components/Spinner/Spinner';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const fetchTransactionsLoading = useAppSelector(selectFetchTransactionsLoading);
  const categories = useAppSelector(selectCategories);


  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);


  const list = transactions.map((transaction) => {
    const category = categories.find((category) => transaction.category === category.id);
    return category ? (
      <TransactionItem key={transaction.id} transaction={transaction} category={category}/>
    ) : null;
  });

    const orderTotal = transactions.reduce((acc, transaction) => {
      acc += transaction.amount;
      return acc;
    }, 0);

  return (
    <>
      <h4>Total: {orderTotal} KGS</h4>
      <div className="row">
        <div className="col">
          {fetchTransactionsLoading && <Spinner/>}
          {list.length ? list : <h4>Not Found</h4>}
        </div>
      </div>
    </>
  );
};

export default Transactions;
