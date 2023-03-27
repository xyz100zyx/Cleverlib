import { FetchedBook, FetchedBooks, FetchedError } from "../../../types/data.types";

export interface IState{
    books: FetchedBooks[];
    book: FetchedBook | null;
    status: 'pending' | 'fulfilled' | 'rejected' | null;
    error: null | FetchedError;
    bookClickedFromMain: FetchedBooks | null,
    textStatusForAlert: string | null;
}
