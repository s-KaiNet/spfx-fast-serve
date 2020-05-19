import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { sp } from "@pnp/sp/presets/all";
import { SPHttpClient } from '@microsoft/sp-http';

export const HelloWorld: React.FC<IHelloWorldProps> = (props) => {
  const [web, setWeb] = React.useState("");

  React.useEffect(() => {
    const getWeb = async () => {
      const currentWeb = await sp.web();
      setWeb(JSON.stringify(currentWeb));

      // alternatively, use sp http client:
      const spHttpClient: SPHttpClient = props.context.spHttpClient;
      const webInfo = await (await spHttpClient.get('/_api/web', SPHttpClient.configurations.v1)).json();
      console.log(webInfo);
    };

    getWeb();
  }, []);

  return (
    <div className={styles.helloWorld}>
      <div className={styles.container}>
        <code>{web}</code>
      </div>
    </div>
  );
};
