import {RootState} from "../store";

export const navStateSelector = (state: RootState) => state.nav;
export const activeDirectorySelector = (state: RootState) => state.nav.activeDirectory;
export const isHiddenGenresSelector = (state: RootState) => state.nav.isHiddenGenres;
export const genresSelector = (state: RootState) => state.nav.genres;
export const navRequestStatusSelector = (state: RootState) => state.nav.status;
export const navErrorSelector = (state: RootState) => state.nav.error;
export const navTextForAlert = (state: RootState) => state.nav.textStatusForAlert
