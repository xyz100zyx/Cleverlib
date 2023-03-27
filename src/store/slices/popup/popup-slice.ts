import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IState } from './interface';
import {AlertFounder} from "../../../types/data.types";

const initialState: IState = {
    burgerNav: false,
    alert: false,
    booking: false,
    founder: null,
    review: false,
    isReviewed: false,
}

/* eslint-disable no-param-reassign */
const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        toggleBurgerNav: (state) => {
            state.burgerNav = !state.burgerNav
        },
        closeBurgerNav: (state) => {
            state.burgerNav = false
        },
        openBurgerNav: (state) => {
            state.burgerNav = true
        },
        setAlertOpen: (state, action: PayloadAction<boolean>) => {
            state.alert = action.payload

        },
        setBookingOpen: (state, action: PayloadAction<boolean>) => {
            state.booking = action.payload
        },
        setAlertFounder: (state, action: PayloadAction<AlertFounder>) => {
            state.founder = action.payload
        },
        setOpenReviewPopup: (state, action: PayloadAction<boolean>) => {
            state.review = action.payload;
        },
        setIsReviewedByUser: (state, action: PayloadAction<boolean>) => {
            state.isReviewed = action.payload;
        }
    }
})

export const {toggleBurgerNav, closeBurgerNav, openBurgerNav, setAlertOpen, setBookingOpen, setAlertFounder, setOpenReviewPopup, setIsReviewedByUser} = popupSlice.actions;
/* eslint-disable import/no-default-export */
export default popupSlice.reducer;
