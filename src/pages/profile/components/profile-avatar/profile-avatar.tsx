import {ChangeEvent, FC, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import classNames from "classnames";
import styles from './profile-avatar.module.scss'
import commonAvatar from '../../../../assets/cat-avatar.jpg';
import {ReactComponent as OtherAvatarIcon} from '../../../../assets/icon-other.svg';
import {useAppSelector} from "../../../../hooks/redux/selectros";
import {
    profileDataSelector,
} from "../../../../store/selectors/profile-selectors";
import {useThunkDispatch} from "../../../../hooks/redux/dispatchers";
import {
    saveUploadAvatar,
} from "../../../../store/slices/profile/async-actions";
import {AlertFounders, HOST} from "../../../../utils/constants";
import {setAlertFounder, setAlertOpen} from "../../../../store/slices/popup/popup-slice";


export const ProfileAvatar: FC = () => {

    const avatar = useAppSelector(profileDataSelector)?.avatar;
    const id = useAppSelector(profileDataSelector)?.id;
    const thunkDispatch = useThunkDispatch();
    const inputAvatarRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch()

    const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAlertFounder(AlertFounders.PROFILE))
        thunkDispatch(saveUploadAvatar({fd: e.target?.files![0] as File, userId: id!})).then(() => dispatch(setAlertOpen(true)));
    }

    const onOpenDialogHandler = () => {
        inputAvatarRef.current?.click()
    }

    const userAvatar = () => avatar ? `${HOST}${avatar}` : commonAvatar

    return (
        <div className={classNames(styles.wrapper)}>
            <img role='presentation' onClick={onOpenDialogHandler} className={classNames(styles.wrapper__avatar)} src={userAvatar()} alt="user avatar"/>
            <input ref={inputAvatarRef} onChange={e => onChangeAvatarHandler(e)} className={classNames(styles.wrapper__input)} type="file"/>
            <button onClick={onOpenDialogHandler} type='button' className={classNames(styles.wrapper__btn)}>
                <OtherAvatarIcon />
            </button>
        </div>
    )
}
