import React, { Component } from 'react'

import { Container, Row, Col, Input, Alert, Button } from 'reactstrap';

import { getCategories, getIngredients, fetchIngredients, fetchCategories } from './modules';
import { connect } from 'react-redux';


class RecipeDetailsPage extends Component {
    render() {
        return (
                <Container fluid={true}>
                    <Row>
                        <Col sm="12">
                            <h3 className="display-4 p-3">Просмотр рецепта</h3>
                        </Col>
                        <Col sm="12">
                        </Col>
                    </Row>
                </Container>
        );
    }
}

export default RecipeDetailsPage;