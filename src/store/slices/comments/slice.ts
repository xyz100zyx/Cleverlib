import {createSlice} from "@reduxjs/toolkit";
import {createComment} from "./async-actions";
import { IState } from "./interface";
import {RequestStatusType} from "../../../utils/constants";

const initialState: IState = {
    status: null,
    comment: null,
    error: null,
    textStatusForAlert: null
}

/* eslint-disable */

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setNullCommentStatus: (state) => {
            state.status = null;
            state.textStatusForAlert = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(createComment.pending, (state) => {
            state.status = RequestStatusType.PENDING;
            state.comment = null;
            state.error = null;
            state.textStatusForAlert = null;
        }),
            builder.addCase(createComment.fulfilled, (state, action) => {
                state.status = RequestStatusType.FULFILLED;
                state.comment = action.payload;
                state.error = null
                state.textStatusForAlert = 'Спасибо, что нашли время оценить книгу!'
            }),
            builder.addCase(createComment.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED;
                state.comment = null;
                state.error = JSON.parse(String(action.payload))
                state.textStatusForAlert = 'Оценка не была отправлена. Попробуйте позже!'
            })
    }
})

export const {setNullCommentStatus} = commentSlice.actions
export default commentSlice.reducer
