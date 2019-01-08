import React, { Component } from 'react'

import { Container, Row, Col, Input, Alert, Button } from 'reactstrap';

import CreateRecipeForm from './components/Forms/createRecipeForm';

import { getCategories, getIngredients, fetchIngredients, fetchCategories } from './modules';
import { connect } from 'react-redux';

const pageMapStateToProps = (state) => ({
    categories: getCategories(state),
    ingredients: getIngredients(state)
})

const pageDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchIngredients: () => dispatch(fetchIngredients())
});

class CreateRecipePage extends Component {
    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchIngredients();
    }

    render() {
        const categoriesForSelect = this.props.categories.map(c => ({
            value: c.Id,
            label: c.Title
        }));
        const ingredientsForSelect = this.props.ingredients.map(i => ({
            value: i.Id,
            label: i.Title
        }))
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3 className="display-4 p-3">Создать рецепт</h3>
                        </Col>
                        <Col sm="12">
                            <Row>
                                <Col sm="12"><CreateRecipeForm ingredients={ingredientsForSelect} categories={categoriesForSelect} onSubmit={(values) => { console.log(values); }} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(pageMapStateToProps, pageDispatchToProps)(CreateRecipePage);