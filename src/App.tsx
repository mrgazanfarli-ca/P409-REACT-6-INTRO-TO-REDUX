import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { APP_ROUTES } from 'consts';

import { DashboardPage } from 'pages/Dashboard';
import { CategoriesPage } from 'pages/Categories';
import { CategoryDetailsPage } from 'pages/CategoryDetails';
import { ProductDetailsPage } from 'pages/ProductDetails';
// /categories/3 -> /products?categoryId=3
import './App.css';

const App = () => (
    <>
        <Switch>
            <Route path={APP_ROUTES.PRODUCT.DETAILS.PATH} component={ProductDetailsPage} />
            <Route path={APP_ROUTES.CATEGORIES.DETAILS.PATH} component={CategoryDetailsPage} />
            <Route path={APP_ROUTES.CATEGORIES.PATH} component={CategoriesPage} />
            {/*Keep this route always at the end*/}
            <Route path={APP_ROUTES.DASHBOARD.PATH} exact component={DashboardPage} />
        </Switch>
    </>
);

export default App;
