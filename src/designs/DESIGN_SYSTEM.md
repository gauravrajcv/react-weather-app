# 🎨 Design System - Figma Integration

## Overview

This document describes how the React Weather App integrates with Figma for design-to-code workflow.

**Figma File**: [Weather Dashboard - Community](https://www.figma.com/design/6NbxzZ2fb7s3krDliQv5qm/Weather-Dashboard--Community-?node-id=0-1)

---

## 🛠️ Setup

### 1. Get Figma Personal Access Token

1. Go to [Figma Settings](https://www.figma.com/account/api)
2. Click "Generate a new personal access token"
3. Copy and save the token securely
4. Add to `.env.local`:
   ```
   FIGMA_TOKEN=your_token_here
   ```

### 2. Install Dependencies

```bash
npm install figma-api
```

### 3. Run Design Export

```bash
npm run design:export
```

This will sync design tokens from Figma to `src/designs/`.

---

## 📐 Design System Structure

### Colors
Located in: `src/styles/designTokens.ts`

**Primary Palette:**
- Primary Blue: `#3B82F6`
- Secondary Green: `#10B981`
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`

**Neutral:**
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`
- Text: `#1F2937`
- Text Light: `#6B7280`

### Typography

**Font Family**: Roboto (Primary), Roboto Mono (Code)

**Font Sizes:**
- xs: 12px
- sm: 14px
- base: 16px (body default)
- lg: 18px
- xl: 20px
- 2xl: 24px (heading)
- 3xl: 32px (large heading)
- 4xl: 48px (hero)

**Font Weights:**
- Light: 300
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Spacing

Uses 4px base unit:
- 0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Border Radius

- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

### Shadows

- sm: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- md: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` (default)
- lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- xl: `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

### Breakpoints

- xs: 320px (Mobile)
- sm: 375px (Mobile iPhone)
- md: 768px (Tablet)
- lg: 1024px (Desktop)
- xl: 1280px (Large Desktop)
- 2xl: 1536px (Extra Large)

---

## 🧩 Components

### Button Component
- Sizes: sm (32px), md (40px), lg (48px)
- Variants: primary, secondary, outline, ghost
- States: default, hover, active, disabled, loading

### Input Field
- Height: 40px
- Padding: 12px 16px
- Border radius: 8px
- Focus state with primary color

### Card
- Border radius: 12px
- Padding: 16px
- Shadow: md (default)
- Responsive padding

### Weather Widget
- Main display component
- Shows temperature, condition, details
- Responsive layout
- Loading and error states

### Header/Navigation
- Sticky top position
- Theme toggle
- User profile menu

---

## 🚀 Using Design Tokens

### Import Tokens

```typescript
import { colors, spacing, typography, borderRadius } from '@/styles/designTokens';

// Usage in styled components
const StyledButton = styled.button`
  background-color: ${colors.primary};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.lg};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
`;
```

### In CSS

```css
.button {
  background-color: var(--color-primary);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-lg);
}
```

### In Tailwind Config

```javascript
module.exports = {
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      // ... etc
    },
    spacing: {
      0: '0px',
      1: '4px',
      // ... etc
    },
  },
};
```

---

## 📝 Best Practices

### ✅ Do's
- Use design tokens for ALL colors, spacing, typography
- Keep Figma designs updated when code changes
- Reference Figma for component specifications
- Export assets from Figma (SVG for icons)
- Use design tokens in Tailwind config
- Maintain component variants in Figma

### ❌ Don'ts
- Don't hardcode colors in code
- Don't use arbitrary spacing values
- Don't ignore Figma design specs
- Don't create components not in Figma
- Don't use different naming conventions

---

## 🔄 Design-to-Code Workflow

1. **Design Phase** (Figma)
   - Create/update components in Figma
   - Define styles and variants
   - Export assets

2. **Sync Phase**
   - Run `npm run design:export`
   - Update design tokens
   - Verify changes

3. **Development Phase**
   - Use design tokens in components
   - Reference Figma specs
   - Create React components

4. **Testing Phase**
   - Compare with Figma design
   - Check responsive behavior
   - Verify component states

5. **Deploy Phase**
   - Run `npm run design:sync`
   - Build and deploy
   - Update documentation

---

## 📚 Resources

- **Figma File**: https://www.figma.com/design/6NbxzZ2fb7s3krDliQv5qm/Weather-Dashboard
- **Design Tokens**: `src/styles/designTokens.ts`
- **Figma API**: https://www.figma.com/developers/api
- **Figma Plugins**: https://www.figma.com/plugins

---

## 🤝 Team Collaboration

### Sharing Design Files
1. Open Figma file
2. Click "Share"
3. Set permissions (View/Edit)
4. Share link with team

### Dev Mode
1. Enable Dev Mode in Figma
2. Developers can inspect and get CSS values
3. Export assets directly

### Design Review
1. Use Figma comments for feedback
2. Tag team members (@username)
3. Resolve comments before implementation

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| FIGMA_TOKEN not set | Add token to `.env.local` |
| Export fails | Check API rate limits (120/min) |
| Colors not syncing | Verify Figma color styles exist |
| Components mismatch | Update component names in Figma |

---

## 📞 Support

For questions or issues:
1. Check Figma design first
2. Review design tokens documentation
3. Run `npm run design:export` to sync
4. Refer to this guide

---

**Last Updated**: November 27, 2025  
**Version**: 1.0.0  
**Status**: ✅ Active
