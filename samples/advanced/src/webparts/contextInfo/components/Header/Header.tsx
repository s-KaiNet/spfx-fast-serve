import React, { FC } from 'react';
import * as strings from 'ContextInfoWebPartStrings';
import styles from './Header.module.scss';

interface Props {
  context: 'teams' | 'sharepoint';
}

export const Header: FC<Props> = ({ context }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.subHeader}>Your context: {context === 'teams' ? 'Teams' : 'SharePoint'}</h2>
      <div>{strings.ContextInfoLabel}</div>
    </div>
  )
}
