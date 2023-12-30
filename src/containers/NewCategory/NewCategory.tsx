import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {ApiCategory} from '../../types';
import {createCategory} from '../../store/categoriesThunks';
import CategoryForm from '../../components/CategoryForm';
import {selectCreateCategoryLoading} from '../../store/categoriesSlise';

const NewCategory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const creatingLoading = useAppSelector(selectCreateCategoryLoading);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    navigate('/categories');
  };

  return (
    <div className="row mt-2">
      <div className="col">
        <CategoryForm onSubmit={onSubmit} isLoading={creatingLoading}/>
      </div>
    </div>
  );
};

export default NewCategory;