/**
 * Design Tokens - Synced from Figma
 * Weather Dashboard Design System
 * Last Updated: 2025-11-27
 */

// ============================================
// COLOR PALETTE
// ============================================
export const colors = {
  // Primary Colors
  primary: '#3B82F6',      // Blue
  primaryDark: '#1E40AF',  // Dark Blue
  primaryLight: '#DBEAFE', // Light Blue

  // Secondary Colors
  secondary: '#10B981',    // Green
  secondaryDark: '#047857', // Dark Green

  // Status Colors
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
  info: '#3B82F6',         // Blue

  // Neutral
  background: '#FFFFFF',   // White
  backgroundDark: '#111827', // Dark background
  surface: '#F9FAFB',      // Light gray
  border: '#E5E7EB',       // Light border
  borderDark: '#374151',   // Dark border
  text: '#1F2937',         // Dark text
  textLight: '#6B7280',    // Light text
  textLighter: '#9CA3AF',  // Lighter text
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Roboto Mono', 'SF Mono', Monaco, monospace",
  },

  // Font Sizes
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '48px',
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Text Styles
  styles: {
    h1: {
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    body: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
} as const;

// ============================================
// SPACING SCALE
// ============================================
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

// ============================================
// BREAKPOINTS
// ============================================
export const breakpoints = {
  xs: '320px',     // Mobile
  sm: '375px',     // Mobile (iPhone)
  md: '768px',     // Tablet
  lg: '1024px',    // Desktop
  xl: '1280px',    // Large Desktop
  '2xl': '1536px', // Extra Large Desktop
} as const;

// ============================================
// TRANSITIONS & ANIMATIONS
// ============================================
export const transitions = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
} as const;

// ============================================
// DARK MODE
// ============================================
export const darkMode = {
  colors: {
    background: '#111827',
    surface: '#1F2937',
    border: '#374151',
    text: '#F9FAFB',
    textLight: '#D1D5DB',
    textLighter: '#9CA3AF',
  },
} as const;

// ============================================
// COMPONENT SIZES
// ============================================
export const componentSizes = {
  button: {
    sm: {
      padding: '8px 12px',
      fontSize: '14px',
      height: '32px',
    },
    md: {
      padding: '12px 16px',
      fontSize: '16px',
      height: '40px',
    },
    lg: {
      padding: '16px 24px',
      fontSize: '18px',
      height: '48px',
    },
  },
  input: {
    height: '40px',
    padding: '12px 16px',
    fontSize: '16px',
  },
  card: {
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
} as const;

// ============================================
// EXPORT ALL TOKENS
// ============================================
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  darkMode,
  componentSizes,
} as const;

export default designTokens;
