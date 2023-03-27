import { FC, useState } from 'react';
import { Search, Select } from '../../common';
import { DisplayButton } from '../../common/display-button/display-button';
import styles from './filter-bar.module.scss';
import {IFilterBar} from "./interface";
import {viewFilterItems} from "./contstants";

export const FilterBar: FC<IFilterBar> = ({ onViewManagerClick, displayState }) => {
  const [isOpenMobileSearch, setMobileSearch] = useState(false);

  return (
    <div className={styles.bar}>
      <div className={!isOpenMobileSearch ? styles.bar__left : `${styles.bar__left} ${styles.bar__left__mob}`}>
        <Search
          setMobileOpen={setMobileSearch}
          mobileOpen={isOpenMobileSearch}
          placeholder='Поиск книги или автора…'
        />
        <Select mobileOpen={isOpenMobileSearch} />
      </div>
      <div className={!isOpenMobileSearch ? styles.bar__right : `${styles.bar__right} ${styles.bar__right__mob}`}>
        {viewFilterItems.map((item) => (
          <DisplayButton
            dataTestId={item.dataTestId}
            key={item.type}
            displayState={displayState}
            onClick={onViewManagerClick}
            type={item.type}
          />
        ))}
      </div>
    </div>
  );
};
