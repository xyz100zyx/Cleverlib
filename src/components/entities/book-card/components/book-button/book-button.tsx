import { FC } from 'react';
import {useDispatch} from "react-redux";
import classNames from 'classnames';
import styles from './book-button.module.scss';
import {setBookingOpen} from "../../../../../store/slices/popup/popup-slice";
import {setBookClickedFromMain} from "../../../../../store/slices/books/book-slice";
import {IBookButton} from "./interface";
import {useAppSelector} from "../../../../../hooks/redux/selectros";
import {profileDataSelector} from "../../../../../store/selectors/profile-selectors";
import {getLocalStorageItem} from "../../../../../utils/storage.utils";

export const BookButton: FC<IBookButton> = ({ text, type, displayType , book}) => {

    const dispatch = useDispatch()
    const userId = useAppSelector(profileDataSelector)?.id || Number(getLocalStorageItem('userId'))

    const onBookingButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setBookClickedFromMain(book))
        dispatch(setBookingOpen(true))
        e.stopPropagation()
    }

    return (
        <button
            data-test-id='booking-button'
            className={classNames(
                styles.button,
                type === 'available'
                    ? styles.button__available
                    : (type === 'added' || (book?.booking?.customerId === userId || book?.delivery?.recipientId === userId))
                        ? styles.button__added
                        : styles.button__unavailable,
                displayType === 'linear' ? styles.button__linear : styles.button__vertical
            )}
            type='button'
            disabled={(book?.booking?.customerId !== userId && !!book?.booking?.customerId) || (book?.delivery?.recipientId!==userId && !!book?.delivery?.recipientId)}
            onClick={e => onBookingButtonClick(e)}
        >
            {text}
        </button>
    )
};
