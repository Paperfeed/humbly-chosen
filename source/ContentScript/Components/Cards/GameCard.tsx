import React from 'react'
import styled from 'styled-components'

import { GameDataResponse } from '../../../lib/igdb'
import { Icon } from '../Icon/Icon'
import { BackgroundGradient, ScoreGradient } from '../Theme/gradients'
import { ToolTip } from '../Tooltip/ToolTip'

export interface GameCardProps {
  data: GameDataResponse | undefined
  ownsGame?: boolean
}

const Score = styled.div<{ color: string }>`
  display: grid;
  place-content: center;

  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin: 5px;

  background: ${props => props.color};
  color: ${props => props.theme.color.black};
  box-shadow: 1px 2px 5px 0 #0000008a;

  cursor: default;
`

const StyledGameCard = styled.div<{ background?: string; ownsGame?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: grid;
  grid-auto-columns: min-content;
  grid-auto-flow: column;

  font-weight: bold;

  background: ${props => props.background};
  ${props =>
    props.ownsGame && {
      boxShadow: 'inset 0px 0px 80px 0px #00ff00a3',
    }}
`

export const GameCard: React.FC<GameCardProps> = ({ data, ownsGame }) => {
  if (!data)
    return (
      <StyledGameCard>
        <ToolTip content={<span>Could not find any data</span>}>
          <Score color={'#3c3c3c'}>
            <Icon
              width={15}
              height={15}
              highlight="white"
              name="questionMark"
            />
          </Score>
        </ToolTip>
      </StyledGameCard>
    )

  const aggregatedRating = isNaN(data?.aggregated_rating)
    ? undefined
    : Math.round(data?.aggregated_rating)
  const rating = isNaN(data?.rating) ? undefined : Math.round(data?.rating)

  return (
    <StyledGameCard
      background={BackgroundGradient.css('linear', 'to bottom')}
      ownsGame={ownsGame}
    >
      {aggregatedRating && (
        <ToolTip
          content={
            <span>Out of {data.aggregated_rating_count || 0} ratings</span>
          }
        >
          <Score
            color={ScoreGradient.rgbAt(aggregatedRating / 100).toRgbString()}
          >
            {aggregatedRating}
          </Score>
        </ToolTip>
      )}
      {rating && (
        <ToolTip content={<span>Out of {data.rating_count || 0} ratings</span>}>
          <Score color={ScoreGradient.rgbAt(rating / 100).toRgbString()}>
            {rating}
          </Score>
        </ToolTip>
      )}
      {ownsGame && (
        <ToolTip content={<span>You already own this game</span>}>
          <Score color={'#3894eb'}>
            <Icon width={15} height={15} highlight="white" name="joystick" />
          </Score>
        </ToolTip>
      )}
    </StyledGameCard>
  )
}
