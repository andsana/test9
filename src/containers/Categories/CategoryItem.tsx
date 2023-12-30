import {Category} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectDeleteCategoryLoading} from '../../store/categories/categoriesSlise';
import {Link} from 'react-router-dom';
import {deleteCategory} from '../../store/categories/categoriesThunks';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import React from 'react';

interface Props {
  category: Category;
}

const CategoryItem: React.FC<Props> = ({category}) => {
  const dispatch = useAppDispatch();
  const deleteCategoryLoading = useAppSelector(selectDeleteCategoryLoading);

  return (
    <div className="card card-body mb-3" style={{maxWidth: '700px'}}>
      <div className="row align-items-center">
        <div className="col">
          <span>{category.name}</span>
        </div>
        <div className="col text-end">
          <span className="me-3">{category.type}</span>
          <Link className="btn btn-primary me-3" to={'/update-category/' + category.id}>Edit</Link>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteCategory(category.id))}
            disabled={deleteCategoryLoading ? deleteCategoryLoading === category.id : false}
          >
            {deleteCategoryLoading && deleteCategoryLoading === category.id && (<ButtonSpinner/>)}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
