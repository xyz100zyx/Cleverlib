import { FC, memo, useEffect, useState } from 'react';
import styles from './books-list.module.scss';
import { BookCardReg, BookCardFW } from '../../../../entities';
import { FetchedBooks } from '../../../../../types/data.types';
import { sortBooks } from '../../../../../utils/sort.utils';
import { useAppSelector } from "../../../../../hooks/redux/selectros";
import {
    booksFetchedSelector,
} from "../../../../../store/selectors/book-selectors";
import {
    genresSelector
} from "../../../../../store/selectors/nav-selectors";
import { filterGenreSelector, filterInputSelector, filterSortSelector, filterStateSelector } from "../../../../../store/selectors/filter-selctors";
import { IBooksList } from "./interface";

export const BooksListComponent: FC<IBooksList> = ({ displayTemplate }) => {
    const unfilteredBooks = useAppSelector(booksFetchedSelector);
    const [books, setBooks] = useState<FetchedBooks[]>([]);
    const genres = useAppSelector(genresSelector);
    const inputValue = useAppSelector(filterInputSelector);
    const activeGenre = useAppSelector(filterGenreSelector);
    const sortedType = useAppSelector(filterSortSelector);
    console.log('render book list')

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        const sortedBooks = sortBooks(activeGenre, sortedType, inputValue, genres, unfilteredBooks);
        setBooks(sortedBooks)
    }, [activeGenre, sortedType, inputValue, unfilteredBooks]);

    /* eslint-disable react/jsx-no-useless-fragment */
    return (
        <>
            {books.length ? (
                <ul data-test-id='content' className={displayTemplate === 'linear' ? `${styles.list}` : `${styles.list} ${styles.list_list}`}>
                    {books.map((book) =>
                        displayTemplate === 'linear' ? (
                            <BookCardReg key={book.id} book={book} />
                        ) : (
                            <BookCardFW key={book.id} book={book} />
                        )
                    )}
                </ul>
            ) : inputValue ? (
                <span data-test-id="search-result-not-found" className={styles.non_search}>
                    По запросу ничего не найдено
                </span>
            ) : (
                <span data-test-id="empty-category" className={styles.non_search}>
                    В этой категории книг ещё нет
                </span>)}
        </>
    );
};

export const BooksList = memo(BooksListComponent)
