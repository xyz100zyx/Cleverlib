import * as yup from "yup";
import {RegistrationRegExp} from "./regex";

export const profileSchema = yup.object({
    login: yup.string().required('Поле не может быть пустым')
        .matches(RegistrationRegExp.USERNAME_ALPHABET, 'латинский алфавит')
        .matches(RegistrationRegExp.USERNAME_NUMBERS, 'цифры'),
        /* .matches(new RegExp(/^[^а-яё]+$/iu), 'латинский алфавит') */
    password: yup.string()
        .required('Поле не может быть пустым')
        .matches(RegistrationRegExp.PASSWORD_ALL, 'Пароль не менее 8 символов, с заглавной буквой и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL, 'с заглавной буквой')
        .matches(RegistrationRegExp.PASSWORD_NUMBER, 'и цифрой')
        .matches(RegistrationRegExp.PASSWORD_CAPITAL_NUMBER, 'с заглавной буквой и цифрой')
        .min(8, 'не менее 8 символов'),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().required('Поле не может быть пустым').matches(RegistrationRegExp.EMAIL,'Введите корректный e-mail').min(4, 'Введите корректный e-mail'),
    phone: yup.string().matches(RegistrationRegExp.PHONE, 'В формате +375 (xx) xxx-xx-xx')
})
