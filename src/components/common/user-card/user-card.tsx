import { FC } from 'react';
import {Link} from "react-router-dom";
import styles from './user-card.module.scss';
import {useAppSelector} from "../../../hooks/redux/selectros";
import commonAvatar from '../../../assets/cat-avatar.jpg'
import {profileDataSelector} from "../../../store/selectors/profile-selectors";
import {HOST} from "../../../utils/constants";
import {removeLocalStorageItem} from "../../../utils/storage.utils";

export const UserCard: FC = () => {

    const firstName = useAppSelector(profileDataSelector)?.firstName;
    const avatar = useAppSelector(profileDataSelector)?.avatar;

    const onExitButtonClick = () => {
        removeLocalStorageItem('token');
    }

    const userAvatar = () => avatar ? `${HOST}${avatar}` : commonAvatar

    return (
        <div className={styles.card}>
            <span className={styles.hello}>Привет, {firstName}</span>
            <img src={userAvatar()} alt='user avatar' />
            <ul className={styles.card__nav}>
                <li className={styles.card__nav_item}>
                    <Link data-test-id='profile-button' to='/profile'>
                        Профиль
                    </Link>
                </li>
                <li role='presentation' onClick={onExitButtonClick} className={styles.card__nav_item}>
                    <Link to='/'>
                        Выход
                    </Link>
                </li>
            </ul>
        </div>
    );
}
