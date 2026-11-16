import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'BasicWebpartWebPartStrings';
import BasicWebpart from './components/BasicWebpart';
import { IBasicWebpartProps } from './components/IBasicWebpartProps';

export interface IBasicWebpartWebPartProps {
  description: string;
}

export default class BasicWebpartWebPart extends BaseClientSideWebPart <IBasicWebpartWebPartProps> {

  private _root: Root | undefined;

  public render(): void {
    const element: React.ReactElement<IBasicWebpartProps> = React.createElement(
      BasicWebpart,
      {
        description: this.properties.description
      }
    );

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }

    this._root.render(element);
  }

  protected onDispose(): void {
    this._root?.unmount();
    this._root = undefined;
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
