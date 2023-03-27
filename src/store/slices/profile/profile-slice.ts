import {createSlice} from "@reduxjs/toolkit";
import {IState} from "./interface";
import {
    createCommentAndUpdate,
    deleteBookingAndUpdate, editCommentAndUpdate,
    editProfile,
    getMe,
    saveUploadAvatar,
    uploadProfileAvatar
} from "./async-actions";
import {RequestStatusType} from "../../../utils/constants";

const initialState: IState = {
    profile: null,
    status: null,
    error: null,
    uploadAvatarData: null,
    textStatusForAlert: null,
}

/* eslint-disable */
export const profileSlice = createSlice({
    initialState,
    name: 'profile',
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getMe.pending, (state) => {
            state.status = RequestStatusType.PENDING;
            state.error = null;
            state.profile = null;
            state.textStatusForAlert = null
        }),
            builder.addCase(getMe.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.profile = action.payload;
            }),
            builder.addCase(getMe.rejected, (state,action) => {
                state.profile = null;
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!)
                state.textStatusForAlert = 'Что-то пошло не так. Обновите страницу через некоторое время.'
            }),
            builder.addCase(uploadProfileAvatar.pending, (state) => {
                state.status = RequestStatusType.PENDING;
                state.error = null;
                state.uploadAvatarData = null;
                state.textStatusForAlert = null
            }),
            builder.addCase(uploadProfileAvatar.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.uploadAvatarData = action.payload;
                state.textStatusForAlert = 'Фото успешно сохранено!'
            }),
            builder.addCase(uploadProfileAvatar.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!)
                state.textStatusForAlert = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
            }),
            builder.addCase(saveUploadAvatar.pending, (state) => {
                state.error = null;
                state.status =  RequestStatusType.PENDING;
                state.textStatusForAlert = null
            }),
            builder.addCase(saveUploadAvatar.fulfilled, (state, action) => {
                state.error = null;
                state.status = RequestStatusType.FULFILLED;
                state.profile = action.payload;
                state.textStatusForAlert = 'Фото успешно сохранено!'
            }),
            builder.addCase(saveUploadAvatar.rejected, (state, action) => {
                state.error = JSON.parse(action.payload!);
                state.status = RequestStatusType.REJECTED
                state.textStatusForAlert = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
            }),
            builder.addCase(editProfile.pending, (state) => {
                state.status = RequestStatusType.PENDING;
                state.error = null;
                state.textStatusForAlert = null
            }),
            builder.addCase(editProfile.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.profile = action.payload;
                state.textStatusForAlert = 'Изменения успешно сохранены!'
            }),
            builder.addCase(editProfile.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!);
                state.textStatusForAlert = 'Изменения не были сохранены. Попробуйте позже!'
            }),
            builder.addCase(deleteBookingAndUpdate.pending, (state) => {
                state.status = RequestStatusType.PENDING;
                state.error = null;
                state.textStatusForAlert = null
            }),
            builder.addCase(deleteBookingAndUpdate.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!);
                state.textStatusForAlert = 'Не удалось снять бронирование книги. Попробуйте позже!'
            }),
            builder.addCase(deleteBookingAndUpdate.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.profile = action.payload;
                state.textStatusForAlert = 'Бронирование книги успешно отменено!'
            }),
            builder.addCase(createCommentAndUpdate.pending, (state) => {
                state.status = RequestStatusType.PENDING;
                state.error = null;
                state.textStatusForAlert = null;
            }),
            builder.addCase(createCommentAndUpdate.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.textStatusForAlert = 'Спасибо, что нашли время оценить книгу!';
                state.profile = action.payload
            }),
            builder.addCase(createCommentAndUpdate.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!);
                state.textStatusForAlert = 'Оценка не была отправлена. Попробуйте позже!';
            }),
            builder.addCase(editCommentAndUpdate.pending, (state) => {
                state.status = RequestStatusType.PENDING;
                state.error = null;
                state.textStatusForAlert = null;
            }),
            builder.addCase(editCommentAndUpdate.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.error = null;
                state.textStatusForAlert = 'Спасибо, что нашли время изменить оценку!';
                console.log(state.textStatusForAlert)
                state.profile = action.payload
            }),
            builder.addCase(editCommentAndUpdate.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.error = JSON.parse(action.payload!);
                state.textStatusForAlert = 'Изменения не были сохранены. Попробуйте позже!';
                console.log(state.textStatusForAlert)
            })
    }

})

export default profileSlice.reducer;
