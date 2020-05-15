import React from 'react';
import { FormControl, TextField } from '@material-ui/core';

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
        <FormControl fullWidth={true} margin="normal">
            <TextField
              label={label}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={onChange}
              error={error ? true : false}
              variant="outlined"
              rows={5} 
              multiline />
              {info && <small className="form-text text-muted">{info}</small>}
        </FormControl>
    );
};

export default TextAreaFieldGroup;