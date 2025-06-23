import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IUserdetailsWebPartProps {
    description: string;
}
export default class UserdetailsWebPart extends BaseClientSideWebPart<IUserdetailsWebPartProps> {
    render(): void;
    protected onInit(): Promise<void>;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=UserdetailsWebPart.d.ts.map