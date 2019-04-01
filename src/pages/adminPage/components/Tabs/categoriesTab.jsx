import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { getCategories, createCategoryByAdmin, deleteCategoryByAdmin } from '../../actions.js';
import { getCategoriesData, getCategoryFormError } from '../../selectors.js';

import { Table, Row, Col, Alert, Button } from 'reactstrap';
import CategoryAdminForm from '../Forms/categoryAdminForm';

const mapStateToProps = (state) => ({
    categories: getCategoriesData(state),
    error: getCategoryFormError(state)
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    createCategory: values => dispatch(createCategoryByAdmin(values)),
    deleteCategory: id => dispatch(deleteCategoryByAdmin(id))
});

class CategoriesTab extends Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories, error } = this.props;
        return (<>
            <Row>
                <Col sm="12">
                    <h3 className="display-4 p-3">Управление категориями</h3>
                </Col>
                <Col sm="6">
                    <Table>
                        <tbody>
                            <tr>
                                <th>Название категории</th>
                                <th></th>
                            </tr>
                            {categories.map(category => {
                                return (
                                    <tr key={category.Id}>
                                        <td>{category.Title}</td>
                                        <td><Button onClick={() => this.props.deleteCategory(category.Id)}><FontAwesomeIcon icon="trash" /></Button></td>
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
                    <CategoryAdminForm onSubmit={this.props.createCategory} />
                </Col>
            </Row>
        </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTab);