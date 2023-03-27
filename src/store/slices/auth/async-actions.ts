import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../../services/auth-service";
import {FetchedError, User} from "../../../types/data.types";
import { PayloadResetPassword, PayloadSendEmailMessage, PayloadStateLogin, PayloadStateRegister } from "./interface";

export const login = createAsyncThunk<User, PayloadStateLogin, {rejectValue: string}>(
    'auth/login',
    async ({identifier, password}, {rejectWithValue}: any) => {
        try{
            return await AuthService.login({identifier, password})
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const registration = createAsyncThunk<User, PayloadStateRegister, {rejectValue: string}>(
    'auth/register',
    async ({username, password, firstName, lastName, phone, email}, {rejectWithValue}: any) => {
        try{
            return await AuthService.registration({username, password, firstName, lastName, phone, email})
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

export const rememberPassword = createAsyncThunk<{status: boolean}, PayloadSendEmailMessage, {rejectValue: string}>(
    'auth/rememberPassword',
    async ({email}, {rejectWithValue}: any) => {
        try{
            return await AuthService.rememberPassword(email)
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }

)

export const resetPassword = createAsyncThunk<User, PayloadResetPassword, {rejectValue: string}>(
    'auth/resetPassword',
    async ({password, passwordConfirmation, code}, {rejectWithValue}: any) => {
        try{
            return await AuthService.resetPassword(password, passwordConfirmation, code)
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
)

