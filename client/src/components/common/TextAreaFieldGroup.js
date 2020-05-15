import React from 'react';
import TextField from '@material-ui/core/TextField';

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
        <div>
            <TextField
              label={label}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              error={error}
              variant="outlined"
              rows={5} 
              fullWidth={true}
              multiline />
              {info && <small className="form-text text-muted">{info}</small>}
        </div>
    );
};

export default TextAreaFieldGroup;