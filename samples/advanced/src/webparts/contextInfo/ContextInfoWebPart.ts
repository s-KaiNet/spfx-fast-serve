import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import ContextInfo from '@src/webparts/contextInfo/components/ContextInfo/ContextInfo';
import { ContextInfoPropertyPane } from './ContextInfoPropertyPane';

export interface IContextInfoWebPartProps {
  description: string;
}

export default class ContextInfoWebPart extends BaseClientSideWebPart<IContextInfoWebPartProps> {

  private _root: Root | undefined;

  private propertyPane: ContextInfoPropertyPane | undefined;

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  public render(): void {
    const element = React.createElement(ContextInfo, {
      context: this.context
    });

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

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
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
    return this.propertyPane!.getPropertyPaneConfiguration();
  }
}
