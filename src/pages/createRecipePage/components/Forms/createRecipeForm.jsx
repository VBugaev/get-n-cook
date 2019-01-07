import React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput, FormFileInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';

const DifficultiesSelect = (props) => {
    const { input, meta: { touched, error, warning } } = props;
    return (<>
        <Input type="select" name="select" id="rolesSelect" {...input}>
            <option value=''>Выберите сложность</option>
            <option value='1'>Очень простой в приготовлении</option>
            <option value='2'>Простой в приготовлении</option>
            <option value='3'>Посложнее простого</option>
            <option value='4'>Средней сложности</option>
            <option value='5'>Сложный в приготовлении</option>
        </Input>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </>);
}

const CreateRecipeForm = (props) => {
    return (<form onSubmit={props.handleSubmit} action="POST">
            <FormGroup>
                <Field validate={[validators.required]} name="title" component={FormInput} type="text" placeholder="Введите название рецепта" />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="difficulty" component={DifficultiesSelect} />
            </FormGroup>
            <FormGroup>
                <Field validate={[validators.required]} name="preparationTime" component={FormInput} type="number" placeholder="Введите время приготовления (в минутах)" />
            </FormGroup>
            <FormGroup>
                <Label>Изображение для превью</Label>
                <div><Field validate={[validators.required]} name="previewImage" component={FormFileInput} /></div>
                
            </FormGroup>
            <FormGroup>
                <Label>Доп изображение 1</Label>
                <div><Field validate={[validators.required]} name="sideImage1" component={FormFileInput} /></div>
            </FormGroup>
            <FormGroup>
                <Label>Доп изображение 2</Label>
                <div><Field validate={[validators.required]} name="sideImage2" component={FormFileInput} /></div>
            </FormGroup>
            <FormGroup>
                <Label>Доп изображение 3</Label>
                <div><Field validate={[validators.required]} name="sideImage3" component={FormFileInput} /></div>
            </FormGroup>
            <Button disabled={props.submitting}>Создать рецепт</Button>
        </form>);
};
export default reduxForm({
    form: 'users-admin-update'
})(CreateRecipeForm);