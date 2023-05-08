/** @format */

import React from 'react';

import { Link } from 'react-router-dom';
import { Button as ButtonComponent } from '@mui/material';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  to?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: string;
  leftContent?: boolean;
  className?: string;
  type?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  to,
  startIcon,
  endIcon,
  disabled,
  type,
  leftContent,
  className,
}) => {
  const Component = to ? Link : 'button';

  return (
    <ButtonComponent
      sx={[
        {
          '&': {
            textTransform: 'unset',
          },
          '& .MuiButton-startIcon, & .MuiButton-endIcon': {
            marginRight: '0px',
            marginLeft: '0px',
          },
        },
      ]}
      className={className}
      disabled={disabled ? true : false}
      startIcon={startIcon || undefined}
      endIcon={endIcon || undefined}
      component={Component}
      to={to || undefined}
      onClick={onClick || undefined}
      type={type}
    >
      {children}
    </ButtonComponent>
  );
};

export default Button;
