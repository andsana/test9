import React, {useState} from 'react';
import {ApiTransaction, TransactionMutation} from '../../types';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {useAppSelector} from "../../app/hooks";
import {selectCategories} from "../../store/categories/categoriesSlise";


const initialState = {
  type: '',
  category: '',
  amount: '',
  createdAt: '',
};

interface Props {
  onSubmit: (transaction: ApiTransaction) => void;
  existingTransaction?: TransactionMutation;
  isEdit?: boolean;
  isLoading?: boolean;
}

const TransactionForm: React.FC<Props> = ({
  onSubmit,
  existingTransaction = initialState,
  isEdit = false,
  isLoading = false
}) => {
  const categories = useAppSelector(selectCategories);
  const [transaction, setTransaction] = useState<TransactionMutation>(existingTransaction);
  const [selectedType, setSelectedType] = useState('');

  const categoriesArr = categories.filter((category) => category.type === selectedType);

  const changeTransaction = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (isLoading) return;
      const { category, amount } = transaction;
      const now = new Date();
      const createdAt = now.toISOString();

      const data = {
          category,
          amount: parseFloat(amount),
          createdAt,
      };
    onSubmit(data);
  };

  return (
    <form onSubmit={onFormSubmit} style={{maxWidth: '500px'}}>
      <h4>{isEdit ? 'Edit transaction' : 'Add new transaction'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          required
          id="type"
          className="form-control"
          value={transaction.type}
          onChange={(e) => {
            changeTransaction(e);
            setSelectedType(e.target.value);
          }}
        >
          <option value="">Select a type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          required
          id="category"
          className="form-control"
          value={transaction.category}
          onChange={changeTransaction}
        >
          <option value="">Select a category</option>
            {categoriesArr.map((category) => (
              <option key={category.id} value={category.id}>
                  {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="amount">Amount</label>
        <div className="input-group">
          <input
            type="number"
            name="amount"
            required
            id="amount"
            className="form-control"
            value={transaction.amount}
            onChange={changeTransaction}
          />
          <span className="input-group-text" id="basic-addon2">KGS</span>
        </div>
      </div>
      <button type="submit" className="btn btn-success" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        Save
      </button>
    </form>
  );
};

export default TransactionForm;