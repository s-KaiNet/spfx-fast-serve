import React, { FC, useEffect, useState } from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';

import styles from './ContextInfo.module.scss';
import { ContextInfoProps } from './ContextInfoProps';
import { Header } from './../Header/Header';

const ContextInfo: FC<ContextInfoProps> = ({ context }) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<string>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const getInfo = async () => {

      if (context.sdks.microsoftTeams) {
        setInfo(JSON.stringify(context.sdks.microsoftTeams.context, null, 2));
        setLoading(false);
        return;
      }

      const res = await (await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/web`, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none'
        }
      })).json();

      const sp = spfi().using(SPFx({ pageContext: context.pageContext }));
      const web = await sp.web();

      console.log(web);

      setInfo(JSON.stringify(res, null, 2));
      setLoading(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getInfo();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.contextInfo}>
      <div className={styles.container}>
        <Header context={context.sdks.microsoftTeams ? 'Teams' : 'Sharepoint'} />
        <pre><code>
          {info}
        </code>
        </pre>
      </div>
    </div>
  );
};

export default ContextInfo;
