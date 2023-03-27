import { FC } from 'react';
import {useDispatch} from "react-redux";
import { Rating } from '../../../../common';
import styles from './book-card.module.scss';
import unbookImg from '../../../../../assets/unbook-img.jpg';
import { BookButton } from '../book-button/book-button';
import { getDeliveredDate } from '../../../../../utils/date.utils';
import {AlertFounders, HOST} from '../../../../../utils/constants';
import {IBookCard} from "./interface";
import {useThunkDispatch} from "../../../../../hooks/redux/dispatchers";
import {
    setAlertFounder,
    setAlertOpen,
} from "../../../../../store/slices/popup/popup-slice";
import {deleteBookingAndUpdate, getMe} from "../../../../../store/slices/profile/async-actions";
import {useAppSelector} from "../../../../../hooks/redux/selectros";
import {profileDataSelector} from "../../../../../store/selectors/profile-selectors";


export const BookCardFW: FC<IBookCard> = ({ book , bookInfoProfile, isForProfile = false, isForProfileData = false, dateReturnBook}) => {

    const thunkDispatch = useThunkDispatch()
    const dispatch = useDispatch()
    const profile = useAppSelector(profileDataSelector)

    const onDeleteBookingButtonClick = () => {
        dispatch(setAlertFounder(AlertFounders.PROFILE))
        thunkDispatch(deleteBookingAndUpdate({id: profile?.booking?.id as number})).then(() => {
            dispatch(setAlertOpen(true));
        })
    }

    return !isForProfile ? (
        <div data-test-id='card' className={styles.card}>
            <img className={styles.card__img} src={book?.image?.url ? `${HOST}${book?.image?.url}` : unbookImg} alt='book' />
            <div className={styles.card__right}>
                <p className={styles.card__title}>{book?.title}</p>
                <p className={styles.card__authors}>
                    {book?.authors.map((author, index) =>
                        index  ? (
                            <span className={styles.author}>, {author}</span>
                        ) : (
                            <span className={styles.author}>{author}</span>
                        )
                    )}
                    , {book?.issueYear}
                </p>
                <div className={styles.card__bottom}>
                    <div className={styles.card__rating}>
                        {book?.rating ? <Rating rating={book?.rating} /> : <p>ещё нет оценок</p>}
                    </div>
                    <BookButton
                        book={book!}
                        text={
                            book?.booking?.order
                                ? 'ЗАБРОНИРОВАНА'
                                : !book?.delivery?.handed
                                    ? 'ЗАБРОНИРОВАТЬ'
                                    : `ЗАНЯТА ДО ${getDeliveredDate(book.delivery?.dateHandedTo)}`
                        }
                        type={
                            !book?.booking?.order && !book?.delivery?.handed
                                ? 'available'
                                : book.delivery?.handed
                                    ? 'unavailable'
                                    : 'added'
                        }
                        displayType='vertical'
                    />
                </div>
            </div>
        </div>
    ) : (
        <div data-test-id='card' className={styles.card}>
            <img className={styles.card__img} src={bookInfoProfile?.image ? `${HOST}${book?.image}` : unbookImg} alt='book' />
            <div className={styles.card__right}>
                <p className={styles.card__title}>{bookInfoProfile?.title}</p>
                <p className={styles.card__authors}>
                    {bookInfoProfile?.authors.map((author, index) =>
                        index  ? (
                            <span className={styles.author}>, {author}</span>
                        ) : (
                            <span className={styles.author}>{author}</span>
                        )
                    )}
                    , {bookInfoProfile?.issueYear}
                </p>
                <div className={styles.card__bottom}>
                    <div className={styles.card__rating}>
                        {bookInfoProfile?.rating ? <Rating rating={bookInfoProfile?.rating} /> : <p>ещё нет оценок</p>}
                    </div>
                    {!isForProfileData ? <button data-test-id='cancel-booking-button' onClick={onDeleteBookingButtonClick} className={styles.delete} type='button'>Отмнеить бронь</button> :
                        <span className={styles.card__bottom_date}>{dateReturnBook}</span>}
                </div>
            </div>
        </div>
    );
}
