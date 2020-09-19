import React from 'react'
import styled from 'styled-components'

import { GameDataResponse } from '../../../lib/igdb'
import { Score } from '../../Score/Score'
import { Icon } from '../Icon/Icon'
import { BackgroundGradient } from '../Theme/gradients'
import { ToolTip } from '../Tooltip/ToolTip'

export interface GameCardProps {
  data: GameDataResponse | undefined
  ownsGame?: boolean
}

const CircleBadge = styled.div<{ color: string }>`
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
      <StyledGameCard ownsGame={ownsGame}>
        <ToolTip content={<span>Could not find any data</span>}>
          <CircleBadge color={'#3c3c3c'}>
            <Icon
              width={15}
              height={15}
              highlight="white"
              name="questionMark"
            />
          </CircleBadge>
        </ToolTip>
        {ownsGame && (
          <ToolTip content={<span>You already own this game</span>}>
            <CircleBadge color={'#3894eb'}>
              <Icon width={15} height={15} highlight="white" name="joystick" />
            </CircleBadge>
          </ToolTip>
        )}
      </StyledGameCard>
    )

  const parseRating = (rating: undefined | number) =>
    rating && isNaN(rating) ? undefined : rating && Math.round(rating)

  return (
    <StyledGameCard
      background={BackgroundGradient.css('linear', 'to bottom')}
      ownsGame={ownsGame}
    >
      <Score
        totalRating={{
          count: data.total_rating_count,
          rating: parseRating(data.total_rating),
        }}
        aggregatedRating={{
          count: data.aggregated_rating_count,
          rating: parseRating(data.aggregated_rating),
        }}
        rating={{ count: data.rating_count, rating: parseRating(data.rating) }}
      />
      {ownsGame && (
        <ToolTip content={<span>You already own this game</span>}>
          <CircleBadge color={'#3894eb'}>
            <Icon width={15} height={15} highlight="white" name="joystick" />
          </CircleBadge>
        </ToolTip>
      )}
    </StyledGameCard>
  )
}
