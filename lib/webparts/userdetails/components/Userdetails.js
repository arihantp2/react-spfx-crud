var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { DefaultButton, Dialog, DialogType, DialogFooter } from "@fluentui/react";
import spservices from '../Services/spservices';
import { IconButton } from '@fluentui/react/lib/Button';
var editIcon = { iconName: 'EditSolid12' };
var delIcon = { iconName: 'Delete' };
var saveIcon = { iconName: 'Save' };
var cancelIcon = { iconName: 'Cancel' };
import UserInputForm from './UserInputForm';
var Userdetails = /** @class */ (function (_super) {
    __extends(Userdetails, _super);
    function Userdetails(props) {
        var _this = _super.call(this, props) || this;
        _this.userTypeOptions = [
            { key: '', text: '--Select User Type--' },
            { key: 'Normal User', text: 'Normal User' },
            { key: 'Admin', text: 'Admin' },
        ];
        _this.columns = [
            { key: 'id', name: 'ID', width: '1%', type: 'number' },
            { key: 'userType', name: 'User Type', width: '8%', type: 'dropdown', editable: false, options: _this.userTypeOptions, required: true },
            { key: 'name', name: 'Name', width: '10%', type: 'text', editable: false },
            { key: 'email', name: 'Email', width: '15%', type: 'text', required: true, editable: false },
            { key: 'location', name: 'Location', width: '10%', type: 'text', editable: true },
            { key: 'department', name: 'Department', width: '10%', type: 'text', editable: true },
            { key: 'dateOfBirth', name: 'Date of Birth', width: '10%', type: 'date', editable: true },
            { key: 'editIcon', name: 'Edit', width: '2%', type: 'icon' },
            { key: 'delIcon', name: 'Delete', width: '2%', type: 'icon' }
        ];
        _this.handleAddUserClick = function () {
            _this.setState({ isAddUserDialogOpen: true });
        };
        _this.handleUserFormClose = function () {
            _this.setState({ isAddUserDialogOpen: false });
        };
        _this.handleUserFormSave = function (newUser) { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this._spServices.AddDataToList(this.formatUpdateObject(newUser), "UserDetails")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fetchData()];
                    case 2:
                        _a.sent();
                        this.setState({
                            isDialogHidden: false,
                            dialogMessage: "User Details Added successfully!",
                            showLoader: false,
                            dialogTitle: "Success",
                            isActionDialog: false
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error saving user details:", error_1);
                        this.setState({
                            isDialogHidden: false,
                            dialogMessage: "Error saving user details!",
                            showLoader: false,
                            dialogTitle: "Error",
                            isActionDialog: false
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this._onUpateIconClicked = function (rowIndex) {
            _this.setState({
                showLoader: true
            });
            var updatedItem = _this.state.items[rowIndex];
            return _this._spServices
                .updateListItems(_this.formatUpdateObject(updatedItem), "UserDetails", updatedItem.id)
                .then(function (response) {
                if (response) {
                    _this.setState({
                        isEditMode: false,
                        editableRowIndex: -1,
                        isDialogHidden: false,
                        dialogMessage: "User Details updated successfully!",
                        showLoader: false,
                        dialogTitle: "Success",
                        isActionDialog: false
                    });
                    return true;
                }
                else {
                    _this.setState({
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
                .catch(function (error) {
                console.log(error);
                _this.setState({
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
        _this._onCancelIconClicked = function () {
            _this.setState({
                isEditMode: false,
                editableRowIndex: -1
            });
            try {
                _this.fetchData()
                    .then(function (res) {
                    console.log(res);
                })
                    .catch(function (error) {
                    console.error('Error :', error);
                });
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        _this._onEditIconClicked = function (rowIndex) {
            var editableRowIndex = _this.state.editableRowIndex;
            if (_this.state.isEditMode) {
                _this.setState({
                    isDialogHidden: false,
                    dialogMessage: "Please save or discard other edited user details",
                    dialogTitle: "Error"
                });
            }
            else {
                if (editableRowIndex === rowIndex) {
                    _this.setState({ editableRowIndex: -1, isEditMode: true });
                }
                else {
                    _this.setState({ editableRowIndex: rowIndex, isEditMode: true });
                }
            }
        };
        _this.isRowEditable = function (rowIndex) {
            var editableRowIndex = _this.state.editableRowIndex;
            return editableRowIndex === rowIndex;
        };
        _this._onColumnValueChange = function (e, rowIndex, columnName, option) {
            var items = _this.state.items;
            var updatedItems = __spreadArray([], items, true);
            updatedItems[rowIndex][columnName] = e.target.value;
            _this.setState({ items: updatedItems });
        };
        _this._onDeleteIconClicked = function (item) {
            _this.setState({
                itemToDelete: item.id,
                isDialogHidden: false,
                dialogMessage: "Do you want to delete this User Data?",
                dialogTitle: "Confirm Delete",
                isActionDialog: true
            });
        };
        // on delete confirmation clicked from the dialog
        _this._onDeleteConfirmClicked = function () {
            _this.setState({
                showLoader: true
            });
            var itemToUpdate = { IsActive: false };
            var itemId = _this.state.itemToDelete;
            return _this._spServices
                .updateListItems(itemToUpdate, "UserDetails", itemId)
                .then(function (response) {
                if (response) {
                    var currItems = _this.state.items;
                    var updatedItems = currItems.map(function (item) {
                        if (item.id === itemId) {
                            return __assign(__assign({}, item), { IsActive: false });
                        }
                        return item;
                    });
                    _this.setState({
                        items: updatedItems,
                        isDialogHidden: false,
                        showLoader: false,
                        dialogMessage: "User Detail deleted successfully!",
                        dialogTitle: "Success",
                        isActionDialog: false
                    });
                    try {
                        _this.fetchData()
                            .then(function (res) {
                            console.log(res);
                        })
                            .catch(function (error) {
                            console.error('Error :', error);
                        });
                    }
                    catch (error) {
                        console.error('Error fetching data:', error);
                    }
                    return true;
                }
                else {
                    _this.setState({
                        isDialogHidden: false,
                        showLoader: false,
                        dialogMessage: "Error while deleting User Detail!",
                        dialogTitle: "Error",
                        isActionDialog: false
                    });
                    return false;
                }
            })
                .catch(function (error) {
                console.log(error);
                _this.setState({
                    isDialogHidden: false,
                    showLoader: false,
                    dialogMessage: "Error while deleting User Detail!",
                    dialogTitle: "Error",
                    isActionDialog: false
                });
                return false;
            });
        };
        _this._onDialogCancelClicked = function () {
            _this.setState({
                isDialogHidden: true,
                dialogMessage: "",
                dialogTitle: ""
            });
        };
        _this._spServices = new spservices(_this.props.context);
        _this.state = {
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
        return _this;
    }
    Userdetails.prototype.formatInputObject = function (listItems) {
        var formattedData = listItems.map(function (item) {
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
    };
    // format update object to pass to update service method
    Userdetails.prototype.formatUpdateObject = function (item) {
        return {
            Name: item.name,
            Department: item.department,
            DateOfBirth: item.dateOfBirth,
            UserType: item.userType,
            IsActive: item.isActive,
            Email: item.email,
            Location: item.location,
        };
    };
    Userdetails.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fetchData()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('Error fetching data:', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Userdetails.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var listItems, filteredItems, formattedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._spServices.getListItem()];
                    case 1:
                        listItems = _a.sent();
                        filteredItems = listItems.filter(function (i) { return i.IsActive === true; });
                        formattedData = this.formatInputObject(filteredItems);
                        this.setState({ items: formattedData });
                        return [2 /*return*/];
                }
            });
        });
    };
    Userdetails.prototype.formatDateOfBirth = function (dateTimeStr) {
        if (!dateTimeStr)
            return '';
        var date = new Date(dateTimeStr);
        var formattedDate = date.toLocaleDateString();
        return formattedDate;
    };
    Userdetails.prototype.render = function () {
        var _this = this;
        var tableStyle = {
            borderCollapse: 'collapse',
            width: '100%',
            border: '1px solid black',
            overFlowX: 'scroll'
        };
        var thStyle = {
            backgroundColor: 'cadetblue',
            fontWeight: 'bold',
            padding: '4px 2px',
            textAlign: 'center',
            border: '1px solid black',
            color: '#fff',
            fontSize: '0.9em'
        };
        var tdStyle = {
            padding: '2px',
            textAlign: 'center',
            border: '1px solid black',
            justifyContent: 'center'
        };
        return (React.createElement("section", { style: { overflowX: "scroll" } },
            React.createElement("h1", { style: { display: "flex", justifyContent: 'center' } }, "User Details"),
            React.createElement(DefaultButton, { text: "Add User", onClick: this.handleAddUserClick, style: { display: "flex", float: "inline-end", marginBottom: "2px", color: "white", backgroundColor: "crimson" } }),
            React.createElement(UserInputForm, { isOpen: this.state.isAddUserDialogOpen, onClose: this.handleUserFormClose, onSave: this.handleUserFormSave }),
            React.createElement("table", { style: tableStyle },
                React.createElement("thead", null,
                    React.createElement("tr", null, this.columns.map(function (column, index) { return (column.key !== "id" &&
                        React.createElement("th", { style: __assign(__assign({}, thStyle), { width: column.width }), key: index }, column.type !== "icon" ? column.name : "")); }))),
                React.createElement("tbody", null, this.state.items.map(function (item, index) { return (React.createElement("tr", { key: index }, _this.columns.map(function (column, colIndex) {
                    switch (column.key) {
                        case 'id':
                            break;
                        case 'dateOfBirth':
                            return (React.createElement("td", { key: colIndex, style: tdStyle }, item[column.key] ? _this.formatDateOfBirth(item[column.key]) : ''));
                        case "editIcon":
                            return React.createElement("td", { style: __assign(__assign({}, tdStyle), { width: column.width }), key: colIndex }, _this.state.isEditMode && !(_this.state.editableRowIndex !== index) ?
                                React.createElement("div", null,
                                    React.createElement("span", null,
                                        React.createElement(IconButton, { onClick: function () { return _this._onUpateIconClicked(index); }, iconProps: saveIcon, title: "Update", ariaLabel: "Update" })),
                                    React.createElement("span", null,
                                        React.createElement(IconButton, { onClick: function () { return _this._onCancelIconClicked(); }, iconProps: cancelIcon, title: "Cancel", ariaLabel: "Cancel" })))
                                :
                                    React.createElement(IconButton, { onClick: function () { return _this._onEditIconClicked(index); }, iconProps: editIcon, title: "Edit", ariaLabel: "Edit" }));
                        case "delIcon":
                            return React.createElement("td", { style: __assign(__assign({}, tdStyle), { width: column.width }), key: colIndex },
                                React.createElement(IconButton, { onClick: function () { return _this._onDeleteIconClicked(item); }, iconProps: delIcon, title: "Delete", ariaLabel: "Delete" }));
                        default:
                            return (React.createElement("td", { style: __assign(__assign({}, tdStyle), { width: column.width }), key: colIndex }, _this.isRowEditable(index) ? (React.createElement("input", { type: column.type, disabled: !column.editable, value: item[column.key], onChange: function (e) { return _this._onColumnValueChange(e, index, column.key); }, style: { width: "100px" } })) : (item[column.key])));
                    }
                }))); }))),
            React.createElement("div", null,
                React.createElement(Dialog, { hidden: this.state.isDialogHidden, onDismiss: function () { return _this.setState({ isDialogHidden: true }); }, dialogContentProps: {
                        type: DialogType.normal,
                        title: this.state.dialogTitle,
                        subText: this.state.dialogMessage,
                    }, modalProps: {
                        isBlocking: false,
                        styles: { main: { maxWidth: 450 } },
                    } },
                    React.createElement(DialogFooter, null,
                        this.state.isActionDialog && (React.createElement(DefaultButton, { onClick: this._onDeleteConfirmClicked, text: "Delete" })),
                        React.createElement(DefaultButton, { onClick: function () { return _this._onDialogCancelClicked(); }, text: this.state.isActionDialog ? "Close" : "Close" }))))));
    };
    return Userdetails;
}(React.Component));
export default Userdetails;
//# sourceMappingURL=Userdetails.js.map