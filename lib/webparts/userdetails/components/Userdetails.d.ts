import * as React from 'react';
import { IUserdetailsProps } from './IUserdetailsProps';
export interface IColumns {
    key: string;
    name: string;
    width?: string;
    type?: string;
    options?: {
        key: string;
        text: string;
    }[];
    listData?: any[];
    required?: boolean;
    editable?: boolean;
    sortOrder?: number;
}
interface IUserDetailsState {
    items: any[];
    isDialogHidden: boolean;
    showLoader: boolean;
    dialogTitle: string;
    dialogMessage: string;
    isActionDialog: boolean;
    itemToDelete: number;
    editableRowIndex: number;
    isEditMode: boolean;
    isAddUserDialogOpen: boolean;
}
export default class Userdetails extends React.Component<IUserdetailsProps, IUserDetailsState> {
    private _spServices;
    private userTypeOptions;
    private columns;
    constructor(props: IUserdetailsProps);
    private formatInputObject;
    private formatUpdateObject;
    componentDidMount(): Promise<void>;
    private fetchData;
    private handleAddUserClick;
    private handleUserFormClose;
    private handleUserFormSave;
    private _onUpateIconClicked;
    private _onCancelIconClicked;
    private _onEditIconClicked;
    isRowEditable: (rowIndex: number) => boolean;
    private _onColumnValueChange;
    private formatDateOfBirth;
    private _onDeleteIconClicked;
    private _onDeleteConfirmClicked;
    private _onDialogCancelClicked;
    render(): React.ReactElement<IUserdetailsProps>;
}
export {};
//# sourceMappingURL=Userdetails.d.ts.map