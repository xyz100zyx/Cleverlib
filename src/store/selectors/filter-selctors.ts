import {RootState} from "../store";

export const filterStateSelector = (state: RootState) => state.filter;
export const activeGenreSelector = (state: RootState) => state.filter.activeGenre;
export const inputValueGenreSelector = (state: RootState) => state.filter.inputValue;
export const sortedTypeSelector = (state: RootState) => state.filter.sortedType;
