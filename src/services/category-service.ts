import { api } from '../api/config';
import { AC } from '../store/slices/abort-controller';
import { Category } from '../types/data.types';
import { CategoriesRequestEndpoints } from '../utils/constants';

export abstract class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const response = await api.get(CategoriesRequestEndpoints.ENDPOINT, { signal: AC.signal }).catch((err) => {
      throw new Error(
        JSON.stringify({ message: err.message, status: err.status, name: err.name, details: err.details })
      );
    });
    return response.data;
  }
}
