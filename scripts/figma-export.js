#!/usr/bin/env node

/**
 * Figma Export Script
 * Exports design tokens and components from Figma
 * Usage: npm run design:export
 */

const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_ID = '6NbxzZ2fb7s3krDliQv5qm';
const OUTPUT_DIR = path.join(__dirname, '../src/designs');

if (!FIGMA_TOKEN) {
  console.error(
    '❌ Error: FIGMA_TOKEN environment variable is not set.\n' +
    'Please set your Figma personal access token:\n' +
    'export FIGMA_TOKEN=your_token_here\n' +
    'Get token from: https://www.figma.com/developers'
  );
  process.exit(1);
}

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetch design data from Figma API
 */
async function fetchFigmaDesign() {
  try {
    console.log('📥 Fetching design from Figma...');
    
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_ID}`,
      {
        method: 'GET',
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch Figma design:', error.message);
    process.exit(1);
  }
}

/**
 * Export design components
 */
async function exportComponents(figmaData) {
  console.log('📦 Exporting components...');
  
  const components = {};
  
  // Extract components from Figma document
  if (figmaData.components) {
    Object.entries(figmaData.components).forEach(([key, component]) => {
      components[component.name] = {
        id: component.id,
        name: component.name,
        description: component.description || '',
      };
    });
  }

  const componentsFile = path.join(OUTPUT_DIR, 'components.json');
  fs.writeFileSync(
    componentsFile,
    JSON.stringify(components, null, 2)
  );
  
  console.log(`✅ Components exported to: ${componentsFile}`);
}

/**
 * Export color styles
 */
async function exportColors(figmaData) {
  console.log('🎨 Exporting colors...');
  
  const colors = {};
  
  // Extract color styles from Figma
  if (figmaData.styles) {
    Object.entries(figmaData.styles).forEach(([key, style]) => {
      if (style.styleType === 'FILL') {
        colors[style.name] = {
          name: style.name,
          id: style.id,
          // Color extraction would need additional API call
        };
      }
    });
  }

  const colorsFile = path.join(OUTPUT_DIR, 'colors.json');
  fs.writeFileSync(
    colorsFile,
    JSON.stringify(colors, null, 2)
  );
  
  console.log(`✅ Colors exported to: ${colorsFile}`);
}

/**
 * Generate design documentation
 */
function generateDocumentation() {
  console.log('📝 Generating documentation...');
  
  const docContent = `# Design System Documentation

## 📊 Design Tokens
All design tokens are defined in \`src/styles/designTokens.ts\`

### Colors
- Primary: #3B82F6
- Secondary: #10B981
- Status: Success, Warning, Error, Info
- Neutral: Background, Surface, Border, Text variants

### Typography
- Roboto font family
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
- Weights: light, normal, medium, semibold, bold
- Line heights: tight, normal, relaxed, loose

### Spacing Scale
- 0px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

### Breakpoints
- xs: 320px (Mobile)
- sm: 375px (Mobile iPhone)
- md: 768px (Tablet)
- lg: 1024px (Desktop)
- xl: 1280px (Large Desktop)
- 2xl: 1536px (Extra Large)

## 🎨 Figma Components
View components in Figma: https://www.figma.com/design/6NbxzZ2fb7s3krDliQv5qm/Weather-Dashboard

### Available Components
- Button (sm, md, lg sizes)
- Input Field
- Card
- Weather Widget
- Header
- Navigation

## 📱 Responsive Design
- Mobile First approach
- Auto-layout in components
- Flexible spacing using tokens

## 🌙 Dark Mode
- Dark mode colors defined in \`designTokens.ts\`
- Switch theme using Zustand store

## 🔄 Workflow
1. Update design in Figma
2. Run \`npm run design:export\` to sync tokens
3. Use tokens in components
4. Build and deploy

## 📚 Resources
- Figma File: https://www.figma.com/design/6NbxzZ2fb7s3krDliQv5qm/Weather-Dashboard
- Design Tokens: src/styles/designTokens.ts
- Components: src/components/

## 👨‍💻 For Developers
1. Always use design tokens from \`designTokens.ts\`
2. Never hardcode colors, spacing, or typography
3. Reference Figma for component specs
4. Keep code and design in sync

---
Last Updated: 2025-11-27
`;

  const docFile = path.join(OUTPUT_DIR, 'DESIGN_SYSTEM.md');
  fs.writeFileSync(docFile, docContent);
  
  console.log(`✅ Documentation generated: ${docFile}`);
}

/**
 * Main export function
 */
async function main() {
  console.log('🎨 Starting Figma Design Export...\n');
  
  try {
    const figmaData = await fetchFigmaDesign();
    
    await exportComponents(figmaData);
    await exportColors(figmaData);
    generateDocumentation();
    
    console.log('\n✅ Design export completed successfully!');
    console.log(`📂 Output directory: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error('\n❌ Export failed:', error);
    process.exit(1);
  }
}

// Run the export
main();
