// in src/App.js
import React from 'react';
import { Admin, Resource, Delete } from 'admin-on-rest';

import restClients from './rest-clients';

import { CoffeeList, CoffeeEdit, CoffeeCreate } from './cofees';
import { BrandList, BrandEdit, BrandCreate } from './brands';
import { VarietyList } from './varieties';

const App = () => (
    <Admin {...restClients}>
        <Resource name="coffees" list={CoffeeList} create={CoffeeCreate} edit={CoffeeEdit} remove={Delete}/>
        <Resource name="brands" list={BrandList} create={BrandCreate} edit={BrandEdit} remove={Delete}/>
        <Resource name="varieties" list={VarietyList} remove={Delete}/>
    </Admin>
);

export default App;