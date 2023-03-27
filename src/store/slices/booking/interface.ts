import {BookingResponse, FetchedError, ResponseStatusReq} from "../../../types/data.types";

export interface IState{
    status: 'pending' | 'rejected' | 'fulfilled' | null;
    error: FetchedError | null;
    response: BookingResponse | null;
    type: 'create' | 'edit' | 'delete' | null
    textStatusForAlert: string | null;
}
