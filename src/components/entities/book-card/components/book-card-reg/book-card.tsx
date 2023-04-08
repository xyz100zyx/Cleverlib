import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import { RootState } from "../../../../../store/store";
import styles from './book-card.module.scss';
import { Rating } from '../../../../common';
import unbookImg from '../../../../../assets/unbook-img.jpg';
import { BookButton } from '../book-button/book-button';
import { getDeliveredDate } from '../../../../../utils/date.utils';
import { HOST } from '../../../../../utils/constants';
import { LightText } from '../../../../common/light-text/light-text';
import { IBookCard } from "./interface";
import { setBookClickedFromMain } from "../../../../../store/slices/books/book-slice";
import { ReviewPopup } from "../../../../popups/review/review";
import { useAppSelector } from "../../../../../hooks/redux/selectros";
import { profileDataSelector } from "../../../../../store/selectors/profile-selectors";
import {
    setIsReviewedByUser,
    setOpenReviewPopup
} from "../../../../../store/slices/popup/popup-slice";


export const BookCardReg: FC<IBookCard> = ({ book, bookForHistory, isForProfileHistory, isReviewedByUser = false, commentId }) => {
    const navigate = useNavigate();
    const [isOpenReviewPopup, setReviewPopup] = useState(false)
    const { genres } = useSelector((state: RootState) => state.nav);
    const { inputValue, activeGenre } = useSelector((state: RootState) => state.filter);
    const userId = useAppSelector(profileDataSelector)?.id as number
    const dispatch = useDispatch()

    console.log('render card of book')

    const onCardClick = () => {
        dispatch(setBookClickedFromMain(book!))
        if (isReviewedByUser) {
            dispatch(setIsReviewedByUser(true))
        }
        navigate(`/books/${genres[activeGenre].path}/${book ? book?.id : bookForHistory?.id}`);
    };

    const lightText = useCallback((title: string) => (LightText(inputValue, title, 'highlight-matches')), [inputValue])

    const onAddReviewButtonClick = (e: React.MouseEvent) => {
        /* e.preventDefault()
        e.stopPropagation(); */
        if (isReviewedByUser) {
            dispatch(setIsReviewedByUser(true))
        }
        setReviewPopup(true)
        dispatch(setOpenReviewPopup(true))
        /* e.stopPropagation(); */
    }

    return !isForProfileHistory ? (
        <div data-test-id='card' role='presentation' onClick={onCardClick} className={styles.card}>
            <img className={styles.img}
                src={book?.image?.url ? `${HOST}${book.image?.url}` : unbookImg} alt='book' />
            <div className={styles.rating}>{book?.rating ? <Rating rating={book?.rating} /> :
                <p>ещё нет оценок</p>}</div>
            <div className={styles.card__title}>
                <span>{lightText(book?.title as string)}</span>
            </div>
            <p
                className={
                    book?.authors.length !== 1 ? `${styles.card__authors}` : `${styles.card__authors} ${styles.card__authors_flex}`
                }
            >
                {book?.authors.map((author, index) =>
                    index ? (
                        <span key={Math.round(index)} className={styles.author}>
                            ,<br />
                            {author}
                        </span>
                    ) : (
                        <span key={Math.round(index)} className={styles.author}>
                            {author}
                        </span>
                    )
                )}
                , {book?.issueYear}
            </p>
            <BookButton
                book={book!}
                text={
                    book?.booking?.order
                        ? 'ЗАБРОНИРОВАНА'
                        : !book?.delivery
                            ? 'ЗАБРОНИРОВАТЬ'
                            : `ЗАНЯТА ДО ${getDeliveredDate(book.delivery?.dateHandedTo)}`
                }
                type={
                    !book?.booking && !book?.delivery ? 'available' : (book.delivery?.dateHandedTo || (book.booking?.customerId !== userId && book.booking)) ? 'unavailable' : 'added'
                }
                displayType='linear'
            />
        </div>
    ) : (
        <div data-test-id='card' role='presentation' onClick={onCardClick} className={classNames(styles.card, styles.card__profile)}>
            <img className={classNames(styles.img, styles.img__profile)}
                src={bookForHistory?.image ? `${HOST}${bookForHistory.image}` : unbookImg} alt='book' />
            <div className={styles.rating}>{bookForHistory?.rating ? <Rating rating={bookForHistory?.rating} /> :
                <p>ещё нет оценок</p>}</div>
            <div className={styles.card__title}>
                <span>{bookForHistory?.title}</span>
            </div>
            <p
                className={
                    bookForHistory?.authors.length !== 1 ? `${styles.card__authors}` : `${styles.card__authors} ${styles.card__authors_flex}`
                }
            >
                {bookForHistory?.authors.map((author, index) =>
                    index ? (
                        <span key={Math.round(index)} className={styles.author}>
                            ,<br />
                            {author}
                        </span>
                    ) : (
                        <span key={Math.round(index)} className={styles.author}>
                            {author}
                        </span>
                    )
                )}
                , {bookForHistory?.issueYear}
            </p>
            <button data-test-id='history-review-button' onClick={(e) => onAddReviewButtonClick(e)} className={classNames(styles.card__action, styles.card__action__profile, { [styles.card__action_added]: isReviewedByUser })} type='button'>
                {isReviewedByUser ? 'Изменить оценку' : 'Оставить отзыв'}
            </button>
            {isOpenReviewPopup && <ReviewPopup commentId={commentId} isReviewedByUser={isReviewedByUser} setVisiblePopup={setReviewPopup} id={bookForHistory?.id as number} />}
        </div>
    );
};
