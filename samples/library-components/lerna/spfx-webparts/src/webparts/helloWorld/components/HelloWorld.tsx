import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { MyApiLibrary } from "corporate-library";
import { MyCoolLibraryLibrary } from "another-library";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    const api: MyApiLibrary = new MyApiLibrary();
    const api2: MyCoolLibraryLibrary = new MyCoolLibraryLibrary();

    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Message from corporate-library - {api.name()}</span>
              <br /><br />
              <span className={styles.title}>Message from another-library - {api2.name()}</span>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
