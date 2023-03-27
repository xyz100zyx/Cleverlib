import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookService } from '../../../services/book-service';
import { FetchedBook, FetchedBooks } from '../../../types/data.types';
import {setAlertFounder} from "../popup/popup-slice";
import {AlertFounders} from "../../../utils/constants";

export const fetchBooks = createAsyncThunk<FetchedBooks[], undefined, { rejectValue: string }>(
  'books/fetchBooks',
  async (_, { rejectWithValue , dispatch}) => {
    try {
        dispatch(setAlertFounder(AlertFounders.BOOKS))
      return await BookService.getBooks();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBookById = createAsyncThunk<FetchedBook, number, { rejectValue: string }>(
  'books/fetchBookById',
  async (id: number, { rejectWithValue }) => {
    try {
      return await BookService.getBookById(id);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
