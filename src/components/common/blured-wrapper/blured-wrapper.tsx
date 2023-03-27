import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import styles from './wrapper.module.scss';

interface IProps {
  children: ReactNode;
  setVisiblePopup: Dispatch<SetStateAction<boolean>>;
  dataTestId?: string;
}

export const BluredWrapper: FC<IProps> = ({ children, setVisiblePopup, dataTestId }) => (
  <div data-test-id={dataTestId} role='presentation' onClick={() => setVisiblePopup(false)} className={styles.wrapper}>
    {children}
  </div>
);
