import {Dispatch, SetStateAction} from "react";

export interface ICalendar {
    chosenDate: Date | null;
    setChosenDate: Dispatch<SetStateAction<Date | null>>;
}
