import React from 'react';
import { FormGroup, Button, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput, FormFileInput } from '../../../../components/FormComponents';
import { required, maxLength, letters, email } from '../../../../utils/formValidators.js';


class RegisterForm extends React.Component {
    render() {
        const { props } = this;
        return (
            <form onSubmit={props.handleSubmit} action="POST">
                <FormGroup>
                    <Field validate={[required, email]} name="email" component={FormInput} type="email" placeholder="Введите email" />
                </FormGroup>
                <FormGroup>
                    <Field validate={[required]} name="login" component={FormInput} placeholder="Введите логин" />
                </FormGroup>
                <FormGroup>
                    <Field validate={[required, maxLength(50), letters]} name="name" component={FormInput} type="text" placeholder="Введите имя" />
                </FormGroup>
                <FormGroup>
                    <Field validate={[required, maxLength(50), letters]} name="surname" component={FormInput} type="text" placeholder="Введите фамилию" />
                </FormGroup>
                <FormGroup>
                    <Field validate={required} name="password" component={FormInput} type="password" placeholder="Введите пароль" />
                </FormGroup>
                <FormGroup>
                    <Field validate={required} name="avatar" component={FormFileInput} />
                </FormGroup>
                <FormGroup>
                    <Field validate={required} name="about" component={FormInput} type="textarea" placeholder="Напишите что-нибудь о себе" />
                </FormGroup>
                <Button disabled={props.submitting} outline color="primary" size="lg" block>Зарегистрироваться</Button>
            </form>
        );
    }
}

const ReduxRegisterForm = reduxForm({
    form: 'register'
})(RegisterForm);

export default ReduxRegisterForm;