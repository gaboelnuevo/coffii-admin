import React from 'react';
import { List, Datagrid, TextField, BooleanField, EditButton, Edit, Create, SimpleForm, DisabledInput, ReferenceInput, SelectInput, ImageField, ImageInput, NumberInput } from 'admin-on-rest';

import { showNotification as showNotificationAction } from 'admin-on-rest';

import CoffeeEditActions from './components/CoffeeEditActions';

import { BASE_URL } from './rest-clients';

const CoffeTumbnail = ({ source, record = {} }) => {
   return (
        <img src={`${BASE_URL}/coffees/${record[source]}/thumbnail?size=150`}/>
   )
};

const CustomImageField = ({ record = {} }) => {
    return (
        record.base64 ? (
            <ImageField source="base64" record={record}/>
        ): (
            <ImageField source={record.url ? 'url': 'src'} record={record}/>
        )
    )
};

export const CoffeeList = (props) => (
    <List {...props}>
        <Datagrid>
            <CoffeTumbnail label="image" source="id" alt="coffee thumbnail"/>
            <TextField source="id" />
            <TextField source="brand.name" />
            <TextField source="variety.description" />
            <TextField source="avg_rating" />
            <BooleanField source="trained" />
            <EditButton/>
        </Datagrid>
    </List>
);

const CoffeeTitle = ({ record }) => {
    let brandName = record.brand.name;
    let modelName = record.model;
    let variety = record.variety.description;
    return <span>{record ? `${brandName} - ${(modelName ? modelName: variety)}` : ''}</span>;
};

export const CoffeeEdit = (props) => (
    <Edit title={<CoffeeTitle />} {...props} actions={<CoffeeEditActions />}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="Brand" source="brandId" reference="brands" perPage={1000}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Variety" source="varietyId" reference="varieties" perPage={1000}>
                <SelectInput optionText="description" />
            </ReferenceInput>
            <NumberInput source="altitude" />
            <ImageInput source="image" label="Picture" accept="image/*" maxSize={1048576 * 10}>
                <CustomImageField source="url"/>
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const CoffeeCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="Brand" source="brandId" reference="brands" perPage={1000} allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput label="Variety" source="varietyId" reference="varieties" perPage={1000} allowEmpty>
                <SelectInput optionText="description" />
            </ReferenceInput>
            <NumberInput source="altitude" />
            <ImageInput source="image" label="Picture" accept="image/*">
                <CustomImageField source="url"/>
            </ImageInput>
        </SimpleForm>
    </Create>
);