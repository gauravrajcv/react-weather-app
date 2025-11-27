/**
 * Design System Utilities
 * Helper functions for using design tokens throughout the app
 */

import { designTokens, colors, spacing, typography, borderRadius } from './designTokens';

/**
 * Get color value by name
 */
export const getColor = (colorName: keyof typeof colors): string => {
  return colors[colorName] || colors.text;
};

/**
 * Get spacing value by scale
 */
export const getSpacing = (scale: keyof typeof spacing): string => {
  return spacing[scale] || spacing[4];
};

/**
 * Get typography styles
 */
export const getTypography = (variant: 'h1' | 'h2' | 'h3' | 'body' | 'caption') => {
  return typography.styles[variant];
};

/**
 * Get border radius value
 */
export const getBorderRadius = (size: keyof typeof borderRadius): string => {
  return borderRadius[size] || borderRadius.md;
};

/**
 * Generate responsive padding
 */
export const getResponsivePadding = (
  mobile: keyof typeof spacing,
  tablet: keyof typeof spacing,
  desktop: keyof typeof spacing
) => ({
  mobile: spacing[mobile],
  tablet: spacing[tablet],
  desktop: spacing[desktop],
});

/**
 * Generate responsive font sizes
 */
export const getResponsiveFontSize = (
  mobile: keyof typeof typography.fontSize,
  desktop: keyof typeof typography.fontSize
) => ({
  mobile: typography.fontSize[mobile],
  desktop: typography.fontSize[desktop],
});

/**
 * Common style combinations
 */
export const commonStyles = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  absoluteCenter: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

/**
 * Breakpoint helpers
 */
export const media = {
  mobile: `@media (min-width: ${designTokens.breakpoints.xs})`,
  mobileSm: `@media (min-width: ${designTokens.breakpoints.sm})`,
  tablet: `@media (min-width: ${designTokens.breakpoints.md})`,
  desktop: `@media (min-width: ${designTokens.breakpoints.lg})`,
  largeDesktop: `@media (min-width: ${designTokens.breakpoints.xl})`,
  extraLarge: `@media (min-width: ${designTokens.breakpoints['2xl']})`,
};

/**
 * Truncate text
 */
export const truncateText = (lines: number = 1) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  WebkitLineClamp: lines,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as const,
});

/**
 * Focus outline for accessibility
 */
export const focusOutline = `
  &:focus {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;

export default {
  designTokens,
  getColor,
  getSpacing,
  getTypography,
  getBorderRadius,
  getResponsivePadding,
  getResponsiveFontSize,
  commonStyles,
  media,
  truncateText,
  focusOutline,
};
