import * as React from 'react';
import { IIconProps,DefaultButton,Dialog,DialogType,DialogFooter,IDropdownOption } from "@fluentui/react";
import spservices from '../Services/spservices';
import { IconButton } from '@fluentui/react/lib/Button';

const editIcon: IIconProps = { iconName: 'EditSolid12' };
const delIcon: IIconProps = { iconName: 'Delete' };
const saveIcon: IIconProps = { iconName: 'Save' };
const cancelIcon: IIconProps = { iconName: 'Cancel' };

import { IUserdetailsProps } from './IUserdetailsProps';
import UserInputForm from './UserInputForm';
export interface IColumns {
  key: string;
  name: string;
  width?: string;
  type?: string;
  options?: { key: string; text: string }[];
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
  isEditMode: boolean,
  isAddUserDialogOpen: boolean
}

export default class Userdetails extends React.Component<IUserdetailsProps,IUserDetailsState> {
  private _spServices: spservices;
  private userTypeOptions = [
    { key: '',text: '--Select User Type--' },
    { key: 'Normal User',text: 'Normal User' },
    { key: 'Admin',text: 'Admin' },
  ];

  private columns: IColumns[] = [
    { key: 'id',name: 'ID',width: '1%',type: 'number' },
    { key: 'userType',name: 'User Type',width: '8%',type: 'dropdown',editable: false,options: this.userTypeOptions,required: true },
    { key: 'name',name: 'Name',width: '10%',type: 'text',editable: false },
    { key: 'email',name: 'Email',width: '15%',type: 'text',required: true,editable: false },
    { key: 'location',name: 'Location',width: '10%',type: 'text',editable: true },
    { key: 'department',name: 'Department',width: '10%',type: 'text',editable: true },
    { key: 'dateOfBirth',name: 'Date of Birth',width: '10%',type: 'date',editable: true },
    { key: 'editIcon',name: 'Edit',width: '2%',type: 'icon' },
    { key: 'delIcon',name: 'Delete',width: '2%',type: 'icon' }
  ];

  constructor(props: IUserdetailsProps) {
    super(props);
    this._spServices = new spservices(this.props.context);
    this.state = {
      items: [],
      itemToDelete: -1,
      isDialogHidden: true,
      showLoader: true,
      dialogMessage: "",
      dialogTitle: "",
      isActionDialog: false,
      editableRowIndex: -1,
      isEditMode: false,
      isAddUserDialogOpen: false,
    };
  }

  private formatInputObject(listItems: any): any {
    const formattedData = listItems.map((item: any) => {
      return {
        id: item.Id,
        name: item.Name,
        department: item.Department,
        dateOfBirth: item.DateOfBirth,
        userType: item.UserType,
        isActive: item.IsActive,
        email: item.Email,
        location: item.Location,
        editIcon: item.EditIcon,
        delIcon: item.DelIcon
      };
    });
    return formattedData;
  }

  // format update object to pass to update service method
  private formatUpdateObject(item: any): any {
    return {
      Name: item.name,
      Department: item.department,
      DateOfBirth: item.dateOfBirth,
      UserType: item.userType,
      IsActive: item.isActive,
      Email: item.email,
      Location: item.location,
    };
  }
  public async componentDidMount(): Promise<void> {
    try {
      await this.fetchData();
    } catch (error) {
      console.error('Error fetching data:',error);
    }
  }

  private async fetchData(): Promise<void> {
    const listItems = await this._spServices.getListItem();
    const filteredItems = listItems.filter((i: any) => i.IsActive === true)
    const formattedData = this.formatInputObject(filteredItems);
    this.setState({ items: formattedData });
  }

  private handleAddUserClick = (): void => {
    this.setState({ isAddUserDialogOpen: true });
  };

  private handleUserFormClose = (): void => {
    this.setState({ isAddUserDialogOpen: false });
  };

  private handleUserFormSave = async (newUser: any): Promise<void> => {
    try {
      await this._spServices.AddDataToList(this.formatUpdateObject(newUser),"UserDetails");
      await this.fetchData();

      this.setState({
        isDialogHidden: false,
        dialogMessage: "User Details Added successfully!",
        showLoader: false,
        dialogTitle: "Success",
        isActionDialog: false
      });
    } catch (error) {
      console.error("Error saving user details:",error);
      this.setState({
        isDialogHidden: false,
        dialogMessage: "Error saving user details!",
        showLoader: false,
        dialogTitle: "Error",
        isActionDialog: false
      });
    }
  };

