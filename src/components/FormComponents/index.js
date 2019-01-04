import React from 'react';
import { Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

export const FormCheckbox = ({ input, meta: { touched, error, warning } }) => (<>
    <Input {...input} type="checkbox" />
    {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
</>);

export const FormInput = ({ input, disabled, className, placeholder, type,
    meta: { touched, error, warning } }) => (<>
        <Input {...input}
            disabled={disabled}
            placeholder={placeholder || ''}
            className={className || ''}
            type={type || 'text'}
            autoComplete="off" />
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </>);

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

export const FormFileInput = ({ 
    input: { value: omitValue, onChange, onBlur, ...inputProps }, 
    meta: omitMeta, 
    ...props 
  }) => {
    return (
      <input
        onChange={adaptFileEventToValue(onChange)}
        onBlur={adaptFileEventToValue(onBlur)}
        type="file"
        {...props.input}
        {...props}
      />
    );
  };
  
  export const FileUpload = (props) => {
      return (
            <form encType="multipart/form-data" onSubmit={props.handleSubmit}>
              <div>
                <label>User Avatar</label>
                <Field name="login" component={FormInput} placeholder="Login"/>
                <Field name="userAvatar" component={FormFileInput} type="file"/>
              </div>
              <button type="submit">Submit</button>
            </form>
      )
  }
  
  export default reduxForm({
      form: 'fileupload'
  })(FileUpload)