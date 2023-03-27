import {FC, useState} from 'react';
import {Navigate} from "react-router-dom";
import styles from './register-form.module.scss';
import {RegisterFirstStep} from "../register-steps/step-first.ts";
import {RegisterSecondStep} from "../register-steps/step-second";
import {RegisterThirdStep} from '../register-steps/step-third';
import {getLocalStorageItem} from "../../../../utils/storage.utils";

export const RegisterForm: FC = () => {

    const [step, setStep] = useState<number>(1);
    const hasJwtToken = !!getLocalStorageItem('token')

    return !hasJwtToken ? (
        <>
            <p className={styles.title}>Регистрация</p>
            <p className={styles.progress}>Шаг {step} из 3</p>

            {step === 1 && <RegisterFirstStep step={step} setStep={setStep}/>}
            {step === 2 && <RegisterSecondStep step={step} setStep={setStep}/>}
            {step === 3 && <RegisterThirdStep/>}
        </>
    ) : <Navigate to='/'/>
}