  private _onUpateIconClicked = (rowIndex: any): Promise<boolean> => {
    this.setState({
      showLoader: true
    });
    const updatedItem = this.state.items[rowIndex]

    return this._spServices
      .updateListItems(
        this.formatUpdateObject(updatedItem),
        "UserDetails",
        updatedItem.id
      )
      .then((response: boolean) => {
        if (response) {
          this.setState({
            isEditMode: false,
            editableRowIndex: -1,
            isDialogHidden: false,
            dialogMessage: "User Details updated successfully!",
            showLoader: false,
            dialogTitle: "Success",
            isActionDialog: false
          });
          return true;
        } else {
          this.setState({
            isEditMode: false,
            editableRowIndex: -1,
            isDialogHidden: false,
            showLoader: false,
            dialogMessage: "Error while updating User data, please try again!",
            dialogTitle: "Error",
            isActionDialog: false
          });
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isEditMode: false,
          editableRowIndex: -1,
          isDialogHidden: false,
          showLoader: false,
          dialogMessage: "Error while updating User data, please try again!",
          dialogTitle: "Error",
          isActionDialog: false
        });
        return false;
      });
  };

  // on cancel icon clicked
  private _onCancelIconClicked = (): void => {
    this.setState({
      isEditMode: false,
      editableRowIndex: -1
    })
    try {
      this.fetchData()
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.error('Error :',error);
        });
    } catch (error) {
      console.error('Error fetching data:',error);
    }
  };

  private _onEditIconClicked = (rowIndex: number): void => {
    const { editableRowIndex } = this.state;

    if (this.state.isEditMode) {
      this.setState({
        isDialogHidden: false,
        dialogMessage: "Please save or discard other edited user details",
        dialogTitle: "Error"
      });
    }
    else {
      if (editableRowIndex === rowIndex) {
        this.setState({ editableRowIndex: -1,isEditMode: true });
      } else {
        this.setState({ editableRowIndex: rowIndex,isEditMode: true });
      }
    }
  };

  isRowEditable = (rowIndex: number): boolean => {
    const { editableRowIndex } = this.state;
    return editableRowIndex === rowIndex;
  };

  private _onColumnValueChange = (e: React.ChangeEvent<HTMLInputElement>,rowIndex: number,columnName: string,option?: IDropdownOption): void => {
    const { items } = this.state;
    const updatedItems = [...items];

    updatedItems[rowIndex][columnName] = e.target.value;
    this.setState({ items: updatedItems });

  };

  private formatDateOfBirth(dateTimeStr: string): string {
    if (!dateTimeStr) return '';

    const date = new Date(dateTimeStr);
    const formattedDate = date.toLocaleDateString();

    return formattedDate;
  }

  private _onDeleteIconClicked = (item: any): void => {
    this.setState({
      itemToDelete: item.id,
      isDialogHidden: false,
      dialogMessage: "Do you want to delete this User Data?",
      dialogTitle: "Confirm Delete",
      isActionDialog: true
    })
  };

  // on delete confirmation clicked from the dialog
  private _onDeleteConfirmClicked = (): Promise<boolean> => {
    this.setState({
      showLoader: true
    });
    const itemToUpdate = { IsActive: false };
    const itemId = this.state.itemToDelete;
    return this._spServices
      .updateListItems(itemToUpdate,"UserDetails",itemId)
      .then((response: boolean) => {
        if (response) {
          const currItems = this.state.items;
          const updatedItems = currItems.map((item) => {
            if (item.id === itemId) {
              return { ...item,IsActive: false };
            }
            return item;
          });
          this.setState({
            items: updatedItems,
            isDialogHidden: false,
            showLoader: false,
            dialogMessage: "User Detail deleted successfully!",
            dialogTitle: "Success",
            isActionDialog: false
          });
          try {
            this.fetchData()
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.error('Error :',error);
              });
          } catch (error) {
            console.error('Error fetching data:',error);
          }
          return true;
        } else {
          this.setState({
            isDialogHidden: false,
            showLoader: false,
            dialogMessage: "Error while deleting User Detail!",
            dialogTitle: "Error",
            isActionDialog: false
          });
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isDialogHidden: false,
          showLoader: false,
          dialogMessage: "Error while deleting User Detail!",
          dialogTitle: "Error",
          isActionDialog: false
        });
        return false;
      });
  };

  private _onDialogCancelClicked = (): void => {
    this.setState({
      isDialogHidden: true,
      dialogMessage: "",
      dialogTitle: ""
    })
  };

  public render(): React.ReactElement<IUserdetailsProps> {
    const tableStyle = {
      borderCollapse: 'collapse' as const,
      width: '100%',
      border: '1px solid black',
      overFlowX: 'scroll'
    };
    const thStyle = {
      backgroundColor: 'cadetblue',
      fontWeight: 'bold',
      padding: '4px 2px',
      textAlign: 'center' as const,
      border: '1px solid black',
      color: '#fff',
      fontSize: '0.9em'
    };

    const tdStyle = {
      padding: '2px',
      textAlign: 'center' as const,
      border: '1px solid black',
      justifyContent: 'center' as const
    };

    return (
      <section style={{ overflowX: "scroll" }}>
        {/* <h1>{this.props.context.pageContext.user.displayName}</h1> */}
        <h1 style={{ display: "flex",justifyContent: 'center' }}>User Details</h1>
        <DefaultButton text="Add User" onClick={this.handleAddUserClick} style={{ display: "flex",float: "inline-end",marginBottom: "2px",color: "white",backgroundColor: "crimson" }} />
        <UserInputForm
          isOpen={this.state.isAddUserDialogOpen}
          onClose={this.handleUserFormClose}
          onSave={this.handleUserFormSave}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              {this.columns.map((column,index) => (
                column.key !== "id" &&
                <th style={{ ...thStyle,width: column.width }}
                  key={index}>{column.type !== "icon" ? column.name : ""}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.items.map((item,index) => (
              <tr key={index}>
                {this.columns.map((column,colIndex) => {
                  switch (column.key) {
                    case 'id':
                      break;
                    case 'dateOfBirth':
                      return (
                        <td key={colIndex} style={tdStyle}>
                          {item[column.key] ? this.formatDateOfBirth(item[column.key]) : ''}
                        </td>
                      );
                    case "editIcon":
                      return <td style={{ ...tdStyle,width: column.width }}
                        key={colIndex}>
                        {this.state.isEditMode && !(this.state.editableRowIndex !== index) ?
                          <div>
                            <span>
                              <IconButton

                                onClick={() => this._onUpateIconClicked(index)}
                                iconProps={saveIcon} title="Update" ariaLabel="Update" />
                            </span>
                            <span>
                              <IconButton

                                onClick={() => this._onCancelIconClicked()}
                                iconProps={cancelIcon} title="Cancel" ariaLabel="Cancel" />
                            </span>
                          </div>
                          :
                          <IconButton
                            onClick={() => this._onEditIconClicked(index)}
                            iconProps={editIcon} title="Edit" ariaLabel="Edit" />
                        }
                      </td>
                    case "delIcon":
                      return <td style={{ ...tdStyle,width: column.width }}
                        key={colIndex}>
                        <IconButton
                          onClick={() => this._onDeleteIconClicked(item)}
                          iconProps={delIcon} title="Delete" ariaLabel="Delete" />
                      </td>
                    default:
                      return (
                        <td style={{ ...tdStyle,width: column.width }} key={colIndex}>
                          {this.isRowEditable(index) ? (
                            <input
                              type={column.type}
                              disabled={!column.editable}
                              value={item[column.key]}
                              onChange={(e) => this._onColumnValueChange(e,index,column.key)}
                              style={{ width: "100px" }}
                            />
                          ) : (
                            item[column.key]
                          )}
                        </td>
                      )
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Dialog
            hidden={this.state.isDialogHidden}
            onDismiss={() => this.setState({ isDialogHidden: true })}
            dialogContentProps={{
              type: DialogType.normal,
              title: this.state.dialogTitle,
              subText: this.state.dialogMessage,
            }}
            modalProps={{
              isBlocking: false,
              styles: { main: { maxWidth: 450 } },
            }}
          >
            <DialogFooter>
              {this.state.isActionDialog && (
                <DefaultButton onClick={this._onDeleteConfirmClicked} text="Delete" />
              )}

              <DefaultButton onClick={() => this._onDialogCancelClicked()}
                text={this.state.isActionDialog ? "Close" : "Close"} />
            </DialogFooter>
          </Dialog>
        </div>
      </section>
    );
  }
}

