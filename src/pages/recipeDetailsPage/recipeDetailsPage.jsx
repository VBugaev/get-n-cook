import React, { Component } from 'react'

import {
<<<<<<< HEAD
    Container, Row, Col, Card, CardHeader, CardBody, CardText
=======
    Container, Row, Col, Card, CardHeader, CardBody, CardText, CardFooter
>>>>>>> parent of a533285... delete FE at all
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
<<<<<<< HEAD
    componentDidMount() {
        this.props.fetchRecipe && this.props.fetchRecipe();
    }

    onAddRateSubmit = values => {}

    onAddReviewSubmit = values => {}

    render() {
        let categoryData = this.props.categoryData;
        let steps = categoryData && orderBy(categoryData.Steps, 'OrderNumber', 'asc');
=======
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            role: '',
            login: ''
        };
    }
    componentDidMount() {
        this.props.fetchRecipe && this.props.fetchRecipe();
        this.setState({
            id: localStorage.getItem('id'),
            login: localStorage.getItem('login'),
            role: localStorage.getItem('role')
        });
    }

    onAddRateSubmit = values => {
        const { fetchRecipe } = this.props;
        fetch('http://127.0.0.1:5000/api/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                recipeId: this.props.categoryData.Id,
                ...values
            })
        }).then(r => r.json())
        .then(data => {
            console.log(fetchRecipe)
            fetchRecipe && fetchRecipe();
            this.props.history.push(this.props.match.url);
        })

    }

    onAddReviewSubmit = values => {
        const { fetchRecipe } = this.props;
        fetch('http://127.0.0.1:5000/api/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                recipeId: this.props.categoryData.Id,
                ...values
            })
        }).then(r => r.json())
        .then(data => {
            fetchRecipe && fetchRecipe();
            this.props.history.push(this.props.match.url);
        })
    }

    render() {
        let categoryData = this.props.categoryData;
        let { role } = this.state;
        let authed = !!role;
        let steps = categoryData && orderBy(categoryData.Steps, 'OrderNumber', 'asc');

>>>>>>> parent of a533285... delete FE at all
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
<<<<<<< HEAD
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
=======
                                   {authed &&  <><h5>Оставьте оценку:</h5>
                                    <AddRateForm onSubmit={this.onAddRateSubmit} /></>}
                                </div>
                                <Row>
                                    <Col sm="12" md="3">
                                        <img style={{ marginBottom: "15px" }} width="100%" alt="preview" src={`http://127.0.0.1:5000/api/image/${categoryData.Id}`} />
                                    </Col>
                                    {categoryData.Images.map(i => (
                                        <Col key={i.Id} sm="12" md="3">
                                            <img style={{ marginBottom: "15px" }} width="100%" alt="recipeImage" src={`http://127.0.0.1:5000/api/image/${i.Id}`} />
>>>>>>> parent of a533285... delete FE at all
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
<<<<<<< HEAD
                                                    <img width="100%" alt={i.Title} src={`http://127.0.0.1:3000/api/image/${i.Id}`} />
=======
                                                    <img width="100%" alt={i.Title} src={`http://127.0.0.1:5000/api/image/${i.Id}`} />
                                                    <CardFooter>{i.Grammes} грамм</CardFooter>
>>>>>>> parent of a533285... delete FE at all
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Col>
                            <Col sm="12">
<<<<<<< HEAD
                                <h5>Опишите впечатления от рецепта:</h5>
                                <AddReviewForm onSubmit={values => console.log(values)} />
                                <h6>Другие отзывы</h6>
                                <div>
                                    {categoryData.Reviews.map(r => (
                                        <Col key={r.UserId} sm="12">
                                            <Card>
                                                <CardHeader tag="h5">{r.Title}{'   '}{r.CreatedAt && dayjs(r.CreatedAt).format('DD MMM YYYY HH:mm:ss')}</CardHeader>
=======
                                {authed && <><h5>Опишите впечатления от рецепта:</h5>
                                <AddReviewForm onSubmit={this.onAddReviewSubmit} /></>}
                                <h6>Отзывы</h6>
                                <div>
                                    {categoryData.Reviews.map((r, index) => (
                                        <Col key={index} sm="12">
                                            <Card>
                                                <CardHeader tag="h5">{r.Title}{' от   '}{r.CreatedAt && dayjs(r.CreatedAt).format('DD MMM YYYY HH:mm:ss')}; {' отправил пользователь '}{r.Login}</CardHeader>
>>>>>>> parent of a533285... delete FE at all
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