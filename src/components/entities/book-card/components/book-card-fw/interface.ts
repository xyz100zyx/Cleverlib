import {FetchedBooks} from "../../../../../types/data.types";

export type BookDataProfile = {
    id: number,
    title: string,
    rating: number,
    issueYear: string | null,
    authors: string[],
    image: string | null
}
export interface IBookCard {
    book?: FetchedBooks;
    bookInfoProfile?: BookDataProfile;
    isForProfile?: boolean;
    isForProfileData?: boolean;
    dateReturnBook?: string;
}
