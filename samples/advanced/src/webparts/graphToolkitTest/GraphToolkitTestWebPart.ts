import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { lazyLoadComponent } from "@microsoft/mgt-spfx-utils";
import * as strings from 'GraphToolkitTestWebPartStrings';
import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";

const MgtDemo = React.lazy(
  () =>
    import(/* webpackChunkName: 'mgt-demo-component' */ "./components/GraphToolkitTest")
);

export interface IGraphToolkitTestWebPartProps {
  description: string;
}

customElementHelper.withDisambiguation("mgt-demo-client-side-solution");

export default class GraphToolkitTestWebPart extends BaseClientSideWebPart<IGraphToolkitTestWebPartProps> {

  private _root: Root | undefined;

  public render(): void {
    const element = lazyLoadComponent(MgtDemo, {
      description: this.properties.description
    });

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }

    this._root.render(element);
  }

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
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
