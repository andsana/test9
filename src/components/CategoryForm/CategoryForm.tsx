import {ApiCategory} from '../../types';
import React, {useState} from 'react';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState = {
  type: '',
  name: ''
};

interface Props {
  onSubmit: (category: ApiCategory) => void;
  existingCategory?: ApiCategory;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CategoryForm: React.FC<Props> = ({
  onSubmit,
  existingCategory = initialState,
  isEdit = false,
  isLoading = false
}) => {
  const [category, setCategory] = useState<ApiCategory>(existingCategory);

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit(category);
  };

  return (
    <form onSubmit={onFormSubmit} style={{maxWidth: '500px'}}>
      <h4>{isEdit ? 'Edit category' : 'Add new category'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          required
          id="type"
          className="form-control"
          value={category.type}
          onChange={changeCategory}
        >
          <option value="">Select a type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="name">Category</label>
        <select
          name="name"
          required
          id="name"
          className="form-control"
          value={category.name}
          onChange={changeCategory}
        >
          <option value="">Select a category</option>
          <option value="Food">Food</option>
          <option value="Salary">Salary</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success" disabled={isLoading}>
        {isLoading && <ButtonSpinner/>}
        Save
      </button>
    </form>
  );
};

export default CategoryForm;