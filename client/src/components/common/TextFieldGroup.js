import React from 'react';
import { FormControl, TextField } from '@material-ui/core';

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
        <FormControl fullWidth={true} margin="normal">
            <TextField
              type={type}
              error={error ? true : false}
              placeholder={placeholder}
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              disabled={disabled}
              variant="outlined"
              helperText={error}/>
              {info && <small className="form-text text-muted">{info}</small>}
        </FormControl>
    );
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;