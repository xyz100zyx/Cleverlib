import {FetchedBooks} from "../../../../../types/data.types";
import {BookDataProfile} from "../book-card-fw/interface";

export interface IBookCard {
    book?: FetchedBooks;
    isForProfileHistory?: boolean;
    bookForHistory?: BookDataProfile;
    isReviewedByUser?: boolean;
    commentId?: number;

}
