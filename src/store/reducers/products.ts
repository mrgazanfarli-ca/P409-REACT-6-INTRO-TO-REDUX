import ProductsActions from 'store/actions/products/types';
import { Reducer } from 'redux';
import { ELocalStorageItem } from 'enums';
import { IProduct } from 'models';

const products = localStorage.getItem(ELocalStorageItem.PRODUCTS);
const basketInitialValue = products ? JSON.parse(products) : [];

export const basketReducer: Reducer = (state = basketInitialValue, action) => {
    switch (action.type) {
        case ProductsActions.ADD_ITEM_TO_BASKET: {
            if (!state.some((item: IProduct) => item.id === action.payload.id)) {
                const newValue = [...state, action.payload];
                localStorage.setItem(ELocalStorageItem.PRODUCTS, JSON.stringify(newValue));
                return newValue;
            } else {
                return state;
            }
        }
        case ProductsActions.REMOVE_ITEM_FROM_BASKET: {
            if (state.length) {
                const newValue = state.filter((item: IProduct) => item.id !== action.payload);
                localStorage.setItem(ELocalStorageItem.PRODUCTS, JSON.stringify(newValue));
                return newValue;
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}
