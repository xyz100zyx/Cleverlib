import {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Link, useNavigate, Navigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup';
import {Input} from '../../../common/input/input';
import styles from './login-form.module.scss';
import {loginSchema} from '../../../../utils/validations/login.validation';
import {useThunkDispatch} from '../../../../hooks/redux/dispatchers';
import {login} from '../../../../store/slices/auth/async-actions';
import {ColoredError} from "../register-steps/components/colored-error";
import {useAppSelector} from "../../../../hooks/redux/selectros";
import {authStateSelector} from "../../../../store/selectors/auth-selectors";
import {IFormLogin} from "./interface";
import {getLocalStorageItem} from "../../../../utils/storage.utils";
import {AuthRoutesEndpoints} from "../../../../utils/constants";

export const LoginForm: FC = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        getValues,
    } = useForm<IFormLogin>({
        resolver: yupResolver(loginSchema),
        mode: 'all',
    });

    const [loginFocus, setLoginFocus] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false)
    const [isDirtyLogin, setDirtyLogin] = useState<boolean>(false)
    const [isDirtyPassword, setDirtyPassword] = useState<boolean>(false)
    const navigate = useNavigate()
    const hasJwtToken = !!getLocalStorageItem('token')

    const {error} = useAppSelector(authStateSelector);
    const thunkDispatch = useThunkDispatch();

    const onSubmit: SubmitHandler<IFormLogin> = (data) => {
        thunkDispatch(login(data)).then(() => {
            if (localStorage.getItem('token')) navigate('/books/all')
        });
    };

    const onLoginFocusToggle = () => {
        setLoginFocus(prev => !prev)
        if (!isDirtyLogin) {
            setDirtyLogin(true)
        }

    }

    const onPasswordFocusToggle = () => {
        setPasswordFocus(prev => !prev)
        if (!isDirtyPassword) {
            setDirtyPassword(true)
        }

    }

    useEffect(() => {
        watch();
    }, [watch]);


    /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

    return !hasJwtToken ? (
        <>
            <p className={styles.title}>Вход в личный кабинет</p>
            <form data-test-id='auth-form' className={styles.form}
                  onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('identifier')}
                        labelText='Логин'
                        label='identifier'
                        register={register('identifier')}
                        required={false}
                        invalid={getFieldState('identifier').invalid}
                        setFocus={onLoginFocusToggle}
                        name='identifier'
                    />
                    {getFieldState('identifier').error &&
                        <ColoredError dataTestId='hint'
                                      text={getFieldState('identifier').error?.message || ''}/>}
                    {(!getFieldState('identifier').error && isDirtyLogin && !loginFocus && !getValues('identifier').length) &&
                        <ColoredError dataTestId='hint'
                                      text='Поле не может быть пустым'/>}
                </div>
                <div className={styles.form__field}>
                    <Input
                        inputedValue={getValues('password')}
                        labelText='Пароль'
                        label='password'
                        register={register('password')}
                        required={false}
                        isPass={true}
                        invalid={getFieldState('password').invalid}
                        setFocus={onPasswordFocusToggle}
                        name='password'
                    />
                    {getFieldState('password').error &&
                        <ColoredError dataTestId='hint'
                                      text={getFieldState('password').error?.message || ''}/>}
                    {(!getFieldState('password').error && isDirtyPassword && !passwordFocus && !getValues('password').length) &&
                        <ColoredError dataTestId='hint' text='Поле не может быть пустым'/>}

                </div>
                {error?.error?.status === 400 ? (
                    <p className={styles.form__error}>
                        <span data-test-id='hint'>Неверный логин или пароль!</span>
                        <Link className={styles.form__error_link} to={`/${AuthRoutesEndpoints.FORGOT_PASS}`}>
                            Восстановить?
                        </Link>
                    </p>
                ) : (
                    <p className={styles.form__error}>
                        <Link className={styles.form__link_forgot} to={`/${AuthRoutesEndpoints.FORGOT_PASS}`}>
                            Забыли логин или пароль?
                        </Link>
                    </p>
                )}
                <button onClick={() => onSubmit} type='submit'
                        className={styles.form__submit}>Вход
                </button>
            </form>
        </>
    ) : <Navigate to='/'/>;
};
