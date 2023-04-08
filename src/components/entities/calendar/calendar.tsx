import { FC, useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './calendar.module.scss';
import { getMonthData, MONTHS_IN_YEAR, MONTHS, DAYS, areEqual, getNextAvailableDay } from '../../../utils/calendar';
import { ReactComponent as IconArrowUp } from '../../../assets/icon-arrow-up.svg';
import { ReactComponent as IconArrowDown } from '../../../assets/icon-arrow-down.svg';
import { ICalendar } from "./interface";

export const Calendar: FC<ICalendar> = ({ setChosenDate, chosenDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextAvailableDay = getNextAvailableDay(currentDate);

  const monthSelectRef = useRef<HTMLSelectElement>(null);

  const monthData = getMonthData(Number(currentDate.getFullYear()), Number(currentDate.getMonth()));

  const onDayCalendarClick = (date: Date) => {
    if (areEqual(date, currentDate) || areEqual(date, nextAvailableDay)) {
      setChosenDate(date);
    }
  };

  const onMonthSelectHandleChange = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), Number(monthSelectRef.current?.value)));
  };

  const onNextMonthButtonClick = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
  };

  const onPrevMonthButtonClick = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
  };

  return (
    <div data-test-id='calendar' className={styles.calendar}>
      <header className={styles.calendar__header}>
        <select
          data-test-id='month-select'
          className={styles.calendar__select}
          ref={monthSelectRef}
          value={currentDate.getMonth()}
          onChange={onMonthSelectHandleChange}
          defaultValue={currentDate.getMonth()}
        >
          {[...new Array(MONTHS_IN_YEAR)].map((_, index) => (
            <option key={MONTHS[index]} value={index}>
              {MONTHS[index]} {currentDate.getFullYear()}
            </option>
          ))}
        </select>
        <div className={styles.calendar__arrows}>
          <button
            data-test-id='button-prev-month'
            className={styles.calendar__arrow}
            type='button'
            onClick={onPrevMonthButtonClick}
          >
            <IconArrowUp />
          </button>
          <button
            data-test-id='button-next-month'
            className={styles.calendar__arrow}
            type='button'
            onClick={onNextMonthButtonClick}
          >
            <IconArrowDown />
          </button>
        </div>
      </header>
      <table className={styles.calendar__table}>
        <thead>
          <tr>
            {DAYS.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {monthData.map((week, index) => (
            <tr key={week[index]?.toString()}>
              {week.map((date, index) => (
                <td
                  data-test-id='day-button'
                  role='presentation'
                  onClick={() => onDayCalendarClick(date!)}
                  className={classNames(
                    { [styles.dayoff]: date?.getDay() === 6 || date?.getDay() === 0 },
                    {
                      [styles.dayoff_cur]:
                        (date?.getDay() === 6 || date?.getDay() === 0) &&
                        areEqual(date, currentDate) &&
                        areEqual(currentDate, new Date()),
                    },
                    { [styles.calendar__current]: areEqual(date!, currentDate) && areEqual(currentDate, new Date()) },
                    {
                      [styles.calendar__next]:
                        areEqual(date!, nextAvailableDay) && currentDate.getMonth() === new Date().getMonth(),
                    },
                    { [styles.calendar__active]: areEqual(date!, chosenDate!) }
                  )}
                  key={date?.toString()}
                >
                  {date?.getDate()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
