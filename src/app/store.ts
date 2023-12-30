import {configureStore} from '@reduxjs/toolkit';
import {categoriesReducer} from "../store/categories/categoriesSlise";
import {transactionsReducer} from "../store/transactions/transactionsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;