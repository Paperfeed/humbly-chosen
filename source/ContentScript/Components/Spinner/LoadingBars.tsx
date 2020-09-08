import React from 'react'
import styled, { css, keyframes } from 'styled-components'

import { Highlight } from '../Theme/themeStyle'

export interface LoadingBarsProps {
  flexGrow?: boolean
  fullHeight?: boolean
  fullWidth?: boolean
  height?: string
  highlight?: Highlight
  loading?: boolean
  margin?: string
  nrOfBars?: number
  size?: number
  width?: string
}

const loadingAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.7;
  }
`

const animationDuration = 500

const StyledLoadingBars = styled.div<{
  flexGrow?: boolean
  fullHeight?: boolean
  fullWidth?: boolean
  height?: string
  highlight: Highlight
  margin?: string
  nrOfBars: number
  radius?: string
  size: number
  width?: string
}>(
  ({
    flexGrow,
    fullWidth,
    fullHeight,
    margin,
    theme: { color },
    highlight,
    width,
    height,
    radius = '3px',
    size,
    nrOfBars,
  }) => css`
    display: flex;
    ${flexGrow ? 'flex: 1;' : ''}
    ${!flexGrow && {
      height: fullHeight ? '100%' : undefined,
      width: fullWidth ? '100%' : undefined,
    }}

    justify-content: center;
    align-items: center;
    margin: ${margin};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: ${width || `${size}px`};
      height: ${height ? height : `${size * 0.8}px`};

      > span {
        opacity: 0;
        transition: all 0.2s ease-in-out;
        background: ${color[highlight]};
        animation: ${loadingAnimation} ${animationDuration}ms ease-in-out
          infinite;
        animation-direction: alternate;
        animation-fill-mode: forwards;
        width: ${100 / (nrOfBars + 1)}%;
        border-radius: ${radius};
      }

      ${Array(nrOfBars)
        .fill(0)
        .map((_, i) => ({
          [`> span:nth-child(${++i})`]: {
            animationDelay: `${animationDuration * (0.3 * i)}ms`,
            height: i % 2 ? '80%' : '100%',
          },
        }))}
    }
  `,
)

export const LoadingBars: React.FC<LoadingBarsProps> = ({
  loading = true,
  size = 60,
  highlight = 'tertiary',
  nrOfBars = 3,
  ...props
}) => (
  <>
    {loading && (
      <StyledLoadingBars
        nrOfBars={nrOfBars}
        size={size}
        highlight={highlight}
        {...props}
      >
        <div>
          {Array(nrOfBars)
            .fill(0)
            .map((_, i) => (
              <span key={i} />
            ))}
        </div>
      </StyledLoadingBars>
    )}
  </>
)
