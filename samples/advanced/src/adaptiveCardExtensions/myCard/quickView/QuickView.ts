import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyCardAdaptiveCardExtensionStrings';
import { IMyCardAdaptiveCardExtensionProps, IMyCardAdaptiveCardExtensionState } from '../MyCardAdaptiveCardExtension';
import template from './template/QuickViewTemplate.json';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  description: string;
}

export class QuickView extends BaseAdaptiveCardView<
  IMyCardAdaptiveCardExtensionProps,
  IMyCardAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {
    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      description: this.properties.description
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return template as ISPFxAdaptiveCard;
  }
}