import React from 'react';
import { FormControl, TextField } from '@material-ui/core';

const DateFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    onChange
}) => {
    return(
        <FormControl margin="normal">
            <TextField
              type="date"
              error={error ? true : false}
              placeholder={placeholder}
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              variant="outlined"
              helperText={error}
              InputLabelProps={{
                shrink: true,
              }} />
        </FormControl>
    );
};

export default DateFieldGroup;