export const getDeliveredDate = (apiDate: string) => `${apiDate.split("-")[2].slice(0,2)}.${apiDate.split("-")[1]}`


export const getMonthByNumber = (month: number) => {
    switch (month){
        case 0:
            return 'Январ';
            break;
        case 1:
            return 'Феврал'
            break;
        case 2:
            return 'Март'
            break;
        case 3:
            return 'Апрел'
            break;
        case 4:
            return 'Ма'
            break;
        case 5:
            return 'Июн';
            break;
        case 6:
            return 'Июл'
            break;
        case 7:
            return 'Август';
            break;
        case 8:
            return 'Сентябр'
            break;
        case 9:
            return 'Октябр';
            break;
        case 10:
            return 'Ноябр'
            break;
        default:
            return 'Декабр'
            break;
    }
}

export const getCommentDate = (apiDate: string) => {
    const date = new Date(apiDate);
    const dateSeparated = date.toString().split(" ")
    return `${dateSeparated[2]} ${getMonthByNumber(date.getMonth())}я ${dateSeparated[3]}`.toLowerCase();
}

export const isDateLessThanToday = (date: string) => {
    const today = new Date().setHours(0,0,0,0);
    return new Date(date).setHours(0,0,0,0) < today
}

export const isDateGreaterThanToday = (date: string) => {
    const today = new Date().setHours(0,0,0,0);
    return new Date(date).setHours(0,0,0,0) > today
}

export const getDateWithFixedTimeZone = (chosenDate: Date) => {
    const ts = +(chosenDate!) - new Date().getTimezoneOffset()*60*3*1000
    return new Date(ts)
}

export const getDMDate = (apiDate: string) => {
    const result = apiDate.split("-");
    return `${result[2].slice(0,2)}.${result[1]}`
}

export type CrudActionType = 'create' | 'read' | 'edit' | 'delete'
