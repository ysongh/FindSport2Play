import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

const SelectFieldGroup = ({
    name,
    value,
    label,
    error,
    info,
    onChange
}) => {
    return(
        <FormControl fullWidth={true} variant="outlined">
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                helperText={error}
            >
            <MenuItem value={value}>
                <em>Choose Sport Type</em>
            </MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Tennis">Tennis</MenuItem>
            <MenuItem value="Soccer">Soccer</MenuItem>
            </Select>
            <FormHelperText error>{error}</FormHelperText>
      </FormControl>
    );
};

export default SelectFieldGroup;