import {FetchedError, Profile, UploadAvatarResponse} from "../../../types/data.types";
import {RequestStatusType} from "../../../utils/constants";
import {RequestStatus} from "../../../utils/alert";

export interface IState{
    profile: Profile | null;
    status: RequestStatus | null;
    error: FetchedError | null,
    uploadAvatarData: UploadAvatarResponse | null,
    textStatusForAlert: string | null;
}
