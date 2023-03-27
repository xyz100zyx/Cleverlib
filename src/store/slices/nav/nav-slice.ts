import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INavState } from './interface';
import { fetchGenres } from './async-actions';
import { AC } from '../abort-controller';
import { rejectBookStatus } from '../books/book-slice';
import {RequestStatusType} from "../../../utils/constants";

const initialState: INavState = {
  activeDirectory: 0,
  isHiddenGenres: true,
  genres: [],
  status: null,
  error: null,
    textStatusForAlert: null
};

/* eslint-disable no-param-reassign */
const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    changeActiveDirectory: (state, action: PayloadAction<number>) => {
      state.activeDirectory = action.payload;
    },
    toggleGenresVisibility: (state) => {
      state.isHiddenGenres = !state.isHiddenGenres;
    },
    setGenresVisibility: (state, action: PayloadAction<boolean>) => {
      state.isHiddenGenres = action.payload;
    },
    nullableCategoryStatus: (state) => {
      state.status = null;
    },
    rejectCategoryStatus: (state) => {
        state.status = RequestStatusType.REJECTED
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.status = RequestStatusType.PENDING;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.isHiddenGenres = false;
      state.genres = [{ name: 'Все книги', path: 'all', id: 0 }, ...action.payload];
      state.status = RequestStatusType.FULFILLED;
    });
    builder.addCase(fetchGenres.rejected, (state, action) => {
      state.status = RequestStatusType.REJECTED;
      rejectBookStatus()
      AC.abort()
    });
  },
});

export const {
  changeActiveDirectory,
  toggleGenresVisibility,
  setGenresVisibility,
  nullableCategoryStatus,
  rejectCategoryStatus
} = navSlice.actions;

/* eslint-disable import/no-default-export */
export default navSlice.reducer;
