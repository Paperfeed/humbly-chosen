/* eslint-disable @typescript-eslint/camelcase */
import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import styled from 'styled-components'

import { createMockData } from '../../../../.storybook/utilities'
import { GameCard, GameCardProps } from './GameCard'

const StyledContainer = styled.div`
  position: relative;
  max-width: 240px;
  background-image: url('https://source.unsplash.com/random/400x200');

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 0;
    padding-bottom: calc(100% / 1.25);
  }
`

export default {
  component: GameCard,
  title: 'Components/GameCard',
}

const Template: Story<GameCardProps> = args => {
  return (
    <StyledContainer>
      <GameCard {...args} />
    </StyledContainer>
  )
}

export const DefaultGameCard = Template.bind({})
export const NoData = Template.bind({})

DefaultGameCard.args = {
  data: createMockData(),
  ownsGame: false,
}

NoData.args = {
  // data: {},
  ownsGame: false,
}
