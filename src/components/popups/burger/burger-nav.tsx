import { FC } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { NavMenu } from '../..';
import styles from './burger-nav.module.scss';
import {setAllNull} from "../../../store/slices/auth/auth-slice";
import {useAppSelector} from "../../../hooks/redux/selectros";
import {isBurgerNavPopupSelector} from "../../../store/selectors/popup-selectors";

export const BurgerNav: FC = () => {
  const isBurgerMenu = useAppSelector(isBurgerNavPopupSelector);
  const dispatch = useDispatch()

  const onLogoutClick = () => {
      dispatch(setAllNull())
      localStorage.removeItem('token')
  }

  return (
    <div
      data-test-id='burger-navigation'
      className={!isBurgerMenu ? `${styles.navigation}` : `${styles.navigation} ${styles.navigation__visible}`}
    >
      <div className={styles.navigation__wrapper}>
        <NavMenu
          dataTestIdBooks='burger-books'
          dataTestIdShowcase='burger-showcase'
          dataTestIdContract='burger-contract'
          dataTestIdTerms='burger-terms'
          dataTestIdLinksPrefix='burger'
          dataTestIdCountPrefix='burger-book-count-for'
        />
      </div>
      <span className={styles.navigation__divider} />
      <div className={`${styles.navigation__auth} ${styles.navigation__wrapper}`}>
        <Link to='/'>Профиль</Link>
        <Link data-test-id='exit-button' onClick={onLogoutClick} to='/auth'>Выход</Link>
      </div>
    </div>
  );
};
