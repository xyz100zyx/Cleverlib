import {FC, useEffect} from 'react';
import {createPortal} from "react-dom";
import iconLoader from '../../../assets/loader-icon.svg';
import styles from './loader.module.scss';
import {useAppSelector} from "../../../hooks/redux/selectros";
import {booksRequestStatusSelector} from "../../../store/selectors/book-selectors";
import {navRequestStatusSelector} from "../../../store/selectors/nav-selectors";
import {authRequestStatusSelector} from "../../../store/selectors/auth-selectors";
import {commentRequestStatusSelector} from "../../../store/selectors/comments-selector";
import {bookingRequestStatusSelector} from "../../../store/selectors/booking-selectors";
import {RequestStatusType} from "../../../utils/constants";
import {profileStatusSelector} from "../../../store/selectors/profile-selectors";

export const LoaderWindow: FC = () => {
    const booksStatus = useAppSelector(booksRequestStatusSelector);
    const navStatus = useAppSelector(navRequestStatusSelector);
    const authStatus = useAppSelector(authRequestStatusSelector)
    const commentsStatus = useAppSelector(commentRequestStatusSelector)
    const bookingStatus = useAppSelector(bookingRequestStatusSelector)
    const profileStatus = useAppSelector(profileStatusSelector)

    const isNeedToHiddenBodyVisible = (booksStatus === RequestStatusType.PENDING && navStatus === RequestStatusType.PENDING) ||
        (booksStatus === RequestStatusType.FULFILLED && navStatus === RequestStatusType.PENDING) ||
        (booksStatus === RequestStatusType.PENDING && navStatus === RequestStatusType.FULFILLED) ||
        (booksStatus === RequestStatusType.PENDING && navStatus === null) ||
        authStatus === RequestStatusType.PENDING ||
        commentsStatus === RequestStatusType.PENDING ||
        bookingStatus === RequestStatusType.PENDING ||
        profileStatus === RequestStatusType.PENDING;

    useEffect(() => {

        if (isNeedToHiddenBodyVisible) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'visible'
        }
    }, [isNeedToHiddenBodyVisible])

    return createPortal((
        <div
            data-test-id='loader'
            className={isNeedToHiddenBodyVisible
                    ? styles.window
                    : styles.window__none
            }
        >
            <img src={iconLoader} className={styles.loader} alt='loader'/>
        </div>
    ), document.body);
};
