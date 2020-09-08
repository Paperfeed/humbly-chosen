import { Story } from '@storybook/react'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../Button/Button'
import { AnimatedHeight, AnimatedSlideInProps } from './AnimatedHeight'

const StyledCard = styled.div`
  border-radius: 3px;
  border: 1px solid orange;
  background: #c0c0c0;
`

export default {
  component: AnimatedHeight,
  title: 'Animations/AnimatedHeight',
}

export const Default: Story<AnimatedSlideInProps> = args => {
  const [show, setShow] = useState(false)

  return (
    <StyledCard>
      <AnimatedHeight {...args} show={show}>
        <span>You can hide or show me</span>
      </AnimatedHeight>
      <Button onClick={() => setShow(!show)}>Toggle</Button>
    </StyledCard>
  )
}

Default.args = {}

/*
storiesOf('Animations', module).add('AnimatedHeight', () => {
  const [show, setShow] = useState({ custom: false, default: false })

  return (
    <Container>
      Click the button to show a message
      <AnimatedHeight show={show.default}></AnimatedHeight>
      <Button onClick={() => setShow({ ...show, default: !show.default })}>
        {show ? 'Show' : 'Hide'}
      </Button>
      Click the button to show a message
      <div>
        <code style={{ whiteSpace: 'pre-line' }}>
          {`\nProps:\n
             fadeInAnim={ transform: 'translate3d(0, 0, 0)', opacity: 1 }
          fadeOutAnim={ transform: 'translate3d(-100%, 0, 0)', opacity: 0 }`}
        </code>
      </div>
      <AnimatedHeight
        show={show.custom}
        fadeInAnim={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        fadeOutAnim={{ opacity: 0, transform: 'translate3d(-100%, 0, 0)' }}
      >
        I won&apos;t take any space until you click the button, nor will I
        suddenly move the entire layout
      </AnimatedHeight>
      <Button onClick={() => setShow({ ...show, custom: !show.custom })}>
        {show ? 'Show' : 'Hide'}
      </Button>
    </Container>
  )
})*/

/*storiesOf('Animations', module).add('AnimatedList', () => {
  const [animationState, setAnimationState] = useState<string>('entering')
  const [enteringItems, setEnteringItems] = useState<string[]>([])
  const [exitingItems, setExitingItems] = useState<string[]>([
    'Exiting Item - 1',
    'Exiting Item - 2',
    'Exiting Item - 3',
  ])
  const [updatingItems, setUpdatingItems] = useState<{ height: string }[]>([
    { height: '0px' },
    { height: '0px' },
    { height: '0px' },
  ])

  useEffect(() => {
    const enteringInterval = setInterval(() => {
      setEnteringItems(items => {
        if (items.length >= 3) {
          return []
        } else {
          return [...items, `Entering Item - ${items.length + 1}`]
        }
      })
    }, 1200)

    const exitingInterval = setInterval(() => {
      setExitingItems(items => {
        if (items.length) {
          const randomItem = pickRandom(items)
          return [...items.filter(i => i !== randomItem)]
        } else {
          return ['Exiting Item - 1', 'Exiting Item - 2', 'Exiting Item - 3']
        }
      })
    }, 1200)

    const updatingInterval = setInterval(() => {
      setUpdatingItems(items => {
        const randomHeight = () => `${Math.round(Math.random() * 200)}px`
        return items.map(item => ({ ...item, height: randomHeight() }))
      })
    }, 3000)

    return () => {
      clearInterval(enteringInterval)
      clearInterval(exitingInterval)
      clearInterval(updatingInterval)
    }
  }, [])

  return (
    <Container>
      <div onClick={() => setAnimationState('entering')}>Entering</div>
      <div onClick={() => setAnimationState('exiting')}>Exiting</div>
      <div onClick={() => setAnimationState('updating')}>Updating</div>
      {animationState == 'entering' && (
        <div>
          <AnimatedList unique>
            {enteringItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </AnimatedList>
        </div>
      )}
      {animationState === 'exiting' && (
        <div>
          <AnimatedList unique>
            {exitingItems.map(item => (
              <div key={item}>{item}</div>
            ))}
          </AnimatedList>
        </div>
      )}

      {animationState === 'updating' && (
        <div>
          <AnimatedList unique>
            {updatingItems.map((item, index) => {
              return (
                <div key={index} style={{ height: item.height }}>
                  {item.height}
                </div>
              )
            })}
          </AnimatedList>
        </div>
      )}
    </Container>
  )
})*/

/*storiesOf('Animations', module).add('AnimatedGrid', () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6])

  return (
    <Container>
      <AnimatedGrid
        minChildSize="200px"
        direction="column"
        gap="30px"
        templateColumns="1fr 1fr"
      >
        {items.map(i => (
          <div key={i} onClick={() => setItems(items.filter(n => n !== i))}>
            {i}
          </div>
        ))}
      </AnimatedGrid>
    </Container>
  )
})*/
