import { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api/config';
import {FetchedError, Profile, User} from '../types/data.types';
import { LoginDto, RegisterDto } from '../types/dto.types';
import { AuthRequestEndpoints } from '../utils/constants';

export abstract class AuthService {
  static async login(dto: LoginDto) {
    const response = await api.post<User | FetchedError>(AuthRequestEndpoints.LOGIN, dto).catch((err) => {
      const { data } = err.response;
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
    return response?.data;
  }

  static async registration(dto: RegisterDto) {
    const response = await api.post<User | FetchedError>(AuthRequestEndpoints.REGISTRATION, dto).catch((err) => {
      const { data } = err.response;
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
    return response?.data;
  }

  static async rememberPassword(email: string) {
    const response = await api
      .post<{ ok: boolean } | FetchedError>(AuthRequestEndpoints.FORGOT_PASS, { email })
      .catch((err) => {
        const { data } = err.response;
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
    return response?.data;
  }

  static async resetPassword(password: string, passwordConfirmation: string, code: string) {
    const response = await api
      .post<User | FetchedError>(AuthRequestEndpoints.RESET_PASS, { password, passwordConfirmation, code })
      .catch((err) => {
          const { data } = err.response;
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
    return response?.data;
  }
}
