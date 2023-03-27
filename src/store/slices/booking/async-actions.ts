import {createAsyncThunk} from "@reduxjs/toolkit";
import {BookingResponse} from "../../../types/data.types";
import {CreateBookingDto, EditBookingDto} from "../../../types/dto.types";
import {BookingService} from "../../../services/booking-service";

export const createBooking = createAsyncThunk<BookingResponse, CreateBookingDto, {rejectValue: string}>(
    'booking/create',
    async (dto, {rejectWithValue}) => {
        try{
            return await BookingService.createBooking(dto)
        }catch(err: any){
            return rejectWithValue(err.message)
        }
    }
)

export const editBooking = createAsyncThunk<BookingResponse, EditBookingDto & {bookingId: number}, {rejectValue: string}>(
    'booking/edit',
    async (dto, {rejectWithValue}) => {
        try{
            const {bookingId, ...dtoArg} = dto;
            return await BookingService.editBooking(dtoArg, bookingId)
        }catch(err: any){
            return rejectWithValue(err.message)
        }
    }
)

export const deleteBooking = createAsyncThunk<BookingResponse, number, {rejectValue: string}>(
    'booking/delete',
        async (bookingId, {rejectWithValue}) => {
            try{
                return await BookingService.deleteBooking(bookingId)
            }catch(err: any){
                return rejectWithValue(err.message)
            }
        }
)
