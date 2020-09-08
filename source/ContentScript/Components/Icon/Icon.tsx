import React from 'react'
import styled, { css, useTheme } from 'styled-components'

import { Highlight } from '../Theme/themeStyle'

/**
 * If a path requires a viewbox other than the default you can instead assign an array as follows:
 * [ viewbox, path ]
 */
export const IconPaths = {
  arrowDown:
    'M13.707,9.707 L8.707,14.707 C8.317,15.098 7.683,15.098 7.293,14.707 L2.293,9.707 C1.902,9.316 1.902,8.683 2.293,8.293 C2.684,7.903 3.317,7.902 3.707,8.293 L7,11.586 L7,2 C7,1.448 7.448,1 8,1 C8.552,1 9,1.448 9,2 L9,11.586 L12.293,8.293 C12.488,8.098 12.744,8 13,8 C13.256,8 13.512,8.098 13.707,8.293 C14.098,8.684 14.098,9.317 13.707,9.707 Z',
  arrowLeft:
    'M6.293,13.707 L1.293,8.707 C0.902,8.317 0.902,7.683 1.293,7.293 L6.293,2.293 C6.684,1.902 7.317,1.902 7.707,2.293 C8.097,2.684 8.098,3.317 7.707,3.707 L4.414,7 L14,7 C14.552,7 15,7.448 15,8 C15,8.552 14.552,9 14,9 L4.414,9 L7.707,12.293 C7.902,12.488 8,12.744 8,13 C8,13.256 7.902,13.512 7.707,13.707 C7.316,14.098 6.683,14.098 6.293,13.707 Z',
  arrowRight:
    'M9.707,13.707 C9.317,14.098 8.684,14.098 8.293,13.707 C8.098,13.512 8,13.256 8,13 C8,12.744 8.098,12.488 8.293,12.293 L11.586,9 L2,9 C1.448,9 1,8.552 1,8 C1,7.448 1.448,7 2,7 L11.586,7 L8.293,3.707 C7.902,3.317 7.903,2.684 8.293,2.293 C8.683,1.902 9.316,1.902 9.707,2.293 L14.707,7.293 C15.098,7.683 15.098,8.317 14.707,8.707 L9.707,13.707 Z',
  arrowUp:
    'M13.707,6.293 C14.098,6.683 14.098,7.316 13.707,7.707 C13.512,7.902 13.256,8 13,8 C12.744,8 12.488,7.902 12.293,7.707 L9,4.414 L9,14 C9,14.552 8.552,15 8,15 C7.448,15 7,14.552 7,14 L7,4.414 L3.707,7.707 C3.317,8.098 2.684,8.097 2.293,7.707 C1.902,7.317 1.902,6.684 2.293,6.293 L7.293,1.293 C7.683,0.902 8.317,0.902 8.707,1.293 L13.707,6.293 Z',
  joystick: [
    '0 0 512 512',
    'M381 367c0-24.813-20.187-45-45-45H176c-24.813 0-45 20.187-45 45v15h250zM396 412H116c-30.327 0-55 24.673-55 55v30c0 8.284 6.716 15 15 15h360c8.284 0 15-6.716 15-15v-30c0-30.327-24.673-55-55-55zm-270 65c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zm190 0H196c-8.284 0-15-6.716-15-15s6.716-15 15-15h120c8.284 0 15 6.716 15 15s-6.716 15-15 15zm70 0c-8.284 0-15-6.716-15-15s6.716-15 15-15 15 6.716 15 15-6.716 15-15 15zM296 181.179c33.301-15.408 55-48.783 55-86.179 0-52.383-42.617-95-95-95s-95 42.617-95 95c0 37.396 21.699 70.771 55 86.179V292h80z',
  ],
  questionMark: [
    '0 0 31.357 31.357',
    'M15.255 0c5.424 0 10.764 2.498 10.764 8.473 0 5.51-6.314 7.629-7.67 9.62-1.018 1.481-.678 3.562-3.475 3.562-1.822 0-2.712-1.482-2.712-2.838 0-5.046 7.414-6.188 7.414-10.343 0-2.287-1.522-3.643-4.066-3.643-5.424 0-3.306 5.592-7.414 5.592-1.483 0-2.756-.89-2.756-2.584C5.339 3.683 10.084 0 15.255 0zm-.211 24.406a3.492 3.492 0 013.475 3.476 3.49 3.49 0 01-3.475 3.476 3.49 3.49 0 01-3.476-3.476 3.491 3.491 0 013.476-3.476z',
  ],
}

export type IconNames = keyof typeof IconPaths

export interface IconProps extends React.SVGAttributes<SVGElement> {
  autoSize?: boolean
  background?: Highlight
  color?: string
  height?: number
  highlight?: Highlight
  name: IconNames
  onClick?: () => void
  width?: number
}

const StyledSVG = styled.svg<{ autoSize?: boolean }>`
  cursor: ${props => (props.onClick ? 'pointer' : undefined)};

  ${props =>
    props.autoSize &&
    css`
      width: 100%;
      height: 100%;
    `};
`
export const Icon: React.FC<IconProps> = ({
  autoSize,
  name,
  width = 16,
  height = 16,
  highlight = 'white',
  color,
  onClick,
  background,
}) => {
  const theme = useTheme()
  const icon = Array.isArray(IconPaths[name])
    ? IconPaths[name]
    : ['0 0 16 16', IconPaths[name] as string]

  return (
    <StyledSVG
      className="Icon"
      fill={color ? color : theme.color[highlight]}
      width={`${width}px`}
      height={`${height}px`}
      viewBox={icon[0]}
      onClick={onClick}
      autoSize={autoSize}
    >
      {background && (
        <circle fill={theme.color[background]} cx="8" cy="8" r="8" />
      )}
      {name && <path fill="inherit" fillRule="evenodd" d={icon[1]} />}
    </StyledSVG>
  )
}
