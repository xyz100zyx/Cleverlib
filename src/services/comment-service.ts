import { AxiosError } from 'axios';
import { api } from '../api/config';
import { CommentDto } from '../types/data.types';
import { CommentsRequestEndpoints } from '../utils/constants';

export abstract class CommentService {
  static async createComment(dto: CommentDto) {
    const response = await api.post(CommentsRequestEndpoints.ENDPOINT, dto).catch((err) => {
      const { data } = err;
      if (data) {
        throw new AxiosError(JSON.stringify(data));
      }
      throw new AxiosError(
        JSON.stringify({
          data: null,
          error: {
            status: err.response.status,
            message: err.response.message,
            details: {},
            name: err.response.message,
          },
        })
      );
    });
    return response.data;
  }

  static async editComment(dto: CommentDto, commentId: number){
      const response = await api.put(`${CommentsRequestEndpoints.ENDPOINT}/${commentId}`, dto).catch((err) => {
          const { data } = err;
          if (data) {
              throw new AxiosError(JSON.stringify(data));
          }
          throw new AxiosError(
              JSON.stringify({
                  data: null,
                  error: {
                      status: err.response.status,
                      message: err.response.message,
                      details: {},
                      name: err.response.message,
                  },
              })
          );
      });
      return response.data;
  }
}
