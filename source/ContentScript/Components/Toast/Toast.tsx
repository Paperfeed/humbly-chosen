import React, { useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import { ToastGradient } from '../Theme/gradients'

interface ToastProps {
  message?: string
  timeout?: number
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5em;
  z-index: 99999;

  display: flex;
  justify-content: center;
`
const StyledToast = animated(
  styled.div`
    position: relative;
    padding: 1.5em;
    border-radius: 6px;

    background: ${ToastGradient.css('linear', 'to bottom')};
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.65);
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.65);
    z-index: 999999;
  `,
)

export const Toast: React.FC<ToastProps> = ({ message, timeout = 2000 }) => {
  const [show, setShow] = useState<boolean | undefined>(undefined)

  const springProps = useSpring({
    [`${show ? 'from' : 'to'}`]: {
      opacity: 0,
      transform: 'translateY(100%)',
    },
    [`${show ? 'to' : 'from'}`]: {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  })

  useEffect(() => {
    if (!message) return
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, timeout)
  }, [message, timeout])

  return (
    <Container>
      {show !== undefined && (
        <StyledToast style={springProps}>{message}</StyledToast>
      )}
    </Container>
  )
}
