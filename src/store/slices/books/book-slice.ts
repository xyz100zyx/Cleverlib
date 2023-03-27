import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchBookById, fetchBooks} from './async-actions';
import {
    CommentResponse,
    FetchedBook,
    FetchedBooks,
    User
} from '../../../types/data.types';
import {AC} from '../abort-controller';
import {rejectCategoryStatus} from '../nav/nav-slice';
import { IState } from './interface';
import {RequestStatusType} from "../../../utils/constants";

/* eslint-disable */

export const enum sort {
    ASC = 'asc',
    DESC = 'desc'
}

const initialState: IState = {
    books: [],
    book: null,
    error: null,
    status: null,
    bookClickedFromMain: null,
    textStatusForAlert: null
};

export const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        nullableStatus: (state) => {
            state.status = null;
        },
        rejectBookStatus: (state) => {
            state.status = RequestStatusType.REJECTED
        },
        addComment: (state, {payload}: PayloadAction<CommentResponse & User>) => {
            const userData = payload.user;
            const review = payload.data
            state.book?.comments.unshift({id: review.id,
                user: {
                    avatarUrl: '',
                    commentUserId: userData.id,
                    firstName: userData.firstName,
                    lastName: userData.lastName
                }, ...review.attributes
            })
        },
        setBookClickedFromMain: (state, action: PayloadAction<FetchedBooks | null>) => {
            state.bookClickedFromMain = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = RequestStatusType.PENDING;
            state.error = null;
        });
        builder.addCase(fetchBooks.fulfilled, (state, action: PayloadAction<FetchedBooks[]>) => {
            state.books = action.payload;
            state.status = RequestStatusType.FULFILLED;
            state.error = null;
        });
        builder.addCase(fetchBooks.rejected, (state, action) => {
            state.status = RequestStatusType.REJECTED;
            state.error = {...JSON.parse(action.payload as string)}
            rejectCategoryStatus()
            AC.abort()
        });
        builder.addCase(fetchBookById.pending, (state) => {
            state.status = RequestStatusType.PENDING;
            state.error = null;
        });
        builder.addCase(fetchBookById.fulfilled, (state, action: PayloadAction<FetchedBook>) => {
            state.status = RequestStatusType.FULFILLED;
            state.book = action.payload;
            state.error = null;
        });
        builder.addCase(fetchBookById.rejected, (state, action) => {
            state.status = RequestStatusType.REJECTED;
            state.error = {...JSON.parse(action.payload as string)}
        });
    },
});

export const {nullableStatus, rejectBookStatus, setBookClickedFromMain, addComment} = bookSlice.actions;
export default bookSlice.reducer;
