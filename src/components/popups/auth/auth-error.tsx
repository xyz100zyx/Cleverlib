import {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './auth.module.scss';
import {setAllNull} from "../../../store/slices/auth/auth-slice";
import { RootState } from '../../../store/store';
import { useThunkDispatch } from '../../../hooks/redux/dispatchers';
import { registration } from '../../../store/slices/auth/async-actions';
import {AuthRoutesEndpoints} from "../../../utils/constants";

export const AuthErrorPopup: FC = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname.slice(1)
    const navigate = useNavigate()
    const {error} = useSelector((state: RootState) => state.auth)
    const thunkDispatch = useThunkDispatch()
    const {regData} = useSelector((state: RootState) => state.register)

    const onButtonLoginRepeatClick = () => {
        dispatch(setAllNull())
    }

    const onButtonRegisterRepeatClick = () => {
        dispatch(setAllNull())
        if(error?.error.status === 400){
            navigate(`/${AuthRoutesEndpoints.REGISTRATION}`)
        }else{
            thunkDispatch(registration(regData))
        }
    }

    const onButtonResetRepeat = () => {
        dispatch(setAllNull())
    }

    if(path === AuthRoutesEndpoints.REGISTRATION && error?.error?.status===400){
        return (
            <div data-test-id='status-block' className={styles.popup}>
                <p className={styles.popup__title}>Данные не сохранились</p>
                <p className={styles.popup__subtitle}>Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail</p>
                <button onClick={onButtonRegisterRepeatClick} type='button' className={styles.popup__btn}>назад к регистрации</button>
            </div>
        )
    }

    if(path === AuthRoutesEndpoints.REGISTRATION){
        return (
            <div data-test-id='status-block' className={styles.popup}>
                <p className={styles.popup__title}>Данные не сохранились</p>
                <p className={styles.popup__subtitle}>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</p>
                <button onClick={onButtonRegisterRepeatClick} type='button' className={styles.popup__btn}>повторить</button>
            </div>
        )
    }

    if(path === AuthRoutesEndpoints.LOGIN && error?.error?.status!==400){
        return (
            <div data-test-id='status-block' className={styles.popup}>
                <p className={styles.popup__title}>Вход не выполнен</p>
                <p className={styles.popup__subtitle}>Что-то пошло не так. Попробуйте ещё раз</p>
                <button onClick={onButtonLoginRepeatClick} type='button' className={styles.popup__btn}>Повторить</button>
            </div>
        )
    }

    if(path=== AuthRoutesEndpoints.FORGOT_PASS && location.search ){
        return (
            <div data-test-id='status-block' className={styles.popup}>
                <p className={styles.popup__title}>Данные не сохранились</p>
                <p className={styles.popup__subtitle}>Что-то пошло не так. Попробуйте ещё раз</p>
                <button onClick={onButtonLoginRepeatClick} type='button' className={styles.popup__btn}>Повторить</button>
            </div>
        )
    }

    return (
        <div data-test-id='status-block' className={styles.popup}>
            <p className={styles.popup__title}>Вход не выполнен</p>
            <p className={styles.popup__subtitle}>Что-то пошло не так. Попробуйте ещё раз</p>
            <button onClick={onButtonLoginRepeatClick} type='button' className={styles.popup__btn}>Повторить</button>
        </div>
    )
}
