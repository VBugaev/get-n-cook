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

    onRecipeSubmit = values => {
        let form = new FormData();
        let counter = 1;
        form.append('title', values.title);
        form.append('difficulty', +values.difficulty.value);
        form.append('preparationTime', values.preparationTime);
        form.append('previewImage', values.previewImage);
        if (values.sideImage1) {
            form.append('sideImage1', values.sideImage1);
        }
        if (values.sideImage2) {
            form.append('sideImage2', values.sideImage2);
        }
        if (values.sideImage3) {
            form.append('sideImage3', values.sideImage3);
        }
        if (values.step1) {
            form.append('step1', values.step1.trim());
        }
        if (values.step2) {
            form.append('step2', values.step2.trim());
        }
        if (values.step3) {
            form.append('step3', values.step3.trim());
        }
        if (values.step4) {
            form.append('step4', values.step4.trim());
        }
        if (values.step5) {
            form.append('step5', values.step5.trim());
        }
        if (values.categories && values.categories.length) {
            counter = 1;
            values.categories.forEach(c => {
                form.append(`category${counter}`, c.value);
                counter++;
            });
        }
        if (values.ingredients && values.ingredients.length) {
            counter = 1;
            values.ingredients.forEach(i => {
                form.append(`ingredient${counter}`, `${i.value}:${values[i.value]}`);
                counter++;
            })
        }
        fetch('api/recipes', {
            method: 'POST',
            body: form
        }).then(r => r.json())
            .then(data => {
            })
            .catch(err => {
                console.log(err);
            })
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
                                <Col sm="12"><CreateRecipeForm ingredients={ingredientsForSelect} categories={categoriesForSelect} onSubmit={this.onRecipeSubmit} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(pageMapStateToProps, pageDispatchToProps)(CreateRecipePage);