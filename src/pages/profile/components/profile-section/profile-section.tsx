import {FC} from 'react';
import {IProfileSection} from "./interaface";
import styles from './profile-section.module.scss'

export const ProfileSection: FC<IProfileSection> = ({text, title, children, dataTestId}) => (
    <div data-test-id={dataTestId} className={styles.section}>
        <p className={styles.section__title}>{title}</p>
        <p className={styles.section__text}>{text}</p>
        {children}
    </div>
)
