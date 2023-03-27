import {FC, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import classNames from "classnames";
import styles from './response-status.module.scss';
import iconError from '../../../assets/error-circle.svg';
import iconSuccess from '../../../assets/CheckCircle.svg';
import iconClose from '../../../assets/error-close.svg';
import { nullableStatus } from '../../../store/slices/books/book-slice';
import { nullableCategoryStatus } from '../../../store/slices/nav/nav-slice';
import {ResponseStatus} from "./interface";
import {ResponseStatusReqType} from "../../../utils/constants";

export const ResponseStatusPopup: FC<ResponseStatus> = ({text, type, dataTestId}) => {

    const dispatch = useDispatch()

    const onCloseClick = () => {
        dispatch(nullableCategoryStatus())
        dispatch(nullableStatus())
    }

    useEffect(() => {
        const timer = setTimeout(onCloseClick, 4000);

        return () => clearTimeout(timer);
    });

    return (
        <div className={classNames(styles.popup, {[styles.popup__success]: type !== ResponseStatusReqType.ERROR})}>
            <div data-test-id={dataTestId} className={styles.popup__content}>
                {type === ResponseStatusReqType.ERROR ? <img className={styles.popup__error} src={iconError} alt="error" /> : <img className={styles.popup__error} src={iconSuccess} alt="success" />}
                <span className={styles.popup__text}>{text}</span>
                <img role="presentation" onClick={onCloseClick} className={styles.popup__close} src={iconClose} alt="close" />
            </div>
        </div>
    )
}
