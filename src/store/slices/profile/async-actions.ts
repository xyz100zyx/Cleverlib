import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentDto, Profile, UploadAvatarResponse} from "../../../types/data.types";
import {ProfileService} from "../../../services/profile-service";
import {BookingService} from "../../../services/booking-service";
import {CommentService} from "../../../services/comment-service";

export const getMe = createAsyncThunk<Profile, undefined, {rejectValue: string}>(
    'profile/getMe',
    async (_, {rejectWithValue}: any) => {
        try{
            return await ProfileService.getMe()
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
);

export const saveUploadAvatar = createAsyncThunk<Profile, {fd: File, userId: number}, {rejectValue: string}>(
    'profile/saveAvatar',
    async (params, {rejectWithValue}: any) => {
        try{
            const resp = await ProfileService.uploadAvatar(params.fd, params.userId);
            const {id} = (resp! as UploadAvatarResponse)[0]
            return await ProfileService.saveUploadAvatar(id, params.userId)
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)

export const uploadProfileAvatar = createAsyncThunk<UploadAvatarResponse, {fd: File, userId: number}, {rejectValue: string}>(
    'profile/uploadAvatar',
    async (params, {rejectWithValue}: any) => {
        try{
            return await ProfileService.uploadAvatar(params.fd, params.userId);
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)

export const editProfile = createAsyncThunk<Profile, {username: string, email: string, password: string, firstName: string, lastName: string, phone: string, userId: number}, {rejectValue: string}>(
    'profile/edit',
    async (params, {rejectWithValue}: any) => {
        try{
            return await ProfileService.editProfile(params.username, params.email, params.password, params.firstName, params.lastName, params.phone, params.userId);
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)

export const deleteBookingAndUpdate = createAsyncThunk<Profile, {id: number}, {rejectValue: string}>(
    'profile/deleteBookingAndUpdate',
    async (params, {rejectWithValue}: any) => {
        try{
            const responseDelete = await BookingService.deleteBooking(params.id);
            return await ProfileService.getMe()
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)

export const createCommentAndUpdate = createAsyncThunk<Profile, CommentDto, {rejectValue: string}>(
    'comments/createAndUpdateUser',
    async (dto, {rejectWithValue}: any) => {
        try{
            const responseCreateComment = await CommentService.createComment(dto);
            return await ProfileService.getMe()
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)

export const editCommentAndUpdate = createAsyncThunk<Profile, {dto: CommentDto, commentId: number}, {rejectValue: string}>(
    'comments/editAndUpdateUser',
    async (params, {rejectWithValue}: any) => {
        try{
            const responseEditComment = await CommentService.editComment(params.dto, params.commentId);
            return await ProfileService.getMe()
        }catch(error: any){
            return rejectWithValue(error.message as string)
        }
    }
)
