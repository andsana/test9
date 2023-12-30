import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories, selectFetchCategoriesLoading} from '../../store/categoriesSlise';
import Spinner from '../../components/Spinner/Spinner';
import CategoryItem from './CategoryItem';
import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoriesThunks';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchCategoriesLoading = useAppSelector(selectFetchCategoriesLoading);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <>
      <div className="row">
        <div className="col text-end">
          <Link to="/new-category" className="btn btn-primary">Add new Category</Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {fetchCategoriesLoading && <Spinner/>}
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;