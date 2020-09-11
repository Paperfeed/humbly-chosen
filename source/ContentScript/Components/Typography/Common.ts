export interface TypographyStyleProps {
  bold?: boolean
  uppercase?: boolean
}

export interface TypographyPositionProps {
  margin?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
  marginTop?: string
  padding?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  paddingTop?: string
}

export const parsePosition = ({
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
}: TypographyPositionProps) => ({
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
})
export type TypographyProps = TypographyStyleProps & TypographyPositionProps
