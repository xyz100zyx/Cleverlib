import { AxiosError } from 'axios';
import { api } from '../api/config';
import { CreateBookingDto, EditBookingDto } from '../types/dto.types';
import { BookingRequestEndpoints } from '../utils/constants';

export abstract class BookingService {
  static async createBooking(dto: CreateBookingDto) {
    const response = await api.post(BookingRequestEndpoints.ENDPOINT, dto).catch((error) => {
      const { data } = error;

      if (data) {
        throw new AxiosError(JSON.stringify(data));
      }
      throw new AxiosError(
        JSON.stringify({
          data: null,
          error: {
            status: error.response.status,
            message: error.response.message,
            details: {},
            name: error.response.message,
          },
        })
      );
    });
    return response.data;
  }

  static async editBooking(dto: EditBookingDto, bookingId: number) {
    const response = await api.put(`${BookingRequestEndpoints.ENDPOINT}/${bookingId}`, dto).catch((error) => {
      const { data } = error;

      if (data) {
        throw new AxiosError(JSON.stringify(data));
      }
      throw new AxiosError(
        JSON.stringify({
          data: null,
          error: {
            status: error.response.status,
            message: error.response.message,
            details: {},
            name: error.response.message,
          },
        })
      );
    });
    return response.data;
  }

  static async deleteBooking(bookingId: number) {
    const response = await api.delete(`${BookingRequestEndpoints.ENDPOINT}/${bookingId}`).catch((error) => {
      const { data } = error;

      if (data) {
        throw new AxiosError(JSON.stringify(data));
      }
      throw new AxiosError(
        JSON.stringify({
          data: null,
          error: {
            status: error.response.status,
            message: error.response.message,
            details: {},
            name: error.response.message,
          },
        })
      );
    });
    return response.data;
  }
}
