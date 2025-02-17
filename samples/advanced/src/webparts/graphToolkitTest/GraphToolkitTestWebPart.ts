import * as React from 'react';
import * as ReactDom from 'react-dom';
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
  public render(): void {
    const element = lazyLoadComponent(MgtDemo, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
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
