import {FC, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import styles from './layout.module.scss';
import {Header, Footer} from '../../components';
import {ModalWindow} from '../../components/popups/modal-window';
import {getLocalStorageItem} from "../../utils/storage.utils";
import {useThunkDispatch} from "../../hooks/redux/dispatchers";
import {getMe} from "../../store/slices/profile/async-actions";
import {setAlertFounder} from "../../store/slices/popup/popup-slice";
import {AlertFounders} from "../../utils/constants";

export const Layout: FC = () => {

    const hasJwtToken = !!getLocalStorageItem('token')
    const isFirstRequest = useRef(true)
    const thunkDispatch = useThunkDispatch()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isFirstRequest.current && hasJwtToken){
            dispatch(setAlertFounder(AlertFounders.PROFILE))
            thunkDispatch(getMe())
        }
        isFirstRequest.current = false;
    })

    return (
        hasJwtToken ? <div className={styles.layout}>
            <Header/>
            <Outlet/>
            <Footer/>
            <ModalWindow/>
        </div> : <Navigate to='/auth'/>
    );
}
