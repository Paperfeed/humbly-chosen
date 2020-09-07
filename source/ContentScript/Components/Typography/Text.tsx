import styled from 'styled-components'

import { TypographyProps } from './Common'

export const Text = styled.p<TypographyProps>`
  font-size: ${props => props.theme.fontSize.body};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  word-break: break-word;
  margin: 0;
`
