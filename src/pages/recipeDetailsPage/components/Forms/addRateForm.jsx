import React from 'react';
import { FormGroup, Button, Label } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { FormInput } from '../../../../components/FormComponents';
import * as validators from '../../../../utils/formValidators.js';


const AddRateForm = (props) => {
    return (<form style={{ marginBottom: "20px" }} onSubmit={props.handleSubmit} action="POST">
         <FormGroup check>
            <Label check>
              <Field validate={[validators.required]} name="rate" component={FormInput} type="radio" value="1" />{' '}
              1
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field validate={[validators.required]} name="rate" component={FormInput} type="radio" value="2" />{' '}
              2
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field validate={[validators.required]} name="rate" component={FormInput} type="radio" value="3" />{' '}
              3
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field validate={[validators.required]} name="rate" component={FormInput} type="radio" value="4" />{' '}
              4
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
            <Field validate={[validators.required]} name="rate" component={FormInput} type="radio" value="5" />{' '}
              5
            </Label>
          </FormGroup>
            <Button disabled={props.submitting}>Добавить оценку</Button>
        </form>);
};

export default reduxForm({
    form: 'add-rate'
})(AddRateForm);
