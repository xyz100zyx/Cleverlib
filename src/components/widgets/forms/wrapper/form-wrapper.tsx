import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './form-wrapper.module.scss';
import { ReactComponent as ArrowSvg } from '../../../../assets/form-arrow.svg';
import {AuthRoutesEndpoints} from "../../../../utils/constants";

export const FormWrapper: FC = () => {
  const path = useLocation().pathname.slice(1);
  const navigate = useNavigate()

  const onOtherPageClick = () => {
    if(path === 'forgot-pass'){
      navigate('/auth')
    }else{
      navigate(path !== 'registration' ? '/registration' : '/auth')
    }
  }

  const onLoginButtonClick = () => {
    navigate(`/${AuthRoutesEndpoints.LOGIN}`)
  }

  return (
    <div className={path === 'forgot-pass' ? `${styles.wrapper} ${styles.wrapper__forgot}` : styles.wrapper}>
      {path === AuthRoutesEndpoints.FORGOT_PASS && (
        <div className={styles.forgot}>
          <div role='presentation' onClick={onLoginButtonClick} className={styles.forgot__action}>
            <ArrowSvg />
            <span className={styles.forgot__text}>вход в личный кабинет</span>
          </div>
        </div>)
      }
      <Outlet />
      <div className={styles.wrapper__other}>
        <span className={styles.wrapper__urge}>
          {path === AuthRoutesEndpoints.REGISTRATION ? 'Есть учётная запись?' : 'Нет учётной записи?'}
        </span>
        <div className={styles.wrapper__other_right}>
          <span role='presentation' onClick={onOtherPageClick} className={styles.wrapper__action}>{path === AuthRoutesEndpoints.REGISTRATION ? 'Войти' : 'Регистрация'}</span>
          <ArrowSvg />
        </div>
      </div>
    </div>
  );
};
