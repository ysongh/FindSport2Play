import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return(
        <div className="form-group">
            <input
              type={type}
              className={classnames('form-control form-control-lg', {
                  'is-invalid': error
              })}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              disabled={disabled}/>
              {info && <small className="form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;