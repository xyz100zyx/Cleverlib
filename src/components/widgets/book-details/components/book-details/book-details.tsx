import { FC } from 'react';
import { BookDetailsList } from '../details-list/details-list';
import styles from './book-details.module.scss';
import {IBookDetails} from "./interface";

export const BookDetails: FC<IBookDetails> = ({book}) => (
    <div className={styles.detailed}>
      <h5 className={styles.section__label}>Подробная иформация</h5>
      <BookDetailsList book={book} />
    </div>
  );
