import {Review} from "../../../types/data.types";

export const hasMyReview = (comments: Review[], id: number) => {
    const comment = comments.filter(item => item?.user?.commentUserId === id && !!item?.user?.commentUserId)

    console.log(comment.length ? true: false, comment, comment[0]?.user?.commentUserId, id)
    return comment.length ? true: false
}
