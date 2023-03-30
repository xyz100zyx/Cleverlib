import { FC, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../store/store';
import { fetchBookById } from '../../store/slices/books/async-actions';
import { BookSection } from '../../components';
import { BookReview } from '../../components/widgets/book-review/book-review';
import styles from './book-page.module.scss';
import iconDivider from '../../assets/link-divider.svg';
import { ReactComponent as IconStarFill } from '../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../assets/star-icon-unfill.svg';
import { ReactComponent as IconChevronVisible } from '../../assets/icon_chevron_visible.svg';
import { useThunkDispatch } from '../../hooks/redux/dispatchers';
import { nullableStatus, setBookClickedFromMain } from '../../store/slices/books/book-slice';
import { getCategoryName, getCurrentCategoryId } from '../../utils/categories.utils';
import { fetchGenres } from '../../store/slices/nav/async-actions';
import { changeInputValue, changeActiveGenre } from '../../store/slices/filter/filter-slice';
import { BookDetails } from '../../components/widgets/book-details';
import { ReviewPopup } from '../../components/popups/review/review';
import { AlertPopup } from '../../components/popups/alert-popup/alert-popup';
import { BookingPopup } from '../../components/popups/booking-popup';
import { getAlertType, getTextAlert } from '../../utils/alert';
import { sortComments } from '../../utils/sort.utils';
import { hasMyReview } from './helpers';
import {useAppSelector} from "../../hooks/redux/selectros";
import {navRequestStatusSelector, navStateSelector} from "../../store/selectors/nav-selectors";
import {isReviewPopupSelector, popupStateSelector} from "../../store/selectors/popup-selectors";
import {booksStateSelector} from "../../store/selectors/book-selectors";
import {AlertFounders, RequestStatusType} from "../../utils/constants";
import {setAlertFounder} from "../../store/slices/popup/popup-slice";
import {profileDataSelector} from "../../store/selectors/profile-selectors";
import {getLocalStorageItem} from "../../utils/storage.utils";

export const BookPage: FC = () => {
  const [isVisibleComments, setVisibleComments] = useState(true);
  const [isOpenReviewPop, setOpenReviewPop] = useState(false);

  const isNeedFirstUpdate = useRef(true);
  const isNeedSecondUpdate = useRef(true);

  const userId = useAppSelector(profileDataSelector)?.id as number || Number(getLocalStorageItem('userId'));
  const { booksId, category } = useParams();
  const { genres } = useAppSelector(navStateSelector);
  const { alert, booking } = useAppSelector(popupStateSelector);
  const navStatus = useAppSelector(navRequestStatusSelector);
  const { book, books, status } = useAppSelector(booksStateSelector);
  const { activeGenre } = useSelector((state: RootState) => state.filter);
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
    thunkDispatch(fetchBookById(Number(booksId!)));
      dispatch(setAlertFounder(AlertFounders.BOOKS))
    dispatch(changeInputValue(''));

    if (navStatus === RequestStatusType.REJECTED || navStatus === null) {
        dispatch(setAlertFounder(AlertFounders.CATEGORIES))
      thunkDispatch(fetchGenres());
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
          <img src={iconDivider} alt='link divider' />
          <a data-test-id='book-name' className={styles.nav__link} href='#'>
            {book?.title}
          </a>
        </span>
      </div>
      <BookSection book={book!} />
      <div
        className={
          book?.images && book?.images.length < 2
            ? `${styles.page__rating}`
            : `${styles.page__rating} ${styles.page__rating__with}`
        }
      >
        <h5 className={styles.section__label}>Рейтинг</h5>
        <div className={styles.rating__wrapper}>
          <ul data-test-id='rating' className={styles.rating}>
            {book?.rating
              ? [...Array(5)].map((_, index) => (
                  <li data-test-id='star'>
                    {index < Math.round(book?.rating as number) ? (
                      <IconStarFill data-test-id='star-active' key={(book?.ISBN || 'qwertyuio')[index]} />
                    ) : (
                      <IconStarUnfill key={(book?.ISBN || 'qwertyuio')[index]} />
                    )}
                  </li>
                ))
              : [...Array(5)].map((_, index) => (
                  <li data-test-id='star'>
                    <IconStarUnfill key={(book?.ISBN || 'qwertyuio')[index]} />
                  </li>
                ))}
          </ul>
          <h5 className={styles.rating__text}>{book?.rating || 'ещё нет оценок'}</h5>
        </div>
      </div>
      <BookDetails book={book!} />
      <div className={styles.reviews}>
        <h5
          className={
            isVisibleComments ? `${styles.section__label}` : `${styles.section__label} ${styles.section__label__trans}`
          }
        >
          <p>
            Отзывы<span>{book?.comments?.length}</span>
          </p>
          <div
            data-test-id='button-hide-reviews'
            role='presentation'
            onClick={() => setVisibleComments((prev) => !prev)}
          >
            <IconChevronVisible />
          </div>
        </h5>
        {isVisibleComments && book?.comments && (
          <ul data-test-id='reviews' className={styles.reviews__list}>
            {sortComments(book?.comments).map((comment) => (
              <BookReview key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
      </div>
      <button
        disabled={!hasMyReview(book?.comments || [], userId)}
        data-test-id='button-rate-book'
        onClick={onAddReviewBtnClick}
        type='button'
        className={classNames(styles.button, {[styles.button_added]: hasMyReview(book?.comments || [], userId)})}
      >
          {hasMyReview(book?.comments || [], userId) ? 'изменить оценку' : 'оценить книгу'}
      </button>
      {isOpenReviewPop || isReviewOpen && <ReviewPopup id={Number(booksId!)} setVisiblePopup={setOpenReviewPop} />}
      {alert && (
        <AlertPopup dataTestId='response-status' />
      )}
      {booking && <BookingPopup customer={Number(userId!)} action='create' />}
    </section>
  ) : (
    <div />
  );
};
