import React, { Component } from 'react'

import { Container, Row, Col, Input, Alert, Button } from 'reactstrap';

import CreateRecipeForm from './components/Forms/createRecipeForm';

import { getCategories, fetchCategories, getNonSelectedCategories } from './modules';
import { connect } from 'react-redux';
import { values, keys } from 'lodash';

const selectMapStateToProps = (state, ownProps) => ({
    categories: getNonSelectedCategories(state, ownProps.selectedIds)
});

const pageMapStateToProps = (state) => ({
    categories: getCategories(state)
})

const pageDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
});

const CategoriesSelect = (props) => {
    const { categories, onChangeHandler } = props;
    return (<>
        <Input onChange={onChangeHandler} type="select" name="select" id="categoriesSelect">
            <option value=''>Выберите категорию для рецепта (максимум 4)</option>
            {categories && categories.map(category => <option key={category.Id} value={category.Id}>
                {category.Title}</option>)}
        </Input>
    </>);
}

const ConnectedUserRolesSelect = connect(selectMapStateToProps)(CategoriesSelect);

class CreateRecipePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategories: {},
            currentCategory: {}
        };
    }

    onCategoriesChangeHandler = (e) => {
        if (e.target.value) {
            const currentCategory = this.props.categories.find(category => category.Id === e.target.value);
            this.setState({ currentCategory });
        }
    }

    clientAddCategory = () => {
        const { selectedCategories, currentCategory } = this.state;
        if (currentCategory.Id) {
            selectedCategories[currentCategory.Id] = currentCategory;
            this.setState({ selectedCategories });
        }
    }

    clientDeleteCategory = (id) => {
        const { selectedCategories } = this.state;
        delete selectedCategories[id];
        this.setState({ selectedCategories });
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { selectedCategories } = this.state;
        const selectedIds = keys(selectedCategories);
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col sm="12">
                            <h3 className="display-4 p-3">Создать рецепт</h3>
                        </Col>
                        <Col sm="12">
                            <Row><Col sm="8" style={{ marginBottom: "10px" }}><ConnectedUserRolesSelect onChangeHandler={this.onCategoriesChangeHandler} selectedIds={selectedIds} /></Col>
                                {selectedIds.length < 4 && <Col sm="4"><Button onClick={this.clientAddCategory}>Добавить категорию</Button></Col>}
                                <Col sm="12">
                                    {values(selectedCategories).map(category => (
                                        <Alert key={category.Id} color="info" toggle={() => { this.clientDeleteCategory(category.Id) }}>
                                            {category.Title}
                                        </Alert>
                                    ))}
                                </Col>
                                <Col sm="12"><CreateRecipeForm onSubmit={() => { }} /></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default connect(pageMapStateToProps, pageDispatchToProps)(CreateRecipePage);