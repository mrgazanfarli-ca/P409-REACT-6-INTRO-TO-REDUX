import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAsyncData } from 'hooks/useAsyncData';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import { IProduct } from 'models';
import { CommonPageContainer } from 'components/CommonPageContainer';

interface IParams {
    id: string;
}

export const CategoryDetailsPage: React.FC = () => {
    const { id } = useParams<IParams>();
    const history = useHistory();
    const [productsData] = useAsyncData<IProduct[]>(`/products`, { categoryId: id });

    const handleBack = React.useCallback(() => {
        history.push('/categories');
    }, [history]);

    const handleProductView = React.useCallback((id: string) => {
        history.push(`/products/${id}`);
    }, [history]);

    let content;

    if (productsData.loading) {
        content = <LoadingSpinner />;
    } else if (productsData.error) {
        content = <h4 className="text-danger">Error occurred!</h4>;
    } else {
        content = (
            <Row>
                <Col xs={12} className="mt-3">
                    <Button onClick={handleBack}>Back to categories</Button>
                </Col>
                {productsData.data?.map(({ name, id, imageUrl }) => (
                    <Col xs={4} key={id} className="mt-3">
                        <Card>
                            <CardHeader>{name}</CardHeader>
                            <CardBody>
                                <img src={imageUrl} style={{ height: '120px' }} alt={name} />
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => handleProductView(id)}>View</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    }

    return (
        <CommonPageContainer>
            {content}
        </CommonPageContainer>
    )
}
