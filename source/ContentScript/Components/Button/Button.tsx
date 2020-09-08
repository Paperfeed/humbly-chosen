import React from 'react'
import styled from 'styled-components'

import { LoadingBars } from '../Spinner/LoadingBars'

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  loading?: boolean
}

export const StyledButton = styled.div<ButtonProps>`
  height: 34px;
  padding: 0 10px;
  border-radius: 3px;

  background: ${props => props.theme.color.secondary};
  color: ${props => props.theme.color.white};

  display: grid;
  place-content: center;

  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${props =>
    props.disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }}

  ${props =>
    props.loading && {
      cursor: 'wait',
    }}
`

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => (
  <StyledButton {...props} loading={loading}>
    {loading ? <LoadingBars size={15} /> : children}
  </StyledButton>
)
