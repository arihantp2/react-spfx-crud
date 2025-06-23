import { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi,SPFx } from "@pnp/sp";
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

    constructor(public context: WebPartContext) {

    }

    // Add data to the list
    public async AddDataToList(item: any,listName: string): Promise<boolean> {
        const sp = spfi().using(SPFx(this.context));
        const list = sp.web.lists.getByTitle(listName);

        return await list.items
            .add(item)
            .then(() => {
                return true;
            })
            .catch(error => {
                console.log(error);
                return false;
            });
    }


    // method to use pnp objects and get item by id, using item ID set from createNewItem method.
    public async getListItem(): Promise<any> {
        // get a specific item by id
        const sp = spfi().using(SPFx(this.context));
        const item: any = await sp.web.lists.getByTitle("UserDetails").items();
        return item;
    }

    // gets the list item
    public async GetListItemsAsync(listName: string,filterQuery?: string): Promise<any> {
        const sp = spfi().using(SPFx(this.context));
        const list = sp.web.lists.getByTitle(listName);
        return await list.items
            .filter(filterQuery)
            .orderBy('Id',false).top(1000)()
            .then((response) => {
                return response;
            }).catch(error => {
                console.log(error);
                return error;
            })
    }

    public async updateListItems(item: any,listName: string,id: number): Promise<boolean> {
        const sp = spfi().using(SPFx(this.context));
        const list = sp.web.lists.getByTitle(listName);
        return await list.items.getById(id).update(item
        ).then(() => {
            return true;
        }).catch(error => {
            console.log(error);
            return false;
        })
    }

}