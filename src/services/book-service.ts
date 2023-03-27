import { api } from '../api/config';
import { AC } from '../store/slices/abort-controller';
import { FetchedBook, FetchedBooks } from '../types/data.types';
import { BooksRequestEndpoints } from '../utils/constants';

export abstract class BookService {
  static async getBooks(): Promise<FetchedBooks[]> {
    const response = await api.get(BooksRequestEndpoints.FETCH_BOOKS, { signal: AC.signal }).catch((err) => {
      throw new Error(
        JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
      );
    });

    return response.data;
  }

  static async getBookById(id: number): Promise<FetchedBook> {
    const response = await api.get(`${BooksRequestEndpoints.FETCH_BOOKS}/${id}`, { signal: AC.signal }).catch((err) => {
      throw new Error(
        JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
      );
    });
    return response.data;
  }
}
