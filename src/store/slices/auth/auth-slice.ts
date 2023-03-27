import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../../types/data.types";
import {login, registration, rememberPassword, resetPassword} from "./async-actions";
import {IState} from "./interface";
import {removeLocalStorageItem, setLocalStorageItem} from "../../../utils/storage.utils";
import {RequestStatusType} from "../../../utils/constants";

const initialState: IState = {
    user: null,
    error: null,
    status: null,
    profile: null
}

/* eslint-disable */

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAllNull: (state) => {
            state.user = null;
            state.error = null;
            state.status = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.error = null;
            state.status = RequestStatusType.PENDING;
            state.user = null;
            removeLocalStorageItem('jwt')
            removeLocalStorageItem('userId')
            state.profile = null;

        }),
            builder.addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload
                state.status = RequestStatusType.FULFILLED;
                state.error = null
                setLocalStorageItem('token', action.payload.jwt)
                setLocalStorageItem('userId', action.payload.user.id)
            }),
            builder.addCase(login.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED
                state.error = JSON.parse(action.payload!)

            }),
            builder.addCase(registration.pending, (state) => {
                state.error = null;
                state.status = RequestStatusType.PENDING
                state.user = null
                state.profile = null;
            }),
            builder.addCase(registration.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = RequestStatusType.FULFILLED
                state.error = null
            }),
            builder.addCase(registration.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED
                state.error = JSON.parse(action.payload!)

            }),
            builder.addCase(rememberPassword.pending, (state) => {
                state.error = null;
                state.user = null;
                state.status = RequestStatusType.PENDING;
                state.profile = null;
            }),
            builder.addCase(rememberPassword.fulfilled, (state, action: PayloadAction<{ status: boolean }>) => {
                state.error = null
                state.status = RequestStatusType.FULFILLED
                state.user = null
            }),
            builder.addCase(rememberPassword.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED
                state.error = JSON.parse(action.payload!)
            }),
            builder.addCase(resetPassword.pending, (state) => {
                state.error = null;
                state.status = RequestStatusType.PENDING;
                    state.user = null;
                state.profile = null;
            }),
            builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = RequestStatusType.FULFILLED
                state.error = null
            }),
            builder.addCase(resetPassword.rejected, (state, action) => {
                state.status = RequestStatusType.REJECTED
                state.error = JSON.parse(action.payload!)
            })
    }

})

export const {setAllNull} = authSlice.actions
export default authSlice.reducer;
