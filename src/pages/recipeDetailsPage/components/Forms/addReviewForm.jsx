import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';


const AddReviewForm = (props) => {
    return (<form onSubmit={props.handleSubmit} action="POST" style={{ marginBottom: '20px' }} >
                <FormGroup>
                <Field validate={[validators.required]} name="title" component={FormInput} placeholder="Напишите заголовок отзыва" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="text" component={FormInput} type="textarea" placeholder="Напишите отзыв" />
            </FormGroup>
            <Button disabled={props.submitting}>Добавить отзыв</Button>
        </form>);
};

export default reduxForm({
    form: 'add-review'
})(AddReviewForm);