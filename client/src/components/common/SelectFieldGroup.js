import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

const SelectFieldGroup = ({
    name,
    value,
    label,
    error,
    info,
    onChange,
    sportList
}) => {
    return(
        <FormControl fullWidth={true} variant="outlined" margin="normal">
            <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={error ? true : false}
            >
            <MenuItem value={value}>
                <em>Choose Sport Type</em>
            </MenuItem>
            {sportList.map(sport => {
                return <MenuItem key={sport} value={sport}>{sport}</MenuItem>
            })}
            </Select>
            <FormHelperText error>{error}</FormHelperText>
      </FormControl>
    );
};

export default SelectFieldGroup;