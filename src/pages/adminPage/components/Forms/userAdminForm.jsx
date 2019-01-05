import React from 'react';
import { FormGroup, Button, Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';
import { connect } from 'react-redux';
import { getRolesData } from '../../selectors.js';

const selectMapStateToProps = state => ({
    roles: getRolesData(state)
})

const UserRolesSelect = (props) => {
    const { input, roles, meta: { touched, error, warning } } = props;
    return (<>
        <Input type="select" name="select" id="rolesSelect" {...input}>
            <option value=''>Выберите роль</option>
            {roles && roles.map(role => <option key={role.Id} value={role.Id}>
            {role.Title}</option>)}
        </Input>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </>);
}

const ConnectedUserRolesSelect = connect(selectMapStateToProps)(UserRolesSelect);

const UsersAdminForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field validate={[validators.required]} name="login" component={FormInput} type="text" placeholder="Введите логин" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="email" component={FormInput} type="text" placeholder="Введите email" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="name" component={FormInput} type="text" placeholder="Введите имя" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="surname" component={FormInput} type="text" placeholder="Введите фамилию" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="password" component={FormInput} type="password" placeholder="Введите пароль" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="roleId" component={ConnectedUserRolesSelect} />
            </FormGroup>
            <Button disabled={props.submitting}>Создать пользователя</Button>
        </form>
    );
};

export default reduxForm({
    form: 'users-admin'
})(UsersAdminForm);