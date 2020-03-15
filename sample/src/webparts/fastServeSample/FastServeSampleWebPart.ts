import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FastServeSampleWebPartStrings';
import FastServeSample from './components/FastServeSample';
import { IFastServeSampleProps } from './components/IFastServeSampleProps';

export interface IFastServeSampleWebPartProps {
  description: string;
}

export default class FastServeSampleWebPart extends BaseClientSideWebPart <IFastServeSampleWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFastServeSampleProps> = React.createElement(
      FastServeSample,
      {
        description: this.properties.description
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
