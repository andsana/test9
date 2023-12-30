import {ApiTransaction, Transaction} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {
    createTransaction,
    deleteTransaction,
    fetchOneTransaction,
    fetchTransactions,
    updateTransaction
} from "./transactionThunks";

interface TransactionsState {
  items: Transaction[];
  transaction: ApiTransaction | null;
  fetchTransactionsLoading: boolean;
  fetchOneTransactionLoading: boolean;
  createTransactionLoading: boolean;
  updateTransactionLoading: boolean;
  deleteTransactionLoading: false | string;
}

const initialState: TransactionsState = {
  items: [],
  transaction: null,
  fetchTransactionsLoading: false,
  fetchOneTransactionLoading: false,
  createTransactionLoading: false,
  updateTransactionLoading: false,
  deleteTransactionLoading: false,
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.fetchTransactionsLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, {payload: items}) => {
      state.fetchTransactionsLoading = false;
      state.items = items;
    });
      builder.addCase(fetchTransactions.rejected, (state) => {
      state.fetchTransactionsLoading = false;
    });

    builder.addCase(fetchOneTransaction.pending, (state) => {
      state.fetchOneTransactionLoading = true;
    });
    builder.addCase(fetchOneTransaction.fulfilled, (state, {payload: transaction}) => {
      state.fetchOneTransactionLoading = false;
      state.transaction = transaction;
    });
    builder.addCase(fetchOneTransaction.rejected, (state) => {
      state.fetchOneTransactionLoading = false;
    });

    builder.addCase(createTransaction.pending, (state) => {
      state.createTransactionLoading = true;
    });
    builder.addCase(createTransaction.fulfilled, (state) => {
      state.createTransactionLoading = false;
    });
    builder.addCase(createTransaction.rejected, (state) => {
      state.createTransactionLoading = false;
    });

    builder.addCase(updateTransaction.pending, (state) => {
      state.updateTransactionLoading = true;
    });
    builder.addCase(updateTransaction.fulfilled, (state) => {
      state.updateTransactionLoading = false;
    });
    builder.addCase(updateTransaction.rejected, (state) => {
      state.updateTransactionLoading = false;
    });

    builder.addCase(deleteTransaction.pending, (state, {meta}) => {
      state.deleteTransactionLoading = meta.arg;
    });
    builder.addCase(deleteTransaction.fulfilled, (state) => {
      state.deleteTransactionLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, (state) => {
      state.deleteTransactionLoading = false;
    });
  }
});

export const transactionsReducer = transactionsSlice.reducer;
export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransaction = (state: RootState) => state.transactions.transaction;
export const selectFetchTransactionsLoading = (state: RootState) => state.transactions.fetchTransactionsLoading;
export const selectFetchOneTransactionLoading = (state: RootState) => state.transactions.fetchOneTransactionLoading;
export const selectCreateTransactionLoading = (state: RootState) => state.transactions.createTransactionLoading;
export const selectUpdateTransactionLoading = (state: RootState) => state.transactions.updateTransactionLoading;
export const selectDeleteTransactionLoading = (state: RootState) => state.transactions.deleteTransactionLoading;