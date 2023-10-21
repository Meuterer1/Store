import React, { useState } from 'react';

import '../styles/Form.scss';

const FormInput = (props: any) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleBlur = () => {
    setFocused(true);
  };

  return (
    <div className="form_input">
      <input
        {...inputProps}
        onChange={props.onChange}
        onBlur={handleBlur}
        onFocus={() =>
          inputProps.name === 'registrationRepeatPassword' ||
          (inputProps.name === 'password' && setFocused(true))
        }
        focused={focused.toString()}
      />
      <label htmlFor={props.name}>{label}</label>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
