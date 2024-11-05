/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement, useEffect, useState } from "react";
import { BlockAttributes, IntegrationInformation, IntegrationType, WidgetApi } from "widget-sdk";

/**
 * React Component
 */
export interface IntegrationTypesTestProps extends BlockAttributes {
  integrationtype: string;
  widgetApi: WidgetApi;
}

export const IntegrationTypesTest = ({ integrationtype, widgetApi }: IntegrationTypesTestProps): ReactElement => {

  const [integration, setIntegration] = useState<IntegrationInformation>();

  useEffect(() => {
    widgetApi.getIntegration(integrationtype as IntegrationType).then((integrationInformation) => {
      setIntegration(integrationInformation);
    });
  }, []);

  return <div>
    {
      integrationtype ?
        <div>
          <h5>Entered integration Type: {integrationtype}</h5>
          <br />
          <h5>Making use of the Widget API getIntegration() method:</h5>
          <br />
          <pre style={{ fontStyle: "italic" }}>
            {`const [integration, setIntegration] = useState<IntegrationInformation>('` + integrationtype + `');

widgetApi.getIntegration('` + integrationtype + `')).then((integrationInformation) => {
setIntegration(integrationInformation);
});`}
          </pre>

          <br /><hr /><br />

          <div>
            <strong>{integrationtype} integration:</strong>
            {integration?.status !== 'loggedOut' && integration?.status !== 'unavailable' ?
              <div>
                <br />Integration status: {JSON.stringify(integration?.status)}
                <br />Enabled features: {JSON.stringify(integration?.enabledFeatures)}
                <br />Supported features: {JSON.stringify(integration?.supportedFeatures)}
                <br />Token expires at: {JSON.stringify(integration?.token?.accessTokenExpiresAt)}
                <br />Access token: {JSON.stringify(integration?.token?.accessToken)}
              </div> :
              <p>{integrationtype} integration is unavailable and/or user is logged out.</p>
            }
          </div>
        </div>
        :
        <div>No integration type selected yet.</div>
    }
  </div>;
};

