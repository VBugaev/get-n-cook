import React, { Component } from 'react'

import {
    Container, Row, Col, ListGroup, ListGroupItem, Card, CardTitle, Button, CardHeader, CardBody, CardText
} from 'reactstrap';

import { getCategoryData, fetchRecipe } from './modules';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import dayjs from 'dayjs';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: []
        };
    }
    componentDidMount() {
        fetch(`http://127.0.0.1:3000/api/recipes`)
            .then(res => {
                return res.json();
            })
            .then(values => {
                this.setState({ recipes: values });
            });
    }

    render() {
        const { recipes } = this.state;
        return (
            <Container style={{ marginTop: '50px' }} fluid={true}>{
                recipes.length ? (<Row>
                    <Col sm="3">
                        <ListGroup>
                            <ListGroupItem tag="button" action>Логин</ListGroupItem>
                            <ListGroupItem tag="button" action>Создать рецепт</ListGroupItem>
                            <ListGroupItem tag="button" action>Профиль</ListGroupItem>
                            <ListGroupItem tag="button" action>Страница админа</ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col sm="9">
                        {recipes.map(recipe => (
                            <Col style={{ marginBottom: '15px' }} key={recipe.Id} sm="12">
                                <Card body>
                                    <CardTitle>{recipe.Title}</CardTitle>
                                    <CardText>{`Сложность: ${recipe.Difficulty}; Время приготовления: ${recipe.PreparationTime}; Рейтинг: ${recipe.RecipeRate ? recipe.RecipeRate : 'Не оценено'}`}</CardText>
                                    <Link to={`/recipe/${recipe.Id}`}><Button>Подробнее</Button></Link>
                                </Card>
                            </Col>))}
                    </Col>
                </Row>) : <span>Загрузка...</span>}
            </Container>
        );
    }
}

export default MainPage;