import { IProduct } from 'models';
import ProductsActions from 'store/actions/products/types';

export const addProductToBasket = (product: IProduct) => {
    return {
        type: ProductsActions.ADD_ITEM_TO_BASKET,
        payload: product,
    };
}

export const removeItemFromBasket = (productId: string) => {
    return {
        type: ProductsActions.REMOVE_ITEM_FROM_BASKET,
        payload: productId,
    };
}
