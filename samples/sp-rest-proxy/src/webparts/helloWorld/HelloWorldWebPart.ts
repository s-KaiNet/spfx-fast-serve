import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp/presets/all";

import * as strings from 'HelloWorldWebPartStrings';
import { HelloWorld } from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public onInit(): Promise<void> {

    const spHttpClient: SPHttpClient = this.context.spHttpClient;
    spHttpClient.get(`/_api/web`, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {

      response.json().then((web: any) => {

        console.log(web.Url);
      });
    });

    return super.onInit().then(_ => {
      if (Environment.type === EnvironmentType.Local) {
        sp.setup({
          sp: {
            baseUrl: "https://localhost:4321/"
          }
        });
      } else {
        sp.setup({
          spfxContext: this.context
        });
      }
    });
  }

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
