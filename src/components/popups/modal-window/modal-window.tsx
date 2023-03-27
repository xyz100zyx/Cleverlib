import { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { closeBurgerNav } from '../../../store/slices/popup/popup-slice';
import { BurgerNav } from '../burger';
import { ResponseStatusPopup } from '../response-status/response-status';
import styles from './modal-window.module.scss';
import {useAppSelector} from "../../../hooks/redux/selectros";
import {isBurgerNavPopupSelector} from "../../../store/selectors/popup-selectors";
import {navRequestStatusSelector} from "../../../store/selectors/nav-selectors";
import {booksRequestStatusSelector} from "../../../store/selectors/book-selectors";
import {RequestStatusType, ResponseStatusReqType, ABSTRACT_ERROR_TEXT} from "../../../utils/constants";

export const ModalWindow: FC = () => {
  const dispatch = useDispatch();
  const isBurgerNavOpen = useAppSelector(isBurgerNavPopupSelector);
  const statusCategory = useAppSelector(navRequestStatusSelector);
  const bookStatus = useAppSelector(booksRequestStatusSelector);
  const isError = statusCategory === RequestStatusType.REJECTED || bookStatus === RequestStatusType.REJECTED;
  const isVisible = isBurgerNavOpen || statusCategory === RequestStatusType.REJECTED || bookStatus === RequestStatusType.REJECTED;

  const onWindowClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeBurgerNav());
    }
  };

  return (
    <div
      role='presentation'
      onClick={(e) => onWindowClick(e)}
      className={
        isError
          ? `${styles.window} ${styles.window__error}`
          : isVisible
          ? styles.window
          : `${styles.window} ${styles.window__none}`
      }
    >
      <BurgerNav />
      {isError && <ResponseStatusPopup dataTestId='error' type={ResponseStatusReqType.ERROR} text={ABSTRACT_ERROR_TEXT} />}
    </div>
  );
};
