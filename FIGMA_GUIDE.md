# 🎨 Figma Integration - Quick Reference

## 📋 What Was Added

### 1. **Design Tokens** (`src/styles/designTokens.ts`)
- Centralized design system with all colors, typography, spacing, etc.
- Fully typed TypeScript file
- Easy to import and use in components

### 2. **System Utilities** (`src/styles/systemUtils.ts`)
- Helper functions: `getColor()`, `getSpacing()`, `getTypography()`
- Common styles: flexbox utilities, responsive helpers
- Media query helpers for responsive design

### 3. **Figma Export Script** (`scripts/figma-export.js`)
- Syncs designs from Figma to codebase
- Exports components and colors
- Generates documentation

### 4. **Configuration Files**
- `.figmarc.json` - Figma API configuration
- `.env.example` - Environment variables template

### 5. **Documentation** (`src/designs/DESIGN_SYSTEM.md`)
- Complete design system guide
- Setup instructions
- Usage examples
- Best practices

---

## 🚀 Quick Start

### 1. Get Figma Token
```bash
# Go to: https://www.figma.com/account/api
# Generate token and copy
```

### 2. Set Environment Variable
```bash
# Create .env.local
FIGMA_TOKEN=your_token_here
```

### 3. Run Design Export
```bash
npm run design:export
```

### 4. Use in Components
```typescript
import { colors, spacing } from '@/styles/designTokens';

export const MyButton = () => (
  <button style={{
    backgroundColor: colors.primary,
    padding: spacing[4],
  }}>
    Click me
  </button>
);
```

---

## 📁 File Structure

```
React-App/
├── .figmarc.json                    # Figma config
├── .env.example                     # Env template
├── scripts/
│   └── figma-export.js              # Export script
├── src/
│   ├── styles/
│   │   ├── designTokens.ts          # ⭐ Design tokens
│   │   └── systemUtils.ts           # ⭐ Utilities
│   ├── designs/
│   │   └── DESIGN_SYSTEM.md         # Documentation
│   └── components/                  # Use tokens here
└── README.md                        # Updated with Figma section
```

---

## 🎯 Key Commands

```bash
# Export designs from Figma
npm run design:export

# Sync designs and rebuild
npm run design:sync

# Development
npm run dev

# Production build
npm run build
```

---

## 💡 Usage Examples

### Use Colors
```typescript
import { colors } from '@/styles/designTokens';

const primaryColor = colors.primary;        // #3B82F6
const successColor = colors.success;        // #10B981
const errorColor = colors.error;            // #EF4444
```

### Use Spacing
```typescript
import { spacing } from '@/styles/designTokens';

const smallPadding = spacing[2];            // 8px
const largePadding = spacing[6];            // 24px
```

### Use Typography
```typescript
import { typography } from '@/styles/designTokens';

const headingStyle = typography.styles.h2;  // { fontSize: '32px', ... }
const bodySize = typography.fontSize.base;  // 16px
```

### Use Utilities
```typescript
import { media, getColor, truncateText } from '@/styles/systemUtils';

// Responsive
const responsiveStyle = `
  ${media.mobile} {
    font-size: 14px;
  }
  ${media.desktop} {
    font-size: 16px;
  }
`;

// Get color
const textColor = getColor('text');

// Truncate text
const truncated = truncateText(2);
```

---

## 🔄 Design Update Workflow

1. **Update in Figma**
   - Change colors, typography, components
   - Update component specs

2. **Export to Code**
   ```bash
   npm run design:export
   ```

3. **Use New Tokens**
   - Import from `designTokens.ts`
   - Use in React components

4. **Test & Verify**
   - Check responsive behavior
   - Compare with Figma design

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "Update design tokens from Figma"
   ```

---

## ✅ Best Practices

### Do's ✅
- Use `designTokens.ts` for ALL colors, spacing, typography
- Import tokens at component level
- Keep Figma file updated
- Use `media` queries for responsive design
- Export assets from Figma (SVG for icons)

### Don'ts ❌
- Don't hardcode colors (e.g., `#3B82F6`)
- Don't use arbitrary spacing values
- Don't ignore design tokens
- Don't create styles outside of tokens
- Don't forget to sync Figma changes

---

## 🔗 Important Links

- **Figma Design File**: https://www.figma.com/design/6NbxzZ2fb7s3krDliQv5qm/Weather-Dashboard--Community-?node-id=0-1
- **Design Tokens**: `src/styles/designTokens.ts`
- **System Utilities**: `src/styles/systemUtils.ts`
- **Design Guide**: `src/designs/DESIGN_SYSTEM.md`
- **Figma API**: https://www.figma.com/developers/api
- **Figma Dev Mode**: https://help.figma.com/en/articles/15023494-Dev-Mode

---

## 🤔 Common Issues

| Issue | Solution |
|-------|----------|
| `FIGMA_TOKEN` not found | Add to `.env.local` |
| Colors not updating | Run `npm run design:export` |
| Build fails | Check TypeScript errors in `designTokens.ts` |
| Styles not applying | Verify you're using correct token keys |

---

## 📞 Need Help?

1. Check Design System guide: `src/designs/DESIGN_SYSTEM.md`
2. View Figma file for specifications
3. Review usage examples in this guide
4. Check TypeScript types in `designTokens.ts`

---

**Status**: ✅ Fully Integrated  
**Last Updated**: November 27, 2025  
**Version**: 1.0.0
