import React, { Component } from 'react'

import {
    Container, Row, Col, Card, CardHeader, CardBody, CardText
} from 'reactstrap';

import AddRateForm from './components/Forms/addRateForm';
import AddReviewForm from './components/Forms/addReviewForm';
import { getCategoryData, fetchRecipe } from './modules';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';

const mapStateToProps = (state) => ({
    categoryData: getCategoryData(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchRecipe: dispatch(fetchRecipe(ownProps.match.params.id))
});

class RecipeDetailsPage extends Component {
    componentDidMount() {
        this.props.fetchRecipe && this.props.fetchRecipe();
    }

    onAddRateSubmit = values => {}

    onAddReviewSubmit = values => {}

    render() {
        let categoryData = this.props.categoryData;
        let steps = categoryData && orderBy(categoryData.Steps, 'OrderNumber', 'asc');
        return (
            <Container fluid={true}>
                {
                    categoryData.Id ?
                        (<Row>
                            <Col sm="12">
                                <h3 className="display-4 p-3">Рецепт {categoryData.Title}</h3>
                                {categoryData.Categories.map(category =>
                                    (<span style={{ margin: "5px" }} key={category.Id} className="badge badge-secondary">
                                        {category.Title}
                                    </span>))}
                                <div><h4>Автор: {categoryData.Login} ({categoryData.Name} {categoryData.Surname || ''})</h4></div>
                                <div><h4>Оценка пользователей: {categoryData.RecipeRate ? `${categoryData.RecipeRate} 
                                (оценило ${categoryData.RecipeCount} пользователей)` : 'Пока не оценено пользователями'}</h4></div>
                                <div>
                                    <h5>Оставьте оценку:</h5>
                                    <AddRateForm onSubmit={values => console.log(values)} />
                                </div>
                                <Row>
                                    <Col sm="12" md="3">
                                        <img style={{ marginBottom: "15px" }} width="100%" alt="preview" src={`http://127.0.0.1:3000/api/image/${categoryData.Id}`} />
                                    </Col>
                                    {categoryData.Images.map(i => (
                                        <Col key={i.Id} sm="12" md="3">
                                            <img style={{ marginBottom: "15px" }} width="100%" alt="recipeImage" src={`http://127.0.0.1:3000/api/image/${i.Id}`} />
                                        </Col>
                                    ))}
                                </Row>
                                <div><h4>Время приготовления: {categoryData.PreparationTime} минут</h4></div>
                                <div>
                                    <h4>Способ приготовления</h4>
                                    {steps.map((step, index) => (
                                        <Card key={step.Id} style={{ marginBottom: '15px' }}>
                                            <CardHeader tag="h5">Шаг {++index}</CardHeader>
                                            <CardBody>
                                                <CardText>{step.Description}</CardText>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                                <div>
                                    <h4>Ингредиенты</h4>
                                    <Row>
                                        {categoryData.Ingredients.map(i => (
                                            <Col style={{ marginBottom: "15px" }} key={i.Id} sm="12" md="3">
                                                <Card>
                                                    <CardHeader tag="h5">{i.Title}</CardHeader>
                                                    <img width="100%" alt={i.Title} src={`http://127.0.0.1:3000/api/image/${i.Id}`} />
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                            <Col sm="12">
                                <h5>Опишите впечатления от рецепта:</h5>
                                <AddReviewForm onSubmit={values => console.log(values)} />
                                <h6>Другие отзывы</h6>
                                <div>
                                    {categoryData.Reviews.map(r => (
                                        <Col key={r.UserId} sm="12">
                                            <Card>
                                                <CardHeader tag="h5">{r.Title}{'   '}{r.CreatedAt && dayjs(r.CreatedAt).format('DD MMM YYYY HH:mm:ss')}</CardHeader>
                                                <CardBody>
                                                    <CardText>{r.Text}</CardText>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    ))}
                                </div>
                            </Col>
                        </Row>) : <div>Загрузка...</div>
                }
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetailsPage);