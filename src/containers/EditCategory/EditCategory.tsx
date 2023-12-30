import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  selectCategory,
  selectFetchOneCategoryLoading,
  selectUpdateCategoryLoading
} from '../../store/categoriesSlise';
import {useEffect} from 'react';
import {fetchOneCategory, updateCategory} from '../../store/categoriesThunks';
import Spinner from '../../components/Spinner/Spinner';
import CategoryForm from '../../components/CategoryForm';
import {ApiCategory} from '../../types';

const EditCategory = () => {
  const {id} = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const fetchOneCategoryLoading = useAppSelector(selectFetchOneCategoryLoading);
  const updateCategoryLoading = useAppSelector(selectUpdateCategoryLoading);

  useEffect(() => {
    dispatch(fetchOneCategory(id));
  }, [dispatch, id]);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(updateCategory({id, category}));
    navigate('/categories');
  };

  let formSection = <Spinner/>;

  const existingCategory = category ? category : undefined;

  if (!fetchOneCategoryLoading) {
    if (category) {
      formSection = (
        <CategoryForm
          isEdit
          onSubmit={onSubmit}
          existingCategory={existingCategory}
          isLoading={updateCategoryLoading}
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

export default EditCategory;