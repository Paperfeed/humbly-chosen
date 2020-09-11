import styled, { css } from 'styled-components'

export const TabHeader = styled.div(
  ({ theme: { color } }) => css`
    padding: 1.25rem 0.625rem 1.25rem 1.5rem;
    border-radius: 6px;
    background: ${color.primaryBlue};

    font-weight: bold;
    text-transform: uppercase;
  `,
)

export const Tab = styled.div(
  ({ theme: { color } }) => css`
    background: ${color.primaryBlueAccent};
    border-radius: 6px;
    margin-bottom: 1.5em;
    padding: 1.5rem;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);

    ${TabHeader} {
      margin: -1.5rem -1.5rem 1.5rem;
    }
  `,
)
