import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { MyCardPropertyPane } from './MyCardPropertyPane';

export interface IMyCardAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IMyCardAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID = 'MyCard_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID = 'MyCard_QUICK_VIEW';

export default class MyCardAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMyCardAdaptiveCardExtensionProps,
  IMyCardAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MyCardPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      description: this.properties.description
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'MyCard-property-pane'*/
      './MyCardPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MyCardPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
