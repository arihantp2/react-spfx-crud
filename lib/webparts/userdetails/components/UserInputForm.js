import * as React from 'react';
import { DefaultButton, TextField, Dropdown, Dialog, DialogType, DialogFooter } from '@fluentui/react';
var UserInputForm = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSave = _a.onSave;
    var _b = React.useState(''), name = _b[0], setName = _b[1];
    var _c = React.useState(''), email = _c[0], setEmail = _c[1];
    var _d = React.useState(''), location = _d[0], setLocation = _d[1];
    var _e = React.useState(''), department = _e[0], setDepartment = _e[1];
    var _f = React.useState(''), dateOfBirth = _f[0], setDateOfBirth = _f[1];
    var _g = React.useState(''), userType = _g[0], setUserType = _g[1];
    var userTypeOptions = [
        { key: '', text: '--Select User Type--' },
        { key: 'Normal User', text: 'Normal User' },
        { key: 'Admin', text: 'Admin' }
    ];
    var departmentOptions = [
        { key: '', text: '--Select Department--' },
        { key: 'HR', text: 'HR' },
        { key: 'Admin', text: 'Admin' },
        { key: 'Finance', text: 'Finance' },
        { key: 'Software', text: 'Software' },
        { key: 'Hardware', text: 'Hardware' },
        { key: 'Sales', text: 'Sales' },
    ];
    var handleSave = function () {
        var newUser = { name: name, email: email, location: location, department: department, dateOfBirth: dateOfBirth, userType: userType, isActive: true };
        onSave(newUser);
        onClose();
    };
    return (React.createElement(Dialog, { hidden: !isOpen, onDismiss: onClose, dialogContentProps: {
            type: DialogType.normal,
            title: 'Add New User'
        }, modalProps: {
            isBlocking: true,
            styles: { main: { maxWidth: 450 } },
        } },
        React.createElement(TextField, { label: "Name", value: name, onChange: function (e) { return setName(e.target.value); }, required: true }),
        React.createElement(TextField, { label: "Email", value: email, onChange: function (e) { return setEmail(e.target.value); }, required: true }),
        React.createElement(TextField, { label: "Location", value: location, onChange: function (e) { return setLocation(e.target.value); } }),
        React.createElement(Dropdown, { label: "Department", options: departmentOptions, selectedKey: department, onChange: function (e, option) { return setDepartment(option === null || option === void 0 ? void 0 : option.key); }, required: true }),
        React.createElement(TextField, { label: "Date of Birth", type: "date", value: dateOfBirth, onChange: function (e) { return setDateOfBirth(e.target.value); } }),
        React.createElement(Dropdown, { label: "User Type", options: userTypeOptions, selectedKey: userType, onChange: function (e, option) { return setUserType(option === null || option === void 0 ? void 0 : option.key); }, required: true }),
        React.createElement(DialogFooter, null,
            React.createElement(DefaultButton, { onClick: handleSave, text: "Save" }),
            React.createElement(DefaultButton, { onClick: onClose, text: "Cancel" }))));
};
export default UserInputForm;
//# sourceMappingURL=UserInputForm.js.map