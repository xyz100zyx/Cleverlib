import {FC, useEffect, useState} from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import classNames from "classnames";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {IProfileForm} from "./interface";
import {profileSchema} from '../../../../utils/validations/profile.validation'
import styles from "../register/register-form.module.scss";
import {Input} from "../../../common/input/input";
import {ColoredError} from "../register-steps/components/colored-error";
import {ERROR_ALL_TEXT} from "../register-steps/utils/errors";
import {ColoredPasswordError} from "../register-steps/components/colored-error-password";
import {getRegisterPassErrorText} from "../register-steps/utils/helpers";
import {RegistrationRegExp} from "../../../../utils/validations/regex";
import {useAppSelector} from "../../../../hooks/redux/selectros";
import {profileDataSelector} from "../../../../store/selectors/profile-selectors";
import {useThunkDispatch} from "../../../../hooks/redux/dispatchers";
import {editProfile} from "../../../../store/slices/profile/async-actions";
import {setAlertFounder, setAlertOpen} from "../../../../store/slices/popup/popup-slice";
import {AlertFounders} from "../../../../utils/constants";

export const ProfileForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState,
        watch,
        getValues,
        getFieldState,
        control
    } = useForm<IProfileForm>({
        resolver: yupResolver(profileSchema),
        mode: 'all',
        criteriaMode: 'all',
        shouldFocusError: false,
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            login: ''
        }
    });

    const [loginFocus, setLoginFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [isTouchedLogin, setTouchedLogin] = useState<boolean>(false)
    const [isTouchedPassword, setTouchedPassword] = useState<boolean>(false)
    const [nameFocus, setNameFocus] = useState(false);
    const [surnameFocus, setSurnameFocus] = useState(false);
    const [isTouchedFirstName, setTouchedFirstName] = useState<boolean>(false)
    const [isTouchedLastName, setTouchedLastName] = useState<boolean>(false)
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [isTouchedPhone, setIsTouchedPhone] = useState(false);
    const [isTouchedEmail, setIsTouchedEmail] = useState(false);
    const [isDisabledField, setDisableFields] = useState(true)
    const profile = useAppSelector(profileDataSelector)
    const thunkDispatch = useThunkDispatch()
    const dispatch = useDispatch()

    const onLoginFocusToggle = () => {
        setLoginFocus(prev => !prev)
        if (!isTouchedLogin) {
            setTouchedLogin(true)
        }
    }

    const onPasswordFocusToggle = () => {
        setPasswordFocus(prev => !prev)
        if (!isTouchedPassword) {
            setTouchedPassword(true)
        }

    }

    const onFirstNameFocusToggle = () => {
        setNameFocus(prev => !prev)
        if (!isTouchedFirstName) {
            setTouchedFirstName(true)
        }
    }

    const onLastNameFocusToggle = () => {
        setSurnameFocus(prev => !prev)
        if (!isTouchedLastName) {
            setTouchedLastName(true)
        }
    }

    const toggleFocusPhone = () => {
        setPhoneFocus(prev => !prev);
        if (!isTouchedPhone) setIsTouchedPhone(true)
    }

    const toggleFocusEmail = () => {
        setEmailFocus(prev => !prev);
        if (!isTouchedEmail) setIsTouchedEmail(true)
    }

    const onEditButtonClick = () => {
        setDisableFields(prev => !prev)
    }

    const onSubmit: SubmitHandler<IProfileForm> = data => {
        const {username, email, firstName, lastName, phone, id} = profile!;
        const profileDto = {username, email, firstName, lastName, phone};
        const dto = {...profileDto, ...data, userId:id}
        dispatch(setAlertFounder(AlertFounders.PROFILE))
        thunkDispatch(editProfile(dto)).then(() => dispatch(setAlertOpen(true)))
    };

    useEffect(() => {
        watch();
    }, [watch]);

    return (
        <form data-test-id='profile-form' className={classNames(styles.form, styles.form__profile)} onSubmit={handleSubmit(onSubmit)}>
            <section>
                <div className={styles.form__profile_block}>
                    <div className={styles.form__field}>
                        <Input
                            inputedValue={getValues('login')}
                            labelText='Придумайте логин для входа'
                            label='username'
                            register={register('login')}
                            required={false}
                            invalid={getFieldState('login').invalid}
                            setFocus={onLoginFocusToggle}
                            name='login'
                            isUnavailable={isDisabledField}
                        />
                        {(isTouchedLogin && !loginFocus && !getValues('login').length) &&
                            <ColoredError dataTestId='hint'
                                          text='Поле не может быть пустым'/>}
                        {(!loginFocus && formState.errors.login?.message && getValues('login')) && (
                            <ColoredError dataTestId='hint'
                                          text='Используйте для логина латинский алфавит и цифры'/>
                        )}
                        {(getFieldState('login').isDirty && Array.isArray(getFieldState('login').error?.types?.matches) && loginFocus) && (
                            <p data-test-id='hint' className={styles.form__prompt}>
                                Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и <span
                                className={styles.form__prompt_colored}>цифры</span>
                            </p>
                        )}
                        {(getFieldState('login').isDirty && loginFocus && getFieldState('login').error?.types?.matches === 'латинский алфавит' && !getValues('login').match(new RegExp(/^[^а-яё]+$/iu))) && (
                            <p data-test-id='hint' className={styles.form__prompt}>
                                Используйте для логина латинский алфавит и <span
                                style={{color: 'rgb(167, 167, 167)'}}
                                className={styles.form__prompt_colored}>цифры</span>
                            </p>
                        )}
                        {(getFieldState('login').isDirty && loginFocus && getFieldState('login').error?.types?.matches === 'латинский алфавит' && getValues('login').match(new RegExp(/^[^а-яё]+$/iu))) && (
                            <p data-test-id='hint' className={styles.form__prompt}>
                                Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и
                                цифры
                            </p>
                        )}
                        {(getFieldState('login').isDirty && loginFocus && getFieldState('login').error?.types?.matches === 'цифры') && (
                            <p data-test-id='hint' className={styles.form__prompt}>
                                Используйте для логина латинский алфавит и <span
                                className={styles.form__prompt_colored}>цифры</span>
                            </p>
                        )}
                        {((!getFieldState('login').error && !(!getValues('login') && isTouchedLogin)) || (!isTouchedLogin && !loginFocus && !getValues('login')) || (loginFocus && !getFieldState('login').error)) && (
                            <p className={styles.form__prompt}>Используйте для логина
                                латинский алфавит и цифры</p>
                        )}
                    </div>
                    <div className={styles.form__field}>
                        <Input inputedValue={getValues('firstName')} labelText='Имя'
                               label='firstName' register={register('firstName')}
                               required={true}
                               invalid={getFieldState('firstName').invalid}
                               setFocus={onFirstNameFocusToggle}
                               name='firstName'
                               isUnavailable={isDisabledField}
                        />
                        {formState.errors.firstName &&
                            <ColoredError dataTestId='hint' text={formState.errors.firstName.message || ''}/>}
                    </div>
                    <div className={styles.form__field}>
                        <Controller
                            control={control}
                            name='phone'
                            render={({
                                         field: {name, onBlur, onChange, ref, value},
                                         fieldState: {isTouched, error}
                                     }) => (
                                <Input
                                    inputedValue={value}
                                    label='phone'
                                    name='phone'
                                    labelText='Номер телефона'
                                    register={register('phone')}
                                    required={true}
                                    setFocus={toggleFocusPhone}
                                    isFocus={phoneFocus}
                                    ref={ref}
                                    isUnavailable={isDisabledField}
                                    maskedOptions={{
                                        keepCharPositions: true,
                                        placeholderChar: 'x',
                                        mask: [
                                            '+',
                                            '3',
                                            '7',
                                            '5',
                                            ' ',
                                            '(',
                                            /\d/,
                                            /\d/,
                                            ')',
                                            ' ',
                                            /\d/,
                                            /\d/,
                                            /\d/,
                                            '-',
                                            /\d/,
                                            /\d/,
                                            '-',
                                            /\d/,
                                            /\d/,
                                        ],
                                        onChange,
                                        onBlur,
                                    }}
                                />
                            )}
                        />
                        {((getValues('phone')?.match(RegistrationRegExp.PHONE) && getValues('phone')) || !isTouchedPhone) && <p className={styles.form__prompt}>В формате +375 (xx) xxx-xx-xx</p>}
                        {(!getValues('phone')?.match(RegistrationRegExp.PHONE) && isTouchedPhone && getValues('phone')) && <ColoredError text='В формате +375 (xx) xxx-xx-xx' dataTestId='hint'/>}
                    </div>
                </div>
                <div className={styles.form__profile_block}>
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
                            isNeedCheck={true}
                            isUnavailable={isDisabledField}
                        />
                        {(isTouchedPassword && !passwordFocus && !getValues('password').length) &&
                            <ColoredError dataTestId='hint'
                                          text='Поле не может быть пустым'/>
                        }
                        {(!passwordFocus && getFieldState('password').isDirty && formState.errors.password?.message && getValues('password')) && (
                            <ColoredError dataTestId='hint' text={ERROR_ALL_TEXT}/>
                        )}
                        {(getFieldState('password').isDirty &&
                                formState.errors.password?.message &&
                                passwordFocus) &&
                            ColoredPasswordError(getRegisterPassErrorText(getValues('password')), true)}
                        {((!isTouchedPassword || !formState.errors.password?.message && getValues('password')) || (!getFieldState('password').error && passwordFocus)) && (
                            <p className={styles.form__prompt}>{ERROR_ALL_TEXT}</p>
                        )}
                    </div>
                    <div className={styles.form__field}>
                        <Input inputedValue={getValues('lastName')} labelText='Фамилия' label='lastName'
                               register={register('lastName')}
                               required={false}
                               invalid={getFieldState('lastName').invalid}
                               setFocus={onLastNameFocusToggle}
                               name='lastName'
                               isUnavailable={isDisabledField}
                        />
                        {formState.errors.lastName &&
                            <ColoredError dataTestId='hint' text={formState.errors.lastName.message || ''}/>}
                    </div>
                    <div className={styles.form__field}>
                        <Input
                            inputedValue={getValues('email')}
                            label='email'
                            name='email'
                            labelText='E-mail'
                            register={register('email')}
                            required={true}
                            setFocus={toggleFocusEmail}
                            isUnavailable={isDisabledField}
                        />
                        {getValues('email') && getFieldState('email').error?.message === 'Введите корректный e-mail' && (
                            <ColoredError dataTestId='hint'
                                          text={getFieldState('email').error?.message || ''}/>
                        )}
                        {((isTouchedEmail && !getFieldState('email').error && !getValues('email') && !emailFocus) || getFieldState('email').error?.types?.required) && <ColoredError text='Поле не может быть пустым' dataTestId='hint'/>}
                    </div>
                </div>
            </section>
            <div className={styles.actions}>
                <button data-test-id='edit-button' onClick={onEditButtonClick} className={classNames(styles.actions__edit, styles.actions__btn)} type='button'>Редактировать</button>
                <button data-test-id='save-button' disabled={isDisabledField} className={classNames(styles.actions__save, styles.actions__btn, {[styles.actions__save_blocked]: isDisabledField})} type='submit'>Сохранить изменения</button>
            </div>
        </form>
    )
}
