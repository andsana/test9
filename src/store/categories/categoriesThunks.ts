import {ApiCategory, CategoriesList, Category} from '../../types';
import {AppDispatch} from '../../app/store';
import axiosApi from '../../axiosApi';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const createCategory = createAsyncThunk<void, ApiCategory, { dispatch: AppDispatch }>(
  'categories/create',
  async (category, thunkAPI) => {
    await axiosApi.post('/categories.json', category);
    await thunkAPI.dispatch(fetchCategories());
  }
);

export const fetchCategories = createAsyncThunk<Category[], undefined>(
  'categories/fetchCategories',
  async () => {
    const categoriesResponse = await axiosApi.get<CategoriesList | null>('/categories.json');
    const categories = categoriesResponse.data;

    let newCategories: Category[] = [];

    if (categories) {
      newCategories = Object.keys(categories).map((key) => {
        const category = categories[key];
        return {
          ...category,
          id: key,
        };
      });
    }
    return newCategories;
  }
);

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOne',
  async (categoryId) => {
    const response = await axiosApi.get<ApiCategory | null>(`/categories/${categoryId}.json`);
    const category = response.data;

    if (category === null) {
      throw new Error('Not found');
    }
    return category;
  }
);

interface UpdateCategoryParams {
  id: string,
  category: ApiCategory,
}

export const updateCategory = createAsyncThunk<void, UpdateCategoryParams, { dispatch: AppDispatch }>(
  'categories/update',
  async ({id, category}, thunkAPI) => {
    await axiosApi.put(`/categories/${id}.json`, category);
    await thunkAPI.dispatch(fetchCategories());
  }
);

export const deleteCategory = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'categories/delete',
  async (categoryId, thunkAPI) => {
    await axiosApi.delete(`/categories/${categoryId}.json`);
    await thunkAPI.dispatch(fetchCategories());
  }
);