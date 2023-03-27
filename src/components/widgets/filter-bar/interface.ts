import {Dispatch, SetStateAction} from "react";
import {DisplayType} from "../../types";

export interface IFilterBar {
    onViewManagerClick: Dispatch<SetStateAction<DisplayType>>;
    displayState: DisplayType;
}
