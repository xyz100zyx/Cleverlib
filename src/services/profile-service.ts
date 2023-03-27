import {AxiosError} from "axios";
import {api} from "../api/config";
import {FetchedError, Profile, UploadAvatarResponse} from "../types/data.types";
import {AuthRequestEndpoints, ProfileRequestEndpoints} from "../utils/constants";

export abstract class ProfileService{
    static async getMe(){
        const response = await api.get<Profile, FetchedError>(AuthRequestEndpoints.GET_ME).catch((err) => {
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

    static async uploadAvatar(fd: File, userId: number){
        const formData = new FormData();
        formData.append('files', fd);
        const response = await api.post<UploadAvatarResponse, FetchedError>(ProfileRequestEndpoints.UPLOAD_AVATAR, formData, {headers: { 'Content-Type': 'multipart/form-data'}}).catch((err) => {
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

    static async saveUploadAvatar(avatarId: number, userId: number){
        const response = await api.put<Profile, FetchedError>(ProfileRequestEndpoints.CHANGE_PROFILE_DATA+userId, {avatar: avatarId}).catch((err) => {
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

    static async editProfile(username: string, email: string, password: string, firstName: string, lastName: string, phone: string, userId: number){
        const response = await api.put<Profile, FetchedError>(ProfileRequestEndpoints.CHANGE_PROFILE_DATA+userId, {username, email, password, firstName, lastName, phone}).catch((err) => {
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
