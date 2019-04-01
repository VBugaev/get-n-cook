import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput, FormFileInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';


const IngredientAdminForm = (props) => {
    return (<form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field validate={[validators.required]} name="title" component={FormInput} type="text" placeholder="Введите название ингредиента" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="ingredientImage" component={FormFileInput} />
            </FormGroup>
            <Button disabled={props.submitting}>Добавить ингредиент</Button>
        </form>);
};

export default reduxForm({
    form: 'ingredient-admin-create'
})(IngredientAdminForm);
