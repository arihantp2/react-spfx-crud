import * as React from 'react';
import { DefaultButton,TextField,Dropdown,IDropdownOption,Dialog,DialogType,DialogFooter } from '@fluentui/react';

interface IUserInputFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (newUser: any) => void;
}

const UserInputForm: React.FC<IUserInputFormProps> = ({ isOpen,onClose,onSave }) => {
    const [name,setName] = React.useState<string>('');
    const [email,setEmail] = React.useState<string>('');
    const [location,setLocation] = React.useState<string>('');
    const [department,setDepartment] = React.useState<string>('');
    const [dateOfBirth,setDateOfBirth] = React.useState<string>('');
    const [userType,setUserType] = React.useState<string>('');

    const userTypeOptions: IDropdownOption[] = [
        { key: '',text: '--Select User Type--' },
        { key: 'Normal User',text: 'Normal User' },
        { key: 'Admin',text: 'Admin' }
    ];

    const departmentOptions: IDropdownOption[] = [
        { key: '',text: '--Select Department--' },
        { key: 'HR',text: 'HR' },
        { key: 'Admin',text: 'Admin' },
        { key: 'Finance',text: 'Finance' },
        { key: 'Software',text: 'Software' },
        { key: 'Hardware',text: 'Hardware' },
        { key: 'Sales',text: 'Sales' },
    ];

    const handleSave = () => {
        const newUser = { name,email,location,department,dateOfBirth,userType,isActive: true };
        onSave(newUser);
        onClose();
    };

    return (
        <Dialog
            hidden={!isOpen}
            onDismiss={onClose}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Add New User'
            }}
            modalProps={{
                isBlocking: true,
                styles: { main: { maxWidth: 450 } },
            }}
        >
            <TextField label="Name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} required />
            <TextField label="Email" value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} required />
            <TextField label="Location" value={location} onChange={(e) => setLocation((e.target as HTMLInputElement).value)} />
            <Dropdown
                label="Department"
                options={departmentOptions}
                selectedKey={department}
                onChange={(e,option) => setDepartment(option?.key as string)}
                required
            />
            <TextField label="Date of Birth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth((e.target as HTMLInputElement).value)} />
            <Dropdown label="User Type" options={userTypeOptions} selectedKey={userType} onChange={(e,option) => setUserType(option?.key as string)} required />

            <DialogFooter>
                <DefaultButton onClick={handleSave} text="Save" />
                <DefaultButton onClick={onClose} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};

export default UserInputForm;