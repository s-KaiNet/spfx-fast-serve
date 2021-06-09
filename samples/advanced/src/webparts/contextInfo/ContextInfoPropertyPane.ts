import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';

import * as strings from 'ContextInfoWebPartStrings';

export class ContextInfoPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
