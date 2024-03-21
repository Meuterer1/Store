import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content?: string;
  background?: string;
  color?: string;
}

const ButtonComponent = styled.button<ButtonProps>`
  font-family: 'Satoshi-500', snas-serif;
  font-size: 18px;

  border: none;
  border-radius: 62px;
  padding: 16px 32px;

  background-color: ${(props) => props.background};
  color: ${(props) => props.color};

  transition: 0.7s ease;

  &:hover {
    background-color: #00000099;
    cursor: pointer;
  }
`;

const Button: FC<ButtonProps> = ({ content, onClick, ...props }) => {
  return (
    <ButtonComponent onClick={onClick} {...props}>
      {content}
    </ButtonComponent>
  );
};

export default Button;
