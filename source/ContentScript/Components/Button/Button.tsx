import React from 'react'
import styled, { css } from 'styled-components'

import { LoadingBars } from '../Spinner/LoadingBars'
import { Highlight } from '../Theme/themeStyle'

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean
  highlight?: Highlight
  loading?: boolean
  uppercase?: boolean
}

export const StyledButton = styled.div<ButtonProps>(
  ({
    disabled,
    highlight = 'secondary',
    loading,
    theme: { color },
    uppercase = true,
  }) => css`
    height: 34px;
    padding: 0 1.5em;
    border-radius: 3px;

    background: ${color[highlight]};
    color: ${color.white};

    display: grid;
    place-content: center;

    cursor: pointer;
    transition: all 0.2s ease-in-out;

    font-weight: bold;

    text-decoration: none;
    text-rendering: optimizeLegibility;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.65);
    text-transform: ${uppercase && 'uppercase'};
    transition-duration: 0.2s;
    transition-property: background-color, border, color, box-shadow,
      text-shadow;
    transition-timing-function: ease-in-out;

    ${disabled && {
      cursor: 'not-allowed',
      opacity: 0.6,
    }}

    ${loading && {
      cursor: 'wait',
    }}
  `,
)

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...props
}) => (
  <StyledButton {...props} loading={loading}>
    {loading ? <LoadingBars size={15} highlight="white" /> : children}
  </StyledButton>
)
