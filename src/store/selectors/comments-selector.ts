import {RootState} from "../store";

export const commentsStateSelector = (state: RootState) => state.comments;
export const commentRequestStatusSelector = (state: RootState) => state.comments.status;
export const commentsErrorSelector = (state: RootState) => state.comments.error;
export const commentSelector = (state: RootState) => state.comments.comment;
export const commentTextForAlert = (state: RootState) => state.comments.textStatusForAlert
