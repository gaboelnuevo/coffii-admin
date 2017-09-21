import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput } from 'admin-on-rest';

export const VarietyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="description" />
            <EditButton/>
        </Datagrid>
    </List>
);

const BrandTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
};