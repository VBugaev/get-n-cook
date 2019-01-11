import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../../components/FormComponents';
import { required, email } from '../../../../utils/formValidators.js';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field validate={[required, email]} name="email" component={FormInput} type="text" placeholder="Введите email" />
            </FormGroup>
            <FormGroup>
                <Field validate={required} name="password" component={FormInput} type="password" placeholder="Введите пароль"  />
            </FormGroup>
            <Button disabled={props.submitting} outline color="primary" size="lg" block>Войти на сайт</Button>
        </form>
    );
};

export default reduxForm({
    form: 'login'
})(LoginForm);