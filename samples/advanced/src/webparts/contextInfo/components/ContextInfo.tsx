import React, { FC, useEffect, useState } from 'react';
import { SPHttpClient } from '@microsoft/sp-http';

import * as strings from 'ContextInfoWebPartStrings';
import styles from './ContextInfo.module.scss';
import { ContextInfoProps } from './ContextInfoProps';

const ContextInfo: FC<ContextInfoProps> = ({ context }) => {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<string>();

  useEffect(() => {
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
      setInfo(JSON.stringify(res, null, 2));
      setLoading(false);
    };

    getInfo();
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className={styles.contextInfo}>
      <div className={styles.container}>
        <h2>Your context: {context.sdks.microsoftTeams ? 'Teams' : 'SharePoint'}</h2>
        <div>{strings.ContextInfoLabel}</div>
        <pre><code>
          {info}
        </code>
        </pre>
      </div>
    </div>
  );
};

export default ContextInfo;
