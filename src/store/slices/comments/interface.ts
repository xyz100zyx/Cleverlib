import { CommentResponse, FetchedError } from "../../../types/data.types";

export interface IState {
    status: 'fulfilled' | 'pending' | 'rejected' | null,
    comment: CommentResponse | null,
    error: FetchedError | null,
    textStatusForAlert: string | null
}
