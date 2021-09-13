import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MyCardAdaptiveCardExtensionStrings';
import { IMyCardAdaptiveCardExtensionProps, IMyCardAdaptiveCardExtensionState } from '../MyCardAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IMyCardAdaptiveCardExtensionProps, IMyCardAdaptiveCardExtensionState> {
  public get data(): IImageCardParameters {
    return {
      primaryText: strings.PrimaryText,
      imageUrl: 'https://blogs.microsoft.com/uploads/2017/09/WR-Microsoft-logo.jpg'
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
