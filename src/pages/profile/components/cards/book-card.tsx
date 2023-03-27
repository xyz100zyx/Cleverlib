import {FC} from 'react';
import classNames from "classnames";
import {IBookCard} from "./interface";
import styles from './styles.module.scss'

export const BookCard: FC <IBookCard> = ({children}) => (
    <div className={classNames(styles.book_wrapper)}>
        {children}
    </div>
)
