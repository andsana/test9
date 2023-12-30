import {ApiCategory, Category} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory, deleteCategory, fetchCategories, fetchOneCategory, updateCategory} from "./categoriesThunks";
import {RootState} from "../app/store";

interface CategoriesState {
    items: Category[];
    category: ApiCategory | null;
    fetchCategoriesLoading: boolean;
    fetchOneCategoryLoading: boolean;
    createCategoryLoading: boolean;
    updateCategoryLoading: boolean;
    deleteCategoryLoading: false | string;
}

const initialState: CategoriesState = {
    items: [],
    category: null,
    fetchCategoriesLoading: false,
    fetchOneCategoryLoading: false,
    createCategoryLoading: false,
    updateCategoryLoading: false,
    deleteCategoryLoading: false,
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.fetchCategoriesLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, {payload: items}) => {
            state.fetchCategoriesLoading = false;
            state.items = items;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.fetchCategoriesLoading = false;
        });

        builder.addCase(fetchOneCategory.pending, (state) => {
            state.fetchOneCategoryLoading = true;
        });
        builder.addCase(fetchOneCategory.fulfilled, (state, {payload: category}) => {
            state.fetchOneCategoryLoading = false;
            state.category = category;
        });
        builder.addCase(fetchOneCategory.rejected, (state) => {
            state.fetchOneCategoryLoading = false;
        });

        builder.addCase(createCategory.pending, (state) => {
            state.createCategoryLoading = true;
        });
        builder.addCase(createCategory.fulfilled, (state) => {
            state.createCategoryLoading = false;
        });
        builder.addCase(createCategory.rejected, (state) => {
            state.createCategoryLoading = false;
        });

        builder.addCase(updateCategory.pending, (state) => {
            state.updateCategoryLoading = true;
        });
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.updateCategoryLoading = false;
        });
        builder.addCase(updateCategory.rejected, (state) => {
            state.updateCategoryLoading = false;
        });

        builder.addCase(deleteCategory.pending, (state, {meta}) => {
            state.deleteCategoryLoading = meta.arg;
        });
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.deleteCategoryLoading = false;
        });
        builder.addCase(deleteCategory.rejected, (state) => {
            state.deleteCategoryLoading = false;
        });
    }
});

export const categoriesReducer = categoriesSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategory = (state: RootState) => state.categories.category;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchCategoriesLoading;
export const selectFetchOneCategoryLoading = (state: RootState) => state.categories.fetchOneCategoryLoading;
export const selectCreateCategoryLoading = (state: RootState) => state.categories.createCategoryLoading;
export const selectUpdateCategoryLoading = (state: RootState) => state.categories.updateCategoryLoading;
export const selectDeleteCategoryLoading = (state: RootState) => state.categories.deleteCategoryLoading;