import { FC } from 'react';
import { ColoredError } from '../../../../../widgets/forms/register-steps/components/colored-error';
import styles from '../../../../../widgets/forms/register/register-form.module.scss';
import { IRegistrationUsernameHelper } from './interface';

export const RegistrationUsernameHelper: FC<IRegistrationUsernameHelper> = ({ fieldState, formState, isDirtyLogin, isTouchedLogin, loginFocus, value }) => {

    console.log(isTouchedLogin, fieldState, loginFocus)

    return (
        <>
            {((fieldState.error?.message === 'Поле не может быть пустым' || fieldState?.error?.types?.required) && !loginFocus) &&
                <ColoredError dataTestId='hint'
                    text='Поле не может быть пустым' />}
            {(Array(formState.errors?.username?.types?.matches).length === 2 && !formState.errors?.username?.types?.required) && (
                <ColoredError dataTestId='hint'
                    text='Используйте для логина латинский алфавит и цифры' />
            )}
            {(fieldState.isDirty && Array.isArray(fieldState.error?.types?.matches) && loginFocus) && (
                <p data-test-id='hint' className={styles.form__prompt}>
                    Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и <span
                        className={styles.form__prompt_colored}>цифры</span>
                </p>
            )}
            {(fieldState.isDirty && fieldState.error?.types?.matches === 'латинский алфавит') && (
                <p data-test-id='hint' className={styles.form__prompt}>
                    Используйте для логина латинский алфавит и <span
                        className={styles.form__prompt_colored}>цифры</span>
                </p>
            )}
            {(fieldState.isDirty && loginFocus && fieldState.error?.types?.matches === 'латинский алфавит' && value.match(new RegExp(/^[^а-яё]+$/iu))) && (
                <p data-test-id='hint' className={styles.form__prompt}>
                    Используйте для логина <span className={styles.form__prompt_colored}>латинский алфавит</span> и
                    цифры
                </p>
            )}
            {(fieldState.isDirty && loginFocus && fieldState.error?.types?.matches === 'цифры') && (
                <p data-test-id='hint' className={styles.form__prompt}>
                    Используйте для логина латинский алфавит и <span
                        className={styles.form__prompt_colored}>цифры</span>
                </p>
            )}
            {((!fieldState.error) || (!isTouchedLogin && !loginFocus && !fieldState.error)) && (
                <p data-test-id='hint' className={styles.form__prompt}>Используйте для логина
                    латинский алфавит и цифры</p>
            )}
        </>
    )
}
