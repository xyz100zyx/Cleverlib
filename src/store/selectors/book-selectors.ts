import {RootState} from "../store";
import {bookingStateSelector} from "./booking-selectors";

export const booksStateSelector = (state: RootState) => state.books;
export const bookFetchedSelector = (state: RootState) => state.books.book;
export const bookClickedFromMainSelector = (state: RootState) => state.books.bookClickedFromMain;
export const booksFetchedSelector = (state: RootState) => state.books.books;
export const booksRequestStatusSelector = (state: RootState) => state.books.status;
export const booksErrorSelector = (state: RootState) => state.books.error;
export const booksTextForAlertSelector = (state: RootState) => state.books.textStatusForAlert

