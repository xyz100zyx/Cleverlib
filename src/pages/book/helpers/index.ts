import {Review} from "../../../types/data.types";

export const hasMyReview = (comments: Review[], id: number) => {
    const comment = comments.filter(item => item?.user?.commentUserId === id && !!item?.user?.commentUserId)
    return !!comment.length
}
