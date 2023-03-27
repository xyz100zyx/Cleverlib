import {FC} from 'react';
import {ICard} from "./interface";
import styles from './styles.module.scss'

export const BlueCard: FC<ICard> = ({text}) => (
    <div data-test-id='cards' className={styles.block}>
        <span>{text}</span>
    </div>
)
