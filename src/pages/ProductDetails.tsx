import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAsyncData } from 'hooks/useAsyncData';
import { IProduct } from 'models';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { CommonPageContainer } from 'components/CommonPageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/models';
import { addProductToBasket, removeItemFromBasket } from 'store/actions/products';

interface IParams {
    id: string;
}

export const ProductDetailsPage: React.FC = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const [productData] = useAsyncData<IProduct>(`/products/${id}`);
    const basket = useSelector<IAppState, IProduct[]>(state => state.basket);
    const dispatch = useDispatch();

    const handleBack = React.useCallback((id: string) => {
        history.push(`/categories/${id}`);
    }, [history]);

    const handleAddToBasket = React.useCallback(() => {
        if (productData.data) {
            dispatch(addProductToBasket(productData.data));
        }
    }, [dispatch, productData.data]);

    const haveThisItemInBasket = React.useMemo(() =>
        basket.some(item => item.id === productData.data?.id),
        [basket, productData.data?.id]
    );

    const handleRemoveFromBasket = React.useCallback(() => {
        if (productData.data) {
            dispatch(removeItemFromBasket(productData.data.id));
        }
    }, [dispatch, productData.data]);

    let content;

    if (productData.loading) {
        content = <LoadingSpinner />;
    } else if (productData.error) {
        content = <h4 className="text-danger">Error occurred!</h4>;
    } else {
        const { data } = productData;
        if (!!data) {
            const { categoryId, name, imageUrl } = data;
            content = (
                <Row className="mt-4">
                    <Col xs={12}>
                        <Card>
                            <CardHeader>{name}</CardHeader>
                            <CardBody>
                                <img src={imageUrl} alt={name} style={{ height: '150px' }} />
                            </CardBody>
                            <CardFooter>
                                <Button onClick={handleAddToBasket}>Add to basket</Button>
                                <Button className="ms-3" onClick={() => handleBack(categoryId)}>Back to the category</Button>
                                {haveThisItemInBasket && <Button className="ms-3" onClick={handleRemoveFromBasket}>Remove from basket</Button>}
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>

            )
        }
    }

    return (
        <CommonPageContainer>{content}</CommonPageContainer>
    )
}
