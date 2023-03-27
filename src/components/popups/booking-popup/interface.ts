import {CrudActionType} from "../../../utils/date.utils";

export interface IBookingPopup {
    customer: number;
    action: CrudActionType;
}
