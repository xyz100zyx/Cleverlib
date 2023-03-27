import {RootState} from "../store";

export const bookingStateSelector = (state: RootState) => state.booking;
export const bookingRequestStatusSelector = (state: RootState) => state.booking.status
export const bookingErrorSelector = (state: RootState) => state.booking.error;
export const bookingRequestTypeSelector = (state: RootState) => state.booking.type;
export const bookingResponseSelector = (state: RootState) => state.booking.response;
export const bookingTextForAlertSelector = (state: RootState) => state.booking.textStatusForAlert

