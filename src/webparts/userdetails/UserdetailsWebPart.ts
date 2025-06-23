import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'UserdetailsWebPartStrings';
import Userdetails from './components/Userdetails';
import { IUserdetailsProps } from './components/IUserdetailsProps';
import { getSP } from './pnpjsConfig';
require('./styles/CustomStyle.css');

export interface IUserdetailsWebPartProps {
  description: string;
}

export default class UserdetailsWebPart extends BaseClientSideWebPart<IUserdetailsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUserdetailsProps> = React.createElement(
      Userdetails,
      {
        context: this.context,
      }
    );

    ReactDom.render(element,this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText',semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link',semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered',semanticColors.linkHovered || null);
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
                PropertyPaneTextField('description',{
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
