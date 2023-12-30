import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransaction, Transaction, TransactionsList} from '../../types';
import {AppDispatch} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createTransaction = createAsyncThunk<void, ApiTransaction, { dispatch: AppDispatch }>(
  'transactions/create',
  async (transaction, thunkAPI) => {
    await axiosApi.post('/transactions.json', transaction);
    await thunkAPI.dispatch(fetchTransactions());
  }
);

export const fetchTransactions = createAsyncThunk<Transaction[], undefined>(
  'transactions/fetchTransactions',
  async () => {
    const transactionsResponse = await axiosApi.get<TransactionsList | null>('/transactions.json');
    const transactions = transactionsResponse.data;

    let newTransactions: Transaction[] = [];

    if (transactions) {
      newTransactions = Object.keys(transactions).map((key) => {
        const transaction = transactions[key];
        return {
          ...transaction,
          id: key,
        };
      });
    }
    return newTransactions;
  }
);

export const fetchOneTransaction = createAsyncThunk<ApiTransaction, string>(
  'transactions/fetchOne',
  async (transactionId) => {
    const response = await axiosApi.get<ApiTransaction | null>(`/transactions/${transactionId}.json`);
    const transaction = response.data;

    if (transaction === null) {
      throw new Error('Not found');
    }
    return transaction;
  }
);

interface UpdateTransactionParams {
  id: string,
  transaction: ApiTransaction,
}

export const updateTransaction = createAsyncThunk<void, UpdateTransactionParams, { dispatch: AppDispatch }>(
  'transactions/update',
  async ({id, transaction}, thunkAPI) => {
    await axiosApi.put(`/transactions/${id}.json`, transaction);
    await thunkAPI.dispatch(fetchTransactions());
  }
);

export const deleteTransaction = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'transactions/delete',
  async (transactionId, thunkAPI) => {
    await axiosApi.delete(`/transactions/${transactionId}.json`);
    await thunkAPI.dispatch(fetchTransactions());
  }
);