import {BookDataProfile} from "../../book-card/components/book-card-fw/interface";

export type CommentsDataProfile = {
    id: number,
    rating: number,
    text: string | null,
    bookId: number

}
export interface ISliderBooks{
    books: BookDataProfile[],
    comments: CommentsDataProfile[]
}
