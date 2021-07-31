import { IAsyncData } from 'models';

export const APP_ROUTES = {
    PRODUCTS: {
        PATH: '/products'
    },
    CATEGORIES: {
        PATH: '/categories',
        DETAILS: {
            PATH: '/categories/:id'
        }
    },
    PRODUCT: {
        DETAILS: {
            PATH: '/products/:id'
        }
    },
    DASHBOARD: {
        PATH: '/'
    }
}

export const INITIAL_ASYNC_DATA: IAsyncData<any> = {
    data: null,
    error: undefined,
    loading: undefined
}

export const BASE_URL = 'http://localhost:3001';
