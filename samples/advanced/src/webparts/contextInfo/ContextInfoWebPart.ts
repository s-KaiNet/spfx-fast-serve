import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import { sp } from "@pnp/sp/presets/all";

import * as strings from 'ContextInfoWebPartStrings';
import ContextInfo from '@src/webparts/contextInfo/components/ContextInfo/ContextInfo';

export interface IContextInfoWebPartProps {
  description: string;
}

export default class ContextInfoWebPart extends BaseClientSideWebPart<IContextInfoWebPartProps> {

  /*
  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup(this.context);
  }
*/
  public render(): void {
    const element = React.createElement(ContextInfo, {
      context: this.context
    });

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
