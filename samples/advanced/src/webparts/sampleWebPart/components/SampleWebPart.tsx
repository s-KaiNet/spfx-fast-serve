import * as React from 'react';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';

import styles from './SampleWebPart.module.scss';
import { ISampleWebPartProps } from './ISampleWebPartProps';

export default class SampleWebPart extends React.Component<ISampleWebPartProps, {}> {
  public render(): React.ReactElement<ISampleWebPartProps> {
    return (
      <div className={styles.sampleWebPart}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div>SPFx React controls Date Picker</div>
              <DateTimePicker label="DateTime Picker - 12h"
                dateConvention={DateConvention.DateTime}
                timeConvention={TimeConvention.Hours12} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}