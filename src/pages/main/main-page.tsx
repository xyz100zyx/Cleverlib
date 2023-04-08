import { FC, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import styles from './main-page.module.scss';
import { FilterBar } from '../../components/widgets/filter-bar/filter-bar';
import { BooksList } from '../../components/widgets/book-list/components/books-list/books-list';
import { DisplayType } from '../../components/types';
import { useThunkDispatch } from '../../hooks/redux/dispatchers';
import { fetchGenres } from '../../store/slices/nav/async-actions';
import { fetchBooks } from '../../store/slices/books/async-actions';
import useEffectOnce from '../../hooks/use-effect-once';
import { BookingPopup } from '../../components/popups/booking-popup';
import { AlertPopup } from '../../components/popups/alert-popup/alert-popup';
import { useAppSelector } from "../../hooks/redux/selectros";
import {
  booksRequestStatusSelector
} from "../../store/selectors/book-selectors";
import { navRequestStatusSelector } from "../../store/selectors/nav-selectors";
import { popupStateSelector } from "../../store/selectors/popup-selectors";
import { AlertFounders, RequestStatusType } from "../../utils/constants";
import { setAlertFounder } from "../../store/slices/popup/popup-slice";
import { profileDataSelector } from "../../store/selectors/profile-selectors";

export const MainPage: FC = () => {
  const [listView, setListView] = useState<DisplayType>('linear');

  const isNeedUpdate = useRef(true);

  const userId = useAppSelector(profileDataSelector)?.id as number;
  const booksStatus = useAppSelector(booksRequestStatusSelector);
  const dispatch = useDispatch()
  const navStatus = useAppSelector(navRequestStatusSelector);
  const { booking, alert } = useAppSelector(popupStateSelector);
  const thunkDispatch = useThunkDispatch();

  useEffectOnce(() => {
    if (isNeedUpdate.current === true) {
      if (navStatus === RequestStatusType.REJECTED || navStatus === null) {
        dispatch(setAlertFounder(AlertFounders.COMMENTS))
        thunkDispatch(fetchGenres());
      }
      if (booksStatus === null || booksStatus === RequestStatusType.REJECTED) {
        dispatch(setAlertFounder(AlertFounders.BOOKS))
        thunkDispatch(fetchBooks());
      }
      isNeedUpdate.current = false;
    }
  });

  return (
    <div data-test-id='main-page' className={styles.wrapper}>
      {booksStatus === RequestStatusType.FULFILLED && navStatus === RequestStatusType.FULFILLED && (
        <>
          <FilterBar displayState={listView} onViewManagerClick={setListView} />
          <BooksList displayTemplate={listView} />
        </>
      )}
      {booking && <BookingPopup />}
      {alert && (
        <AlertPopup dataTestId='response-status' />
      )}
    </div>
  );
};
