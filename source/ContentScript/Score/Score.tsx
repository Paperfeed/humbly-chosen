import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

import { ScoreGradient } from '../Components/Theme/gradients'
import { ToolTip } from '../Components/Tooltip/ToolTip'

type Score = { count: number; rating: number | undefined }

interface ScoreProps {
  aggregatedRating: Score
  rating: Score
  totalRating: Score
}

const StyledScore = styled(motion.div)<{ color: string }>`
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

const parentVariants = {
  hover: {},
}

const childVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: '-10%',
  },
  hover: {
    height: 'auto',
    opacity: 1,
    y: '0%',
  },
}

const Container = styled(motion.div)``

const Expand = styled(motion.div)``

const ScoreBadge: React.FC<{ score: Score; type: string }> = ({
  score,
  type,
}) => (
  <ToolTip
    content={
      <span>
        {type} score - out of {score.count || 0} ratings
      </span>
    }
  >
    <StyledScore
      color={ScoreGradient.rgbAt((score.rating || 0) / 100).toRgbString()}
    >
      {score.rating}
    </StyledScore>
  </ToolTip>
)

export const Score: React.FC<ScoreProps> = ({
  aggregatedRating,
  rating,
  totalRating,
}) => (
  <Container variants={parentVariants} whileHover="hover">
    <ScoreBadge type="Total" score={totalRating} />
    <Expand variants={childVariants} initial="hidden" whileHover="hover">
      {aggregatedRating.rating && (
        <motion.div variants={childVariants}>
          <ScoreBadge type="Aggregated" score={aggregatedRating} />
        </motion.div>
      )}
      {rating.rating && (
        <motion.div variants={childVariants}>
          <ScoreBadge type="Rating" score={rating} />
        </motion.div>
      )}
    </Expand>
  </Container>
)
