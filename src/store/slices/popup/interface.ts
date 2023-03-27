import {AlertFounder} from "../../../types/data.types";

export interface IState {
  burgerNav: boolean;
  alert: boolean;
  booking: boolean;
  founder: AlertFounder | null,
    review: boolean,
    isReviewed?: boolean
}
