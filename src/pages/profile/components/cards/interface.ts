import {ReactNode} from "react";

export interface ICard{
    text: string
}

export interface IRedCard{
    text: string,
    subtext: string
}

export interface IBookCard{
    children: ReactNode
}
