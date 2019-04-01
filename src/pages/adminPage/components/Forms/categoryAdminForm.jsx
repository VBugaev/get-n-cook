import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';


const CategoryAdminForm = (props) => {
    return (<form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field validate={[validators.required]} name="title" component={FormInput} type="text" placeholder="Введите название категории" />
            </FormGroup>
            <Button disabled={props.submitting}>Создать категорию</Button>
        </form>);
};

export default reduxForm({
    form: 'category-admin-create'
})(CategoryAdminForm);
