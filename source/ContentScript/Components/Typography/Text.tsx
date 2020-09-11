import styled, { css } from 'styled-components'

import { parsePosition, TypographyProps } from './Common'

export const Text = styled.p<TypographyProps>(
  ({ theme: { fontSize }, bold, uppercase, ...rest }) => css`
    font-size: ${fontSize.body};
    text-transform: ${uppercase ? 'uppercase' : 'none'};
    font-weight: ${bold && 'bold'};
    word-break: break-word;
    margin: 0;

    ${parsePosition(rest)}
  `,
)
