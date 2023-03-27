import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import styles from './wrapper.module.scss';

interface IProps {
  children: ReactNode;
  setVisiblePopup: Dispatch<SetStateAction<boolean>>;
}
export const TransparentWrapper: FC<IProps> = ({ setVisiblePopup, children }) => (
  <div role='presentation' onClick={() => setVisiblePopup(false)} className={styles.wrapper}>
    {children}
  </div>
);
