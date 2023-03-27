import {Dispatch, SetStateAction} from "react";

export interface IFormRegisterFirst {
    username: string;
    password: string;
}

export interface IRegisterFirstStep {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
}

export interface IFormRegisterSecond {
    firstName: string;
    lastName: string;
}

export interface IRegisterSecondStep {
    step: number,
    setStep: Dispatch<SetStateAction<number>>
}

export interface IFormRegisterThird {
    phone: string;
    email: string;
}
