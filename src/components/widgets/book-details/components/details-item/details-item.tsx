import { FC } from 'react';
import styles from './details-item.module.scss';
import {IBookDetailsItem} from "./interface";

export const BookDetailsItem: FC<IBookDetailsItem> = ({ key, value }) => (
  <li>
    <span className={styles.detailed__key}>{key}</span>
    <span className={styles.detailed__value}>{value}</span>
  </li>
);
