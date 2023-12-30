import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../store/categories/categoriesSlise";
import {useEffect} from "react";

import {ApiTransaction} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import {
  selectFetchOneTransactionLoading,
  selectTransaction,
  selectUpdateTransactionLoading
} from "../../store/transactions/transactionsSlice";
import {fetchOneTransaction, updateTransaction} from "../../store/transactions/transactionThunks";

const EditTransaction = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const transaction = useAppSelector(selectTransaction);
  const fetchOneTransactionLoading = useAppSelector(selectFetchOneTransactionLoading);
  const updateTransactionLoading = useAppSelector(selectUpdateTransactionLoading);
  const categories = useAppSelector(selectCategories);


  useEffect(() => {
    dispatch(fetchOneTransaction(id));
  }, [dispatch, id]);

  const onSubmit = async (transaction: ApiTransaction) => {
    await dispatch(updateTransaction({id, transaction}));
    navigate('/');
  };

  let formSection = <Spinner/>;

  const existingCategory = transaction ? categories.find((category) => category.id === transaction.category) : undefined;

  const existingTransaction = transaction && existingCategory ? {
    ...transaction,
    category: existingCategory.name,
    amount: transaction.amount.toString(),
    type: existingCategory.type,
  } : undefined;

  if (!fetchOneTransactionLoading) {
    if (transaction) {
      formSection = (
          <TransactionForm
              isEdit
              onSubmit={onSubmit}
              existingTransaction={existingTransaction}
              isLoading={updateTransactionLoading}
          />
      );
    } else {
      formSection = <h4>Not found</h4>;
    }
  }

  return (
      <div className="row mt-2">
        <div className="col">
          {formSection}
        </div>
      </div>
  );
};

export default EditTransaction;