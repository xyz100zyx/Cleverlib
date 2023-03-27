import { FC, useRef } from 'react';
import {useDispatch} from "react-redux";
import styles from './book-section.module.scss';
import { SliderImages } from '../../entities';
import {setBookingOpen} from "../../../store/slices/popup/popup-slice";
import {getDeliveredDate} from "../../../utils/date.utils";
import {useAppSelector} from "../../../hooks/redux/selectros";
import {IBookSection} from "./interface";
import {profileDataSelector} from "../../../store/selectors/profile-selectors";
import {getLocalStorageItem} from "../../../utils/storage.utils";
import {bookFetchedSelector} from "../../../store/selectors/book-selectors";

export const BookSection: FC<IBookSection> = ({ book }) => {
  const bookRef = useRef<HTMLDivElement>(null);
  const userId = useAppSelector(profileDataSelector)?.id || Number(getLocalStorageItem('userId')!)
    const bookFromStore = useAppSelector(bookFetchedSelector)
    const dispatch = useDispatch()

    const onBookingButtonClick = () => {
        dispatch(setBookingOpen(true))
    }

    return (
    <div ref={bookRef} className={styles.book}>
      <div className={styles.book__header}>
        <div className={styles.images}>
          <SliderImages images={book?.images} />
        </div>
        <div className={styles.book_info}>
          <h3 data-test-id='book-title' className={styles.book__title}>{book?.title}</h3>
          <p className={styles.book__author}>
            {book?.authors && book.authors.map((author, index) => (index !== 0 ? `${author}, ` : `${author}`))},{' '}
            {book?.issueYear}
          </p>
          <button
              data-test-id='booking-button'
            type='button'
            className={
                (book?.delivery || (book?.booking?.customerId !== userId && book?.booking))
                ? `${styles.book__action} ${styles.book__action__delivery}`
                : book?.booking
                ? `${styles.book__action} ${styles.book__action__booking}`
                : styles.book__action
            }
            disabled={(book?.booking?.customerId !== userId && !!book?.booking?.customerId) || (book?.delivery?.recipientId!==userId && !!book?.delivery?.recipientId)}
            onClick={onBookingButtonClick}
          >
            {book?.delivery
              ? `ЗАНЯТА ДО ${getDeliveredDate(book?.delivery?.dateHandedTo)}`
              : book?.booking
              ? 'ЗАБРОНИРОВАНА'
              : 'ЗАБРОНИРОВАТЬ'}
          </button>
          <div className={styles.book__header__desc}>
            <h5>О книге</h5>
            <p>{book?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.book__footer}>
        <h5>О книге</h5>
        <p className={styles.book__description}>{book?.description}</p>
      </div>
    </div>
  );
};
