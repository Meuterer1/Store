import React, { useState } from 'react';
import styled from 'styled-components';

import primaryTheme from '../theme/theme';

const { red } = primaryTheme.colors;

const FormContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    padding: 15px 30px;
    border-radius: 20px;
    margin-bottom: 10px;
  }

  input[type='checkbox'] {
    width: auto;
    margin: 0;
  }

  span {
    color: ${red};
  }

  .input-label {
    display: flex;
    gap: 10px;
  }

  .error {
    border: 2px solid ${red};
  }
`;

const FormInput = (props: any) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  const handleBlur = (e: any) => {
    if (!e.target.value) {
      setError(!error);
    } else setError(false);
    setFocused(!focused);
  };

  const handleFocus = () => {
    setError(false);
    inputProps.name === 'registrationRepeatPassword' ||
      (inputProps.name === 'password' && setFocused(true));
  };

  return (
    <FormContainer>
      <div className="input-label">
        <input
          {...inputProps}
          onChange={props.onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          focused={focused.toString()}
          className={error && 'error'}
        />
        <label htmlFor={props.name}>{label}</label>
      </div>

      {error && <span>{errorMessage}</span>}
    </FormContainer>
  );
};

export default FormInput;
