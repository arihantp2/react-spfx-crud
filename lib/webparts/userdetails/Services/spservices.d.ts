import { WebPartContext } from '@microsoft/sp-webpart-base';
import "@pnp/sp/profiles";
import "@pnp/sp/webs";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/site-users/web";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/items/get-all";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
export default class spservices {
    context: WebPartContext;
    constructor(context: WebPartContext);
    AddDataToList(item: any, listName: string): Promise<boolean>;
    getListItem(): Promise<any>;
    GetListItemsAsync(listName: string, filterQuery?: string): Promise<any>;
    updateListItems(item: any, listName: string, id: number): Promise<boolean>;
}
//# sourceMappingURL=spservices.d.ts.map