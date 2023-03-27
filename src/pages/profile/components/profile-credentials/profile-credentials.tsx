import {FC, useState} from 'react';
import {ProfileForm} from "../../../../components/widgets/forms/profile/profile-form";
import styles from './profile-credentials.module.scss'

export const ProfileCredentials: FC = () => {

    const [state, setState] = useState()

    return (
        <div className={styles.credentials}>
            <p className={styles.credentials__title}>Учётные данные</p>
            <p className={styles.credentials__subtitle}>Здесь вы можете отредактировать информацию о себе</p>
            <ProfileForm />
        </div>
    )
}
