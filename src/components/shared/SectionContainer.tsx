import { COLORS, SPACING } from '../../styles'
import styled from 'styled-components'

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-color: ${COLORS.blueMedium} ${COLORS.blueDarkAlpha};
  padding: 0.8rem ${SPACING.medium};
  margin: 0 ${SPACING.primary} ${SPACING.small} 0;
  border-radius: ${SPACING.smallRadius};
  background-color: ${COLORS.greyDarkAlpha};
  box-shadow: ${COLORS.shadowBlueLight};
`
