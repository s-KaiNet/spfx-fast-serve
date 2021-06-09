import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

//import { sp } from "@pnp/sp/presets/all";

import ContextInfo from '@src/webparts/contextInfo/components/ContextInfo/ContextInfo';
import { ContextInfoPropertyPane } from './ContextInfoPropertyPane';

export interface IContextInfoWebPartProps {
  description: string;
}

export default class ContextInfoWebPart extends BaseClientSideWebPart<IContextInfoWebPartProps> {

  private propertyPane: ContextInfoPropertyPane;

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

  protected async onPropertyPaneConfigurationStart() {
    await this.loadPropertyPaneResources();
  }

  protected async loadPropertyPaneResources(): Promise<void> {
    const { ContextInfoPropertyPane } = await import(
      /* webpackChunkName: 'ContextInfoPropertyPane' */
      './ContextInfoPropertyPane'
    )

    this.propertyPane = new ContextInfoPropertyPane();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this.propertyPane.getPropertyPaneConfiguration();
  }
}
