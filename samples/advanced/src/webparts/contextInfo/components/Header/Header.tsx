import React, { FC } from 'react';
import * as strings from 'ContextInfoWebPartStrings';
import styles from './Header.module.scss';

interface Props {
  context: 'Teams' | 'Sharepoint';
}

export const Header: FC<Props> = ({ context }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.subHeader}>Your context: {context}</h2>
      <div>{strings.ContextInfoLabel}</div>
    </div>
  )
}
