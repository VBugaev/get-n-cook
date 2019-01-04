import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput, FormFileInput } from '../../../../components/FormComponents';

const UsersAdminForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field name="user-avatar" component={FormFileInput} type="file" placeholder="Choose file" />
            </FormGroup>
        </form>
    );
};

export default reduxForm({
    form: 'users-admin'
})(UsersAdminForm);