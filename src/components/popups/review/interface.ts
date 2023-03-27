import {Dispatch, SetStateAction} from "react";

export interface IReviewPopup{
    setVisiblePopup: Dispatch<SetStateAction<boolean>>;
    id: number;
    isReviewedByUser?: boolean;
    commentId?: number
}
