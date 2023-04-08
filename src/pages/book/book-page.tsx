import {FC, useEffect, useRef, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import {fetchBookById} from '../../store/slices/books/async-actions';
import {BookSection} from '../../components';
import styles from './book-page.module.scss';
import iconDivider from '../../assets/link-divider.svg';
import {useThunkDispatch} from '../../hooks/redux/dispatchers';
import {nullableStatus, setBookClickedFromMain} from '../../store/slices/books/book-slice';
import {getCategoryName, getCurrentCategoryId} from '../../utils/categories.utils';
import {fetchGenres} from '../../store/slices/nav/async-actions';
import {changeInputValue, changeActiveGenre} from '../../store/slices/filter/filter-slice';
import {BookDetails} from '../../components/widgets/book-details';
import {ReviewPopup} from '../../components/popups/review/review';
import {AlertPopup} from '../../components/popups/alert-popup/alert-popup';
import {BookingPopup} from '../../components/popups/booking-popup';
import {hasMyReview} from './helpers';
import {useAppSelector} from "../../hooks/redux/selectros";
import {
    genresSelector,
    navRequestStatusSelector,
} from "../../store/selectors/nav-selectors";
import {isReviewPopupSelector, popupStateSelector} from "../../store/selectors/popup-selectors";
import {booksStateSelector} from "../../store/selectors/book-selectors";
import {AlertFounders, RequestStatusType} from "../../utils/constants";
import {setAlertFounder} from "../../store/slices/popup/popup-slice";
import {profileDataSelector} from "../../store/selectors/profile-selectors";
import {getLocalStorageItem} from "../../utils/storage.utils";
import {BookRating} from "./components/book-rating";
import {BookReviews} from "./components/book-reviews";
import {activeGenreSelector} from "../../store/selectors/filter-selctors";

export const BookPage: FC = () => {
    const [isOpenReviewPop, setOpenReviewPop] = useState(false);

    const isNeedFirstUpdate = useRef(true);
    const isNeedSecondUpdate = useRef(true);
    const isNeedThirdUpdate = useRef(true);

    const userId = useAppSelector(profileDataSelector)?.id as number || Number(getLocalStorageItem('userId'));
    const {booksId, category} = useParams();
    const genres = useAppSelector(genresSelector);
    const {alert, booking} = useAppSelector(popupStateSelector);
    const navStatus = useAppSelector(navRequestStatusSelector);
    const {book, books, status} = useAppSelector(booksStateSelector);
    const isActiveButtonReview = book?.comments && !hasMyReview(book.comments || [], userId);
    const activeGenre = useAppSelector(activeGenreSelector)
    const isReviewOpen = useAppSelector(isReviewPopupSelector);
    const thunkDispatch = useThunkDispatch();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLinkClick = () => {
        dispatch(nullableStatus());
    };

    const onAddReviewBtnClick = () => {
        setOpenReviewPop(true);
    };

    /* eslint-disable react-hooks/exhaustive-deps */

    useEffect(() => {
        if (isNeedFirstUpdate.current === true) {
            dispatch(setAlertFounder(AlertFounders.BOOKS))
            thunkDispatch(fetchBookById(Number(booksId!)));
            dispatch(changeInputValue(''));

            if (navStatus === RequestStatusType.REJECTED || navStatus === null) {
                dispatch(setAlertFounder(AlertFounders.CATEGORIES))
                thunkDispatch(fetchGenres());
            }

            isNeedFirstUpdate.current = false;
        }
    }, [dispatch, thunkDispatch, navStatus, booksId]);

    useEffect(() => {
        if (isNeedSecondUpdate.current === true) {
            dispatch(changeInputValue(''));
            isNeedSecondUpdate.current = false;
        }
        if (!books.length) {
            dispatch(changeActiveGenre(getCurrentCategoryId(category!, genres)!));
        }
    }, [genres]);

    useEffect(() => {
        dispatch(setBookClickedFromMain(null));
        if (!localStorage.getItem('token')) navigate('/auth');
    }, []);

    useEffect(() => {
        if(isNeedThirdUpdate.current){
            thunkDispatch(fetchBookById(Number(booksId!)));
            dispatch(setAlertFounder(AlertFounders.BOOKS))
            dispatch(changeInputValue(''));

            if (navStatus === RequestStatusType.REJECTED || navStatus === null) {
                dispatch(setAlertFounder(AlertFounders.CATEGORIES))
                thunkDispatch(fetchGenres());
            }
        }
    }, [booksId]);

    return status === RequestStatusType.FULFILLED ? (
        <section className={styles.page}>
            <div className={styles.nav}>
        <span className={styles.nav__links}>
          <Link
              data-test-id='breadcrumbs-link'
              onClick={onLinkClick}
              to={`/books/${category}`}
              className={styles.nav__link}
          >
            {activeGenre === 0 && books.length ? 'Все книги' : getCategoryName(category!, genres)}
          </Link>
          <img src={iconDivider} alt='link divider'/>
          <a data-test-id='book-name' className={styles.nav__link} href='#'>
            {book?.title}
          </a>
        </span>
            </div>
            <BookSection book={book!}/>
            <BookRating images={book?.images || null} rating={book?.rating || null}
                        ISBN={book?.ISBN || ''}/>
            <BookDetails book={book!}/>
            <BookReviews comments={book?.comments}/>
            <button
                disabled={!isActiveButtonReview}
                data-test-id='button-rate-book'
                onClick={onAddReviewBtnClick}
                type='button'
                className={classNames(styles.button, {[styles.button_added]: hasMyReview(book?.comments || [], userId)})}
            >
                {hasMyReview(book?.comments || [], userId) ? 'изменить оценку' : 'оценить книгу'}
            </button>
            {(isOpenReviewPop || isReviewOpen) &&
                <ReviewPopup id={Number(booksId!)} setVisiblePopup={setOpenReviewPop}/>}
            {alert && (
                <AlertPopup dataTestId='response-status'/>
            )}
            {booking && <BookingPopup customer={Number(userId!)} action='create'/>}
        </section>
    ) : (
        <div/>
    );
};
