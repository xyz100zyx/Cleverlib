import {createSlice} from "@reduxjs/toolkit";
import {createBooking, deleteBooking, editBooking} from "./async-actions";
import { IState } from "./interface";
import {CrudActionTypes, RequestStatusType} from "../../../utils/constants";

const initialState: IState = {
    status: null,
    error: null,
    response: null,
    type: null,
    textStatusForAlert: null,
}

/* eslint-disable */
export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setNullStatusBooking: (state) => {
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createBooking.pending, (state) => {
            state.error = null;
            state.status = RequestStatusType.PENDING;
            state.response = null;
            state.type = CrudActionTypes.CREATE;
            state.textStatusForAlert = null
        }),
            builder.addCase(createBooking.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.response = action.payload
                state.textStatusForAlert = 'Книга забронирована. Подробности можно посмотреть на странице Профиль';
                console.log(state.textStatusForAlert)
            }),
            builder.addCase(createBooking.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(String(action.payload));
                state.response = null
                state.textStatusForAlert = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!'
            }),
            builder.addCase(editBooking.pending, (state) => {
                state.error = null;
                state.status = RequestStatusType.PENDING;
                state.response = null;
                state.type = CrudActionTypes.EDIT;
                state.textStatusForAlert = null
            }),
            builder.addCase(editBooking.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.response = action.payload
                state.textStatusForAlert = 'Изменения успешно сохранены!'
            }),
            builder.addCase(editBooking.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(String(action.payload));
                state.response = null
                state.textStatusForAlert = 'Изменения не были сохранены. Попробуйте позже!'
            }),
            builder.addCase(deleteBooking.pending, (state) => {
                state.error = null;
                state.status = RequestStatusType.PENDING;
                state.response = null;
                state.type = CrudActionTypes.DELETE;
                state.textStatusForAlert = null;
            }),
            builder.addCase(deleteBooking.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.response = action.payload
                state.textStatusForAlert = 'Бронирование книги успешно отменено!'
            }),
            builder.addCase(deleteBooking.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(String(action.payload));
                state.response = null
                state.textStatusForAlert = 'Не удалось снять бронирование книги. Попробуйте позже!'
            })
    }
})

export const {setNullStatusBooking} = bookingSlice.actions;
export default bookingSlice.reducer;
