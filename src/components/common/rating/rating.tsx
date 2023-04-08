import { FC } from 'react';
import styles from './rating.module.scss'
import iconStar from '../../../assets/Icon_star.svg';
import iconOutlinedStar from '../../../assets/Icon_unstar.svg';

interface IProps {
  rating: number | null;
}

export const Rating: FC<IProps> = ({ rating }) => (
  <ul className={styles.rating}>
    {[...Array(5)].map((_, index) =>
      <li key={"qwerty"[index]} data-test-id='star'>
          {index < Math.floor(rating!) ? (
          <img data-test-id='star' src={iconStar} alt='star icon' />
          ) : (
          <img src={iconOutlinedStar} alt='star icon' />
          )}
      </li>
    )}
  </ul>
);
