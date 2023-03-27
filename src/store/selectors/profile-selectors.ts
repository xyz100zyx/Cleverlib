import {RootState} from "../store";

export const profileDataSelector = (state: RootState) => state.profile.profile;
export const profileStatusSelector = (state: RootState) => state.profile.status;
export const profileUploadAvatarDataSelector = (state: RootState) =>  state.profile.uploadAvatarData
export const profileTextForAlertSelector = (state: RootState) => state.profile.textStatusForAlert
