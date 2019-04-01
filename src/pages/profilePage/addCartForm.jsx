import React from 'react';
import { FormGroup, Button, Input, Label } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { FormInput, FormFileInput, FormAdvancedSelect } from '../../components/FormComponents';
import * as validators from '../../utils/formValidators.js';
import Select from 'react-select';
import { connect } from 'react-redux';

const maxMulti10 = validators.maxMulti(10);

const AddCartForm = (props) => {
    const hasSelectedIngredients = !!props.selectedIngredients;
    return (<form style={{ marginBottom: "30px" }} onSubmit={props.handleSubmit} action="POST">
        <FormGroup>
            <Field validate={[validators.required]} name="title" component={FormInput} type="text" placeholder="Введите название карточки" />
        </FormGroup>
        <FormGroup>
            <Field validate={[validators.required]} name="text" component={FormInput} type="text" placeholder="Введите описание карточки" />
        </FormGroup>
        <FormGroup>
            <Field validate={[validators.multiRequired, maxMulti10]} name="recipes" component={FormAdvancedSelect} options={props.recipes} isMulti={true} placeholder="Выберите рецепты для карточки" />
        </FormGroup>
        {hasSelectedIngredients && (props.selectedIngredients.length ?
            (<>
                <h5>Введите количество порций для добавленных рецептов</h5>
                {props.selectedIngredients.map(i => {
                    return (<FormGroup key={i.value}>
                        <Field key={i.Id} validate={[validators.required]} name={i.value} component={FormInput} placeholder={`Количество порций для ${i.label}`} />
                   </FormGroup>);
                })}
            </>) : null)
        }
        <Button disabled={props.submitting}>Создать карточку</Button>
    </form>);
};
const ReduxAddCartForm = reduxForm({
    form: 'add-cart'
})(AddCartForm);

const selector = formValueSelector('add-cart');

const mapStateToProps = state => ({
    selectedIngredients: selector(state, 'recipes')
});

export default connect(mapStateToProps)(ReduxAddCartForm);