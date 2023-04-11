import {createAsyncThunk} from "@reduxjs/toolkit";
import {BookingResponse, FetchedBook, FetchedBooks} from "../../../types/data.types";
import {CreateBookingDto, EditBookingDto} from "../../../types/dto.types";
import {BookingService} from "../../../services/booking-service";
import { BookService } from "../../../services/book-service";

export const createBookingWithMainPage = createAsyncThunk<FetchedBooks[], CreateBookingDto, {rejectValue: string}>(
    'booking/createWithMainPage',
    async (dto, {rejectWithValue}) => {
        try{
            const bookingResponse =  await BookingService.createBooking(dto)
            return await BookService.getBooks()
        }catch(err: any){
            return rejectWithValue(err.message)
        }
    }
)

export const createBookingWithBookPage = createAsyncThunk<FetchedBook, {dto: CreateBookingDto, id: number}, {rejectValue: string}>(
    'booking/createWithBookPage',
    async (params, {rejectWithValue}) => {
        try{
            const bookingResponse =  await BookingService.createBooking(params.dto)
            return await BookService.getBookById(params.id)
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
