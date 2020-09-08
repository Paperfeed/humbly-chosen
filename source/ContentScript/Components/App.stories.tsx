import { Story } from '@storybook/react'
import React from 'react'

import { createMockData } from '../../../.storybook/utilities'
import { GameDataResponse } from '../../lib/igdb'
import { DefaultGameCard } from './Cards/GameCard.stories'
import { Grid } from './Grid/Grid'

interface MockAppProps {
  data: GameDataResponse[]
}

const MockAppTemplate: Story<MockAppProps> = ({ data }) => {
  return (
    <Grid gap="20px" templateColumns="1fr 1fr 1fr" templateRows={'1fr 1fr 1fr'}>
      {data.map((_a, index) => (
        <DefaultGameCard
          key={index}
          data={createMockData()}
          ownsGame={Math.random() >= 0.5}
        />
      ))}
    </Grid>
  )
}

export default {
  component: MockAppTemplate,
  title: 'Scene/App',
}

export const MockApp = MockAppTemplate.bind({})

MockApp.args = {
  // eslint-disable-next-line prefer-spread
  data: Array.apply(null, Array(9)).map(() => createMockData()),
}
