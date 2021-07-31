import React from 'react';
import { useAsyncData } from 'hooks/useAsyncData';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { Button, Card, Col, Row } from 'reactstrap';
import { ICategory } from 'models';
import { CommonPageContainer } from 'components/CommonPageContainer';
import { useHistory } from 'react-router-dom';

export const CategoriesPage: React.FC = () => {
    const [categoriesData] = useAsyncData<ICategory[]>('/categories');
    const history = useHistory();

    const handleViewProducts = React.useCallback((id: string) => {
        history.push(`/categories/${id}`);
    }, [history]);

    let content;

    if (categoriesData.loading) {
        content = <LoadingSpinner />;
    } else if (categoriesData.error) {
        content = <h4 className="text-danger">Error occurred!</h4>;
    } else {
        content = (
            <Row>
                {categoriesData.data?.map(({ name, id, imageUrl }) => (
                    <Col xs={3} key={id}>
                        <Card className="category-card" key={id}>
                            <div className="category-card__content">
                                <h5>{name}</h5>
                                <div className="category-card__inner-content"
                                     style={{ backgroundImage: `url(${imageUrl})` }}>
                                    <Button onClick={() => handleViewProducts(id)}>View Products</Button>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }

    return (
        <CommonPageContainer>
            {content}
        </CommonPageContainer>
    );
}
