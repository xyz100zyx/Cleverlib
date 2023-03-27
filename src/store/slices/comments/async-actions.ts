import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentDto, CommentResponse} from "../../../types/data.types";
import {CommentService} from "../../../services/comment-service";

export const createComment = createAsyncThunk<CommentResponse, CommentDto, {rejectValue: string}>(
    'comments/create',
    async (dto, {rejectWithValue}) => {
        try{
            return await CommentService.createComment(dto)
        }catch(err: any){
            return rejectWithValue(err.message)
        }
    }
)
