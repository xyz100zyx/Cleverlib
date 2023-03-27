import {FC} from 'react';
import classNames from "classnames";
import styles from './styles.module.scss'
import {IRedCard} from "./interface";

export const RedCard: FC<IRedCard> = ({text, subtext}) => (
    <div data-test-id='expired' className={classNames(styles.block, styles.block__red)}>
        <span>
            {text}
        </span>
        <p className={styles.block__subtext}>
            {subtext}
        </p>
    </div>
)
