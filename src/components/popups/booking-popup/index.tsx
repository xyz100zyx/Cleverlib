import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './index.module.scss';
import {
    setAlertFounder,
    setAlertOpen,
    setBookingOpen
} from '../../../store/slices/popup/popup-slice';
import { BluredWrapper } from '../../common';
import { ReactComponent as CloseIcon } from '../../../assets/close-review-icon.svg';
import { Calendar } from '../../entities/calendar/calendar';
import { useThunkDispatch } from '../../../hooks/redux/dispatchers';
import {
    createBooking,
    deleteBooking,
    editBooking
} from '../../../store/slices/booking/async-actions';
import { fetchBookById, fetchBooks } from '../../../store/slices/books/async-actions';
import { areEqual } from '../../../utils/calendar';
import { FetchedBook, FetchedBooks } from '../../../types/data.types';
import { getDateWithFixedTimeZone } from '../../../utils/date.utils';
import { useAppSelector } from "../../../hooks/redux/selectros";
import {
    bookClickedFromMainSelector,
} from "../../../store/selectors/book-selectors";
import * as Text from './constants'
import {AlertFounders} from "../../../utils/constants";
import {getLocalStorageItem} from "../../../utils/storage.utils";

export const BookingPopup: FC = () => {
    const bookClickedFromMainPage = useAppSelector(bookClickedFromMainSelector) as FetchedBooks;
    const bookingId = bookClickedFromMainPage?.booking?.id;
    const isOnBookPage = !!useParams().booksId;
    const bookedDate = bookClickedFromMainPage?.booking?.dateOrder ? new Date(bookClickedFromMainPage?.booking?.dateOrder) : null;
    const [chosenDate, setChosenDate] = useState<Date | null>(bookedDate);
    const dispatch = useDispatch();
    const thunkDispatch = useThunkDispatch();
    const userId = getLocalStorageItem('userId');

    const closePopupHandler = () => {
        dispatch(setBookingOpen(false));
    };

    const onCreateBookingButtonClick = () => {
        dispatch(setAlertFounder(AlertFounders.BOOKING))
        const date = getDateWithFixedTimeZone(chosenDate as Date);
        const dto = {
            data: {
                book: String(bookClickedFromMainPage.id),
                customer: userId!,
                order: true,
                dateOrder: date.toISOString(),
            },
        };
        if (isOnBookPage) {
            thunkDispatch(createBooking(dto))
                .then(() => thunkDispatch(fetchBookById(bookClickedFromMainPage.id)))
                .then(() => dispatch(setAlertOpen(true)))
                .then(() => dispatch(setBookingOpen(false)));
        } else {
            thunkDispatch(createBooking(dto))
                .then(() => thunkDispatch(fetchBooks()))
                .then(() => dispatch(setAlertOpen(true)))
                .then(() => dispatch(setBookingOpen(false)));
        }
    };

    const onEditBookingButtonClick = () => {
        dispatch(setAlertFounder(AlertFounders.BOOKING))
        const date = getDateWithFixedTimeZone(chosenDate as Date);
        const dto = {
            data: {
                book: String(bookClickedFromMainPage.id),
                customer: userId!,
                order: true,
                dateOrder: date.toISOString(),
            },
        };
        if (isOnBookPage) {
            thunkDispatch(editBooking({ ...dto, bookingId }))
                .then(() => thunkDispatch(fetchBookById(bookClickedFromMainPage.id)))
                .then(() => dispatch(setAlertOpen(true)))
                .then(() => dispatch(setBookingOpen(false)));
        } else {
            thunkDispatch(editBooking({ ...dto, bookingId }))
                .then(() => thunkDispatch(fetchBooks()))
                .then(() => dispatch(setAlertOpen(true)))
                .then(() => dispatch(setBookingOpen(false)));
        }
    }

    const onDeleteBookingBtnClick = () => {
        dispatch(setAlertFounder(AlertFounders.BOOKING))
        thunkDispatch(deleteBooking(bookingId))
            .then(() => thunkDispatch(fetchBooks()))
            .then(() => dispatch(setAlertOpen(true)))
            .then(() => dispatch(setBookingOpen(false)));
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return createPortal(
        <BluredWrapper dataTestId='modal-outer' setVisiblePopup={closePopupHandler}>
            <div
                data-test-id='booking-modal'
                role='presentation'
                onClick={(e) => e.stopPropagation()}
                className={styles.popup}
            >
                <div className={styles.popup__header}>
                    <p data-test-id='modal-title' className={styles.popup__title}>
                        {bookedDate ? Text.TITLE_EDIT : Text.TITLE_CREATE}
                    </p>
                    <button data-test-id='modal-close-button' onClick={closePopupHandler}
                        type='button'>
                        <CloseIcon />
                    </button>
                </div>
                <Calendar chosenDate={chosenDate}
                    setChosenDate={setChosenDate} />
                {!bookedDate && (
                    <button
                        data-test-id='booking-button'
                        disabled={!chosenDate || !!(bookedDate && areEqual(chosenDate, bookedDate))}
                        onClick={onCreateBookingButtonClick}
                        type='button'
                        className={styles.popup__btn}
                    >
                        {Text.CREATE_BOOKING_TEXT}
                    </button>
                )}
                {bookedDate && (
                    <button
                        data-test-id='booking-button'
                        disabled={!chosenDate || !!(bookedDate && areEqual(chosenDate, bookedDate))}
                        onClick={onEditBookingButtonClick}
                        type='button'
                        className={classNames(styles.popup__btn, {
                            [styles.popup__btn_block]: !chosenDate || !!(bookedDate && areEqual(chosenDate, bookedDate)),
                        })}
                    >
                        {Text.CREATE_BOOKING_TEXT}
                    </button>
                )}
                {bookedDate && (
                    <button
                        data-test-id='booking-cancel-button'
                        onClick={onDeleteBookingBtnClick}
                        type='button'
                        className={classNames(styles.popup__btn, { [styles.popup__btn_remove]: !!bookedDate })}
                    >
                        {Text.DELETE_BOOKING_TEXT}
                    </button>
                )}
            </div>
        </BluredWrapper>,
        document.body
    );
};
