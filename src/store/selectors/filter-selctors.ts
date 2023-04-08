import {RootState} from "../store";

export const filterStateSelector = (state: RootState) => state.filter;
export const filterInputSelector = (state: RootState) => state.filter.inputValue
export const filterGenreSelector = (state: RootState) => state.filter.activeGenre
export const filterSortSelector = (state: RootState) => state.filter.sortedType