import React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FormInput, FormFileInput, FormAdvancedSelect } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';
import Select from 'react-select';
import { connect } from 'react-redux';

const DifficultiesSelect = (props) => {
    const { input, meta: { touched, error, warning }, placeholder } = props;
    const options = [
        { value: 1, label: 'Очень простой в приготовлении' },
        { value: 2, label: 'Простой в приготовлении' },
        { value: 3, label: 'Посложнее простого' },
        { value: 4, label: 'Средней сложности' },
        { value: 5, label: 'Сложный в приготовлении' }
    ];
    return (<>
        <Select
            options={options}
            isMulti={false}
            value={input.value}
            onChange={input.onChange}
            onBlur={() => input.onBlur(input.value)}
            placeholder={placeholder}
        />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </>);
}

const maxMulti4 = validators.maxMulti(4)

const CreateRecipeForm = (props) => {
    const hasSelectedIngredients = !!props.selectedIngredients;
    return (<form style={{ marginBottom: "30px" }} onSubmit={props.handleSubmit} action="POST">
        <FormGroup>
            <Field validate={[validators.multiRequired, maxMulti4]} name="categories" component={FormAdvancedSelect} options={props.categories} isMulti={true} placeholder="Выберите категории для рецепта" />
        </FormGroup>
        <FormGroup>
            <Field validate={[validators.required]} name="title" component={FormInput} type="text" placeholder="Введите название рецепта" />
        </FormGroup>
        <FormGroup>
            <Field validate={[validators.required]} name="difficulty" component={DifficultiesSelect} placeholder="Выберите сложность" />
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
            <div><Field name="sideImage1" component={FormFileInput} /></div>
        </FormGroup>
        <FormGroup>
            <Label>Доп изображение 2</Label>
            <div><Field name="sideImage2" component={FormFileInput} /></div>
        </FormGroup>
        <FormGroup>
            <Label>Доп изображение 3</Label>
            <div><Field name="sideImage3" component={FormFileInput} /></div>
        </FormGroup>
        <FormGroup>
            <Field validate={[validators.multiRequired, maxMulti4]} name="ingredients" component={FormAdvancedSelect} options={props.ingredients} isMulti={true} placeholder="Выберите ингредиенты для рецепта" />
        </FormGroup>
        {hasSelectedIngredients && (props.selectedIngredients.length ?
            (<>
                <h5>Введите граммовки для добавленных ингредиентов</h5>
                {props.selectedIngredients.map(i => {
                    return (<FormGroup key={i.value}>
                        <Field key={i.Id} validate={[validators.required]} name={i.value} component={FormInput} placeholder={`Граммовки для ${i.label}`} />
                   </FormGroup>);
                })}
            </>) : null)
        }
        <Button disabled={props.submitting}>Создать рецепт</Button>
    </form>);
};
const ReduxCreateRecipeForm = reduxForm({
    form: 'create-recipe'
})(CreateRecipeForm);

const selector = formValueSelector('create-recipe');

const mapStateToProps = state => ({
    selectedIngredients: selector(state, 'ingredients')
});

export default connect(mapStateToProps)(ReduxCreateRecipeForm);