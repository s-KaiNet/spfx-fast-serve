import * as React from 'react';
import styles from './BasicWebpart.module.scss';
import { IBasicWebpartProps } from './IBasicWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';

import * as strings from 'BasicWebpartWebPartStrings';

export default class BasicWebpart extends React.Component<IBasicWebpartProps, {}> {
  public render(): React.ReactElement<IBasicWebpartProps> {
    return (
      <div className={styles.basicWebpart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>{strings.Welcome}</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>

        <DateTimePicker
          dateConvention={DateConvention.DateTime}
          timeConvention={TimeConvention.Hours12} />
      </div>
    );
  }
}
