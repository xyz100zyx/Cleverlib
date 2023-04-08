import {FC, useState} from 'react';
import {IBookReviews} from "./interface";
import styles from "../../book-page.module.scss";
import {sortComments} from "../../../../utils/sort.utils";
import {BookReview} from "../../../../components";
import { ReactComponent as IconChevronVisible } from '../../../../assets/icon_chevron_visible.svg';

export const BookReviews: FC<IBookReviews> = ({comments}) => {

    const [isVisibleComments, setVisibleComments] = useState(true);

    return (
        <div className={styles.reviews}>
            <h5
                className={
                    isVisibleComments ? `${styles.section__label}` : `${styles.section__label} ${styles.section__label__trans}`
                }
            >
                <p>
                    Отзывы<span>{comments?.length}</span>
                </p>
                <div
                    data-test-id='button-hide-reviews'
                    role='presentation'
                    onClick={() => setVisibleComments((prev) => !prev)}
                >
                    <IconChevronVisible />
                </div>
            </h5>
            {isVisibleComments && comments && (
                <ul data-test-id='reviews' className={styles.reviews__list}>
                    {sortComments(comments).map((comment) => (
                        <BookReview key={comment.id} comment={comment} />
                    ))}
                </ul>
            )}
        </div>
    )
}
