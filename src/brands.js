import React from 'react';
import { List, Datagrid, TextField, EditButton, Edit, SimpleForm, DisabledInput, ReferenceInput, SelectInput, Create, TextInput, ReferenceManyField } from 'admin-on-rest';

export const BrandList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton/>
        </Datagrid>
    </List>
);

const BrandTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ''}</span>;
};

export const BrandCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="country" />
        </SimpleForm>
    </Create>
);

export const BrandEdit = (props) => (
    <Edit title={<BrandTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name"/>
            <ReferenceManyField label="Coffees" reference="coffees" target="brandId">
                <Datagrid>
                    <TextField source="id" />
                    <TextField label="Variety" source="variety.description" />
                    <TextField source="model" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);