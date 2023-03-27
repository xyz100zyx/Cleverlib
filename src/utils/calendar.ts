export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;
export enum MONTHS {
    Январь = 0,
    Февраль = 1,
    Март = 2,
    Апрель = 3,
    Май = 4,
    Июнь = 5,
    Июль = 6,
    Август = 7,
    Сентябрь = 8,
    Октябрь = 9,
    Ноябрь = 10,
    Декабрь = 11
}

export const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const WEEK_DAYS_FROM_MONDAY = [6, 0, 1, 2, 3, 4, 5];



export function areEqual(a: Date, b: Date): boolean {
    if (!a || !b) return false;

    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

export const getNextAvailableDay = (date: Date) => {
    if(date.getDay() === 5){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()+3)
    }
    if(date.getDay() === 6){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()+2)
    }
    if(date.getDay() === 0){
        return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)
}

export function isLeapYear(year: number): boolean {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date: Date): number {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = DAYS_IN_MONTH[month];

    if (isLeapYear(year) && month === MONTHS.Февраль) {
        return daysInMonth + 1;
    }
    return daysInMonth;
}

export function getDayOfWeek(date: Date): number {
    const dayOfWeek = date.getDay();

    return WEEK_DAYS_FROM_MONDAY[dayOfWeek];
}

/* eslint-disable no-plusplus */

export function getMonthData(year: number, month: number): Date[][] | undefined[][] {
    const result: Date[][] | undefined[][] = [];
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);
    let day = 1;

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = [];

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            if ((i === 0 && j < monthStartsOn)) {
                result[i][j] = undefined;
            }
            else if(day > daysInMonth){
                result[i][j] = undefined;
            }
            else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }

    let prevMonthDaysCount = getDaysInMonth(new Date(year, month-1))
    for(let day = 6; day>=0;day--){
        if(result[0][day] === undefined){
            result[0][day] = new Date(year, month-1, prevMonthDaysCount--)
        }
    }

    const lastDateRow = result.length-1
    let nextMonthDaysCount = 1;
    for(let day = 0; day<7;day++){
        if(result[lastDateRow][day] === undefined){
            result[lastDateRow][day] = new Date(year, month+1, nextMonthDaysCount++)
        }
    }

    return result;
}
