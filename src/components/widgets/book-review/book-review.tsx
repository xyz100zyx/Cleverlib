import { FC } from 'react';
import styles from './book-review.module.scss';
import userReviewImg from '../../../assets/user-review.jpg';
import { ReactComponent as IconStarFill } from '../../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../../assets/star-icon-unfill.svg';
import { getCommentDate } from '../../../utils/date.utils';
import {IBookReview} from "./interface";

export const BookReview: FC<IBookReview> = ({ comment }) => (
  <div data-test-id='comment-wrapper' className={styles.comment}>
    <div className={styles.comment__user}>
      <a href='#'>
        <img src={userReviewImg} alt='comment info' />
      </a>
      <span className={styles.user}>
        <span data-test-id='comment-author' className={styles.comment__name}>
          {comment.user.firstName} {comment.user.lastName}
        </span>
        <span data-test-id='comment-date' className={styles.comment__date}>{getCommentDate(comment.createdAt)}</span>
      </span>
    </div>
    <ul data-test-id='rating' className={styles.comment__rating}>
      {[...Array(5)].map((_, index) =>
        index < Math.round(comment.rating) ? (
          <li data-test-id='star' key={`${comment.text[index]} ${Math.random() * 10}`}>
            <IconStarFill data-test-id='star-active' />
          </li>
        ) : (
          <li data-test-id='star' key={`${comment.text[index]} ${Math.random() * 10}`}>
            <IconStarUnfill key={comment.text[index]}/>
          </li>
        )
      )}
    </ul>
    {comment.text && <p data-test-id='comment-text' className={styles.comment__body}>{comment.text}</p>}
  </div>
);
