import {DisplayType} from "../../types";

export const viewFilterItems: Array<{ type: DisplayType; dataTestId: string }> = [
    {
        type: 'linear',
        dataTestId: 'button-menu-view-window',
    },
    {
        type: 'vertical',
        dataTestId: 'button-menu-view-list',
    },
];
