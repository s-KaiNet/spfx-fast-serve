import * as React from 'react';
import styles from './BasicWebpart.module.scss';
import { IBasicWebpartProps } from './IBasicWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';

const BasicWebpart: React.FC<IBasicWebpartProps> = (props) => {
  return (
    <div className={styles.basicWebpart}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
            <p className={styles.description}>{escape(props.description)}</p>
            <a href="https://aka.ms/spfx" className={styles.button}>
              <span className={styles.label}>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicWebpart;
