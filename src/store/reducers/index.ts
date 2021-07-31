import { combineReducers } from 'redux';
import { basketReducer } from 'store/reducers/products';

export const rootReducer = combineReducers({
    basket: basketReducer,
});
