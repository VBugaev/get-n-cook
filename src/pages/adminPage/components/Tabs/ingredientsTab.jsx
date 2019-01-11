import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { createIngredient, deleteIngredient, getIngredients} from '../../actions.js';
import { getIngredientsData, getIngredientFormError } from '../../selectors.js';

import { Table, Row, Col, Alert, Button } from 'reactstrap';
import IngredientAdminForm from '../Forms/ingredientAdminForm';

import './ingredientsTab.scss';

const mapStateToProps = (state) => ({
    ingredients: getIngredientsData(state),
    error: getIngredientFormError(state)
});

const mapDispatchToProps = dispatch => ({
    getIngredients: () => dispatch(getIngredients()),
    createIngredient: values => dispatch(createIngredient(values)),
    deleteIngredient: id => dispatch(deleteIngredient(id))
});

class IngredientsTab extends Component {
    componentDidMount() {
        this.props.getIngredients();
    }

    render() {
        const { ingredients, error } = this.props;
        return (<>
            <Row>
                <Col sm="12">
                    <h3 className="display-4 p-3">Управление ингредиентами</h3>
                </Col>
                <Col sm="6">
                    <Table className="ingredients-table">
                        <tbody>
                            <col className="image-col" />
                            <tr>
                                <th></th>
                                <th>Название ингредиента</th>
                                <th></th>
                            </tr>
                            {ingredients.map(ingredient => {
                                return (
                                    <tr key={ingredient.Id}>
                                        <td><img className="fit-image" src={`http://127.0.0.1:5000/api/image/${ingredient.Id}`} alt="ingredient avatar"/></td>
                                        <td>{ingredient.Title}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Col>
                <Col sm="4">
                    {
                        error && <Alert color="danger">{error}</Alert>
                    }
                    <IngredientAdminForm onSubmit={this.props.createIngredient} />
                </Col>
            </Row>
        </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsTab);