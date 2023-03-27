import { FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import styles from './page.module.scss';
import { AuthErrorPopup } from '../../../../components/popups/auth/auth-error';
import { setAllNull } from '../../../../store/slices/auth/auth-slice';
import { RegisterSuccessPopup } from '../../../../components/popups/auth/register-success';
import { ForgotSuccessPopup } from '../../../../components/popups/auth/forgot-success';
import { ResetSuccessPopup } from '../../../../components/popups/auth/reset-success';
import {useAppSelector} from "../../../../hooks/redux/selectros";
import {authStateSelector} from "../../../../store/selectors/auth-selectors";
import {RequestStatusType, AuthRoutesEndpoints} from "../../../../utils/constants";

export const AuthPage: FC = () => {
  const { error, status } = useAppSelector(authStateSelector);
  const location = useLocation();
  const path = location.pathname.slice(1);
  const dispatch = useDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */

  useEffect(() => {
    dispatch(setAllNull());
  }, [path]);

  return (
    <div className={styles.page}>
      <div data-test-id='auth' className={styles.page__container}>
        <h3 className={styles.page__title}>Cleverland</h3>
        {error &&
        (path === AuthRoutesEndpoints.REGISTRATION ||
          (path === AuthRoutesEndpoints.FORGOT_PASS && location.search) ||
          (path === AuthRoutesEndpoints.LOGIN && error?.error?.status !== 400)) ? (
          <AuthErrorPopup />
        ) : path === AuthRoutesEndpoints.REGISTRATION && status === RequestStatusType.FULFILLED ? (
          <RegisterSuccessPopup />
        ) : path === AuthRoutesEndpoints.FORGOT_PASS && location.search && status === RequestStatusType.FULFILLED ? (
          <ResetSuccessPopup />
        ) : path === AuthRoutesEndpoints.FORGOT_PASS && status === RequestStatusType.FULFILLED ? (
          <ForgotSuccessPopup />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
