import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    onChange
}) => {
    return(
        <div className="form-group">
            <label>{label}</label>
            <textarea
              className={classnames('form-control form-control-lg', {
                  'is-invalid': error
              })}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}/>
              {info && <small className="form-text text-muted">{info}</small>}
              {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

export default TextAreaFieldGroup;