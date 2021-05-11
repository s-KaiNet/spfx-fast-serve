import * as React from 'react';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';
import { Placeholder as PnPPlaceholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCamera);

import styles from './SampleWebPart.module.scss';
import { ISampleWebPartProps } from './ISampleWebPartProps';

const logo: any = require('../assets/parker-spfx.png');
console.log(logo);
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
              <br />
              <PnPPlaceholder iconName="Edit" iconText="Workable" description="Workable" buttonLabel="Workable" />
              <br />
              <FontAwesomeIcon icon={faCamera} size="5x" />
              <br />
              <img src={logo} alt="SPFx logo" />
              <div className={styles.img} title="SPFx logo"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
