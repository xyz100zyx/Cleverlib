import {FC, useState} from 'react';
import classNames from "classnames";
import {ProfileAvatar} from "../profile-avatar/profile-avatar";
import styles from './profile-header.module.scss'
import {IProfileHeader} from './interface'


export const ProfileHeader: FC<IProfileHeader> = ({firstName, lastName}) => {

    const [state, setState] = useState();

    return (
        <div data-test-id='profile-avatar' className={classNames(styles.header)}>
            <ProfileAvatar />
            <span><p>{firstName}</p> <p>{lastName}</p></span>
        </div>
    )
}
