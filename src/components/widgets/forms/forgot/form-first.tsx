import {yupResolver} from '@hookform/resolvers/yup';
import {FC, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SubmitHandler} from 'react-hook-form/dist/types';
import {Navigate, useLocation} from 'react-router-dom';
import {useThunkDispatch} from '../../../../hooks/redux/dispatchers';
import {rememberPassword} from '../../../../store/slices/auth/async-actions';
import {forgotSchemaFirst} from '../../../../utils/validations/forgot.validation';
import {Input} from '../../../common/input/input';
import styles from './forgot-form.module.scss';
import {ForgotFormSecond} from "./form-second";
import {ColoredError} from "../register-steps/components/colored-error";
import {useAppSelector} from "../../../../hooks/redux/selectros";
import {authStateSelector} from "../../../../store/selectors/auth-selectors";
import {IFormForgotFirst} from "./interface";
import {getLocalStorageItem} from "../../../../utils/storage.utils";

export const ForgotFormFirst: FC = () => {
    const {register, handleSubmit, getFieldState, watch, getValues} = useForm<IFormForgotFirst>({
        resolver: yupResolver(forgotSchemaFirst),
        mode: 'onChange',
    });

    const [focus, setFocus] = useState(false);
    const [isTouched, setTouched] = useState(false);
    const {error} = useAppSelector(authStateSelector);
    const location = useLocation()
    const thunkDispatch = useThunkDispatch();
    const hasJwtToken = !!getLocalStorageItem('token')
    const hasSearchParams = !!location.search;

    const onSubmit: SubmitHandler<IFormForgotFirst> = (data) => {
        thunkDispatch(rememberPassword(data))
    };

    const onToggleFocus = () => {
        setFocus(prev => !prev);
        if (!isTouched) {
            setTouched(true)
        }
    }

    useEffect(() => {
        watch();
    }, [watch]);

    return hasJwtToken ? <Navigate to='/'/> : !hasSearchParams ? (
        <>
            <p className={styles.title}>Восстановление пароля</p>
            <form data-test-id='send-email-form' className={styles.form}
                  onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('email')}
                        label='email'
                        labelText='E-mail'
                        register={register('email')}
                        required={true}
                        name='email'
                        setFocus={onToggleFocus}
                    />
                    {getValues('email') && getFieldState('email').error?.message === 'Введите корректный e-mail' && (
                        <ColoredError dataTestId='hint'
                                      text={getFieldState('email').error?.message || ''}/>
                    )}
                    {!getFieldState('email').error && !error &&
                        (!focus && getValues('email') && !isTouched) &&
                        <p data-test-id='hint' className={styles.form__prompt}>На это email будет
                            отправлено письмо с
                            инструкциями по восстановлению пароля</p>}
                    {getValues('email') && error && (
                        <ColoredError dataTestId='hint' text={error?.error?.message || 'error'}/>
                    )}
                    {isTouched && !focus && !getValues('email') &&
                        <ColoredError dataTestId='hint' text='Поле не может быть пустым'/>}
                </div>
                <button
                    type='submit'
                    className={styles.form__btn}
                >
                    Восстановить
                </button>
            </form>
        </>
    ) : <ForgotFormSecond/>;
};
