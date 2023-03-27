import {RootState} from "../store";

export const popupStateSelector = (state: RootState) => state.popup;
export const isBurgerNavPopupSelector = (state: RootState) =>  state.popup.burgerNav;
export const isBookingPopupSelector = (state: RootState) => state.popup.booking;
export const isAlertPopupSelector = (state: RootState) => state.popup.alert;
export const isReviewPopupSelector = (state: RootState) => state.popup.review;
export const isReviewedByUserSelector = (state: RootState) => state.popup.isReviewed;
export const alertFounderSelector = (state: RootState) => state.popup.founder

