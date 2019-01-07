import React from 'react';
import { Input } from 'reactstrap';

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
        accept="image/jpeg,image/png,image/gif"
        {...props.input}
        {...props}
      />
    );
  };