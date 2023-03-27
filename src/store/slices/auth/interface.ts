import {FetchedError, Profile, User} from "../../../types/data.types"

export interface PayloadStateLogin{
    identifier: string,
    password: string
}

export interface PayloadStateRegister{
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
}

export interface PayloadSendEmailMessage{
    email: string
}

export interface PayloadResetPassword{
    password: string,
    passwordConfirmation: string,
    code: string
}

export interface IState {
    user: User | null,
    error: null | FetchedError,
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    profile: Profile | null;
}
