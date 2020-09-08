import styled from 'styled-components'

interface InputProps {
  readOnly?: boolean
}

export const Input = styled.input<InputProps>`
  height: 30px;
  padding: 0 10px;
  border-radius: 3px;
  outline: none;
  border: 2px solid ${props => props.theme.color.secondary};
  color: ${props => props.theme.color.black};

  ${props =>
    props.readOnly && {
      background: props.theme.color.primaryDark,
      border: `2px solid ${props.theme.color.primaryBlue}`,
      color: props.theme.color.white,
    }}
`
