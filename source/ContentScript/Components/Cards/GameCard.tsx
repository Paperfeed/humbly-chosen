import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import tinygradient from 'tinygradient'

import { GameDataResponse } from '../../../lib/igdb'
import { clampToRange } from '../../../lib/utilities'
import { themeStyle } from '../Theme/themeStyle'
import { ToolTip } from '../Tooltip/ToolTip'

interface GameCardProps {
  data: GameDataResponse | undefined
  ownsGame: boolean
}

const Score = styled.div<{ color: string }>`
  border-radius: 50%;
  background: ${props => props.color};
  color: ${props => props.theme.color.black};
  width: 25px;
  height: 25px;
  margin: 5px;

  display: grid;
  place-content: center;
`

const StyledGameCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;
`

const gradient = tinygradient([
  { color: '#f72400', pos: 0 },
  { color: '#f8fc0c', pos: 0.7 },
  { color: '#24ff00', pos: 1 },
])

export const GameCard: React.FC<GameCardProps> = ({ data, ownsGame }) => {
  if (!data) return <StyledGameCard>No data found</StyledGameCard>

  const aggregatedRating = Math.round(data?.aggregated_rating)
  const rating = Math.round(data?.rating)

  return (
    <ThemeProvider theme={themeStyle}>
      <StyledGameCard>
        <ToolTip
          content={<span>Out of {data.aggregated_rating_count} ratings</span>}
        >
          <Score
            color={gradient
              .rgbAt(clampToRange(aggregatedRating, 100))
              .toRgbString()}
          >
            {aggregatedRating}
          </Score>
        </ToolTip>
        <ToolTip content={<span>Out of {data.rating_count} ratings</span>}>
          <Score
            color={gradient.rgbAt(clampToRange(rating, 100)).toRgbString()}
          >
            {rating}
          </Score>
        </ToolTip>
      </StyledGameCard>
    </ThemeProvider>
  )
}
