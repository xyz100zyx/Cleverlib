import {DisplayType} from "../../../../types";
import {FetchedBooks} from "../../../../../types/data.types";

export interface IBookButton {
    text: string;
    type: BookButtonType;
    displayType?: DisplayType;
    book: FetchedBooks
}

type BookButtonType = 'available' | 'added' | 'unavailable';
