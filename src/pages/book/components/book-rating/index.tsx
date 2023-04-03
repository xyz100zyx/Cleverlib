import {FC} from 'react';
import styles from "../../book-page.module.scss";
import {IBookRating} from "./interface";
import { ReactComponent as IconStarFill } from '../../../../assets/star-icon.svg';
import { ReactComponent as IconStarUnfill } from '../../../../assets/star-icon-unfill.svg';

export const BookRating: FC<IBookRating> = ({rating, ISBN, images}) => (
    <div
        className={
            images && images.length < 2
                ? `${styles.page__rating}`
                : `${styles.page__rating} ${styles.page__rating__with}`
        }
    >
        <h5 className={styles.section__label}>Рейтинг</h5>
        <div className={styles.rating__wrapper}>
            <ul data-test-id='rating' className={styles.rating}>
                {rating
                    ? [...Array(5)].map((_, index) => (
                        <li data-test-id='star'>
                            {index < Math.round(rating as number) ? (
                                <IconStarFill data-test-id='star-active' key={(ISBN || 'qwertyuio')[index]} />
                            ) : (
                                <IconStarUnfill key={(ISBN ? ISBN : 'qwertyuio')[index]} />
                            )}
                        </li>
                    ))
                    : [...Array(5)].map((_, index) => (
                        <li data-test-id='star'>
                            <IconStarUnfill key={(ISBN ? ISBN : 'qwertyuio')[index]} />
                        </li>
                    ))}
            </ul>
            <h5 className={styles.rating__text}>{rating || 'ещё нет оценок'}</h5>
        </div>
    </div>
)
