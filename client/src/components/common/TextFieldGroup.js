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
        <FormControl fullWidth={true}>
            <TextField
              type={type}
              error={error}
              placeholder={placeholder}
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              disabled={disabled}
              margin="normal"
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