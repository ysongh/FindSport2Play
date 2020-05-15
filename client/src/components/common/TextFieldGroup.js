import React from 'react';
import TextField from '@material-ui/core/TextField';

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
        <div >
            <TextField
              fullWidth={true}
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
        </div>
    );
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;