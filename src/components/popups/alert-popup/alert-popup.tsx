import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import classNames from "classnames";
import { TransparentWrapper } from '../../common/transparent-wrapper/transparent-wrapper';
import styles from './alert-popup.module.scss';
import iconError from '../../../assets/error-circle.svg';
import iconSuccess from '../../../assets/CheckCircle.svg';
import iconClose from '../../../assets/error-close.svg';
import { setAlertOpen } from '../../../store/slices/popup/popup-slice';
import { setNullCommentStatus } from '../../../store/slices/comments/slice';
import { setNullStatusBooking } from '../../../store/slices/booking/booking-slice';
import {IAlertPopup} from "./interface";
import {AlertFounders, RequestStatusType, ResponseStatusReqType} from "../../../utils/constants";
import {useAppSelector} from "../../../hooks/redux/selectros";
import {alertFounderSelector} from "../../../store/selectors/popup-selectors";
import {
    booksRequestStatusSelector,
    booksTextForAlertSelector
} from "../../../store/selectors/book-selectors";
import {
    commentRequestStatusSelector,
    commentTextForAlert
} from "../../../store/selectors/comments-selector";
import {
    profileStatusSelector,
    profileTextForAlertSelector
} from "../../../store/selectors/profile-selectors";
import {navRequestStatusSelector, navTextForAlert} from "../../../store/selectors/nav-selectors";
import {
    bookingRequestStatusSelector,
    bookingTextForAlertSelector
} from "../../../store/selectors/booking-selectors";

export const AlertPopup: FC<IAlertPopup> = ({ dataTestId}) => {
  const dispatch = useDispatch();
  const founder = useAppSelector(alertFounderSelector);
  const bookingText = useAppSelector(bookingTextForAlertSelector);
  const commentsText = useAppSelector(commentTextForAlert);
  const profileText = useAppSelector(profileTextForAlertSelector);
  const booksText = useAppSelector(booksTextForAlertSelector);
  const categoriesText = useAppSelector(navTextForAlert);
  const bookingStatus = useAppSelector(bookingRequestStatusSelector)
  const commentsStatus = useAppSelector(commentRequestStatusSelector)
  const profileStatus = useAppSelector(profileStatusSelector)
  const booksStatus = useAppSelector(booksRequestStatusSelector)
  const categoriesStatus = useAppSelector(navRequestStatusSelector)

  const messageText = founder === AlertFounders.BOOKING ? bookingText
      : founder === AlertFounders.COMMENTS ? commentsText
          : founder === AlertFounders.PROFILE ? profileText
              : founder === AlertFounders.BOOKS ? booksText
                  : founder === AlertFounders.CATEGORIES ? categoriesText : '';
  const typeResponse = (founder === AlertFounders.BOOKING && bookingStatus === RequestStatusType.FULFILLED) ? ResponseStatusReqType.SUCCESS :
      (founder === AlertFounders.COMMENTS && commentsStatus === RequestStatusType.FULFILLED) ? ResponseStatusReqType.SUCCESS :
      (founder === AlertFounders.PROFILE && profileStatus === RequestStatusType.FULFILLED) ? ResponseStatusReqType.SUCCESS :
      (founder === AlertFounders.BOOKS && booksStatus === RequestStatusType.FULFILLED) ? ResponseStatusReqType.SUCCESS :
      (founder === AlertFounders.CATEGORIES && categoriesStatus === RequestStatusType.FULFILLED) ? ResponseStatusReqType.SUCCESS : ResponseStatusReqType.ERROR;

    const onCloseClick = () => {
    dispatch(setAlertOpen(false));
    dispatch(setNullCommentStatus());
    dispatch(setNullStatusBooking());
  };

  useEffect(() => {
    const timer = setTimeout(onCloseClick, 4000);

    return () => clearTimeout(timer);
  });

  return createPortal(
    <TransparentWrapper setVisiblePopup={onCloseClick}>
      <div
        role='presentation'
        onClick={(e) => e.stopPropagation()}
        className={classNames(styles.popup, {[styles.popup__success]: typeResponse !== ResponseStatusReqType.ERROR})}
      >
        <div data-test-id='error' className={styles.popup__content}>
          {typeResponse === ResponseStatusReqType.ERROR ? (
            <img className={styles.popup__error} src={iconError} alt='error' />
          ) : (
            <img className={styles.popup__error} src={iconSuccess} alt='success' />
          )}
          <span className={styles.popup__text}>{messageText as string}</span>
          <img
            data-test-id='alert-close'
            role='presentation'
            onClick={onCloseClick}
            className={styles.popup__close}
            src={iconClose}
            alt='close'
          />
        </div>
      </div>
    </TransparentWrapper>,
    document.body
  );
};
