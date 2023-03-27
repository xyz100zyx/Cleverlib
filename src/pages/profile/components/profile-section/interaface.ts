import {ReactNode} from "react";

export interface IProfileSection{
    title: string,
    text: string,
    children: ReactNode
    dataTestId?: string;
}
