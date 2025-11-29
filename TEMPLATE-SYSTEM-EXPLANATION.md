# Template System Explanation

## Overview

The template system is the core of the landing page builder. It allows users to start with pre-designed, professional templates and customize them easily.

---

## How the Template System Works

### 1. Template Storage

**Location:** `src/modules/templates/data/`

Templates are stored in two files:
- `templateData.ts` - Legacy templates (can be removed later)
- `professionalTemplates.ts` - **Main professional templates** (5 templates)

**Database:** Templates are also stored in MongoDB collection `templates`

### 2. Template Structure

Each template follows this structure:

```typescript
{
  templateId: string,           // Unique ID: "ecommerce-product-launch-v1"
  name: { en: string, ar: string },
  category: 'product' | 'real-estate' | 'clinic' | 'restaurant' | 'service' | 'general',
  thumbnail: string,            // Preview image URL
  structure: {
    sections: Section[]         // Array of page sections
  },
  defaultTheme: {
    language: 'en' | 'ar',
    colors: { primary, secondary, background, text, accent },
    fonts: { heading, body }
  },
  tags: string[],
  isPremium: boolean
}
```

### 3. Section Structure

Each section in a template:

```typescript
{
  id: string,                   // Unique section ID: "hero-001"
  type: 'hero' | 'features' | 'testimonials' | 'pricing' | 'stats' | 'cta',
  order: number,                // Display order
  config: {
    backgroundColor?: string,
    padding?: { top, bottom, left, right }
  },
  content: {
    en: { ... },                // English content
    ar: { ... }                 // Arabic content
  }
}
```

### 4. How Templates Are Used

**Flow:**
1. User browses templates at `/templates`
2. Clicks "Use Template" → goes to `/editor/new?templateId=xxx`
3. Editor loads template from database via `/api/templates/[templateId]`
4. User edits content, colors, fonts in editor
5. Saves page → creates page in database
6. Publishes → creates public route at `/[slug]`

---

## API Routes

### Active Routes (KEEP)

#### `/api/templates` ✅
- **GET** - Lists all templates (metadata only)
- Used by: Template gallery
- Returns: Template list with thumbnails, names, categories

#### `/api/templates/[templateId]` ✅
- **GET** - Gets full template structure
- Used by: Editor when loading template
- Returns: Complete template with all sections and content

#### `/api/pages` ✅
- **GET** - Lists user's pages (with userId query)
- **POST** - Creates new page from template
- Used by: Dashboard, editor

#### `/api/pages/[pageId]` ✅
- **GET** - Gets page data for editing
- **PUT** - Updates page
- **DELETE** - Deletes page

#### `/api/pages/[pageId]/publish` ✅
- **POST** - Publishes page (creates public route)

#### `/api/analytics/[pageId]` ✅
- **GET** - Gets analytics for a page

#### `/api/analytics/track` ✅
- **POST** - Tracks events (visits, clicks, conversions)

#### `/api/dashboard` ✅
- **GET** - Gets dashboard data (navigation, user pages)

---

### Unused/Old Routes (REMOVE)

#### `/api/craftjs` ❌
- **Status:** Old builder (Craft.js)
- **Reason:** Not used in new unified system
- **Action:** DELETE

#### `/api/grapesjs` ❌
- **Status:** Old builder (GrapesJS)
- **Reason:** Not used in new unified system
- **Action:** DELETE

#### `/api/unlayer` ❌
- **Status:** Old builder (Unlayer)
- **Reason:** Not used in new unified system
- **Action:** DELETE

#### `/api/custombuilder` ❌
- **Status:** Old builder (Custom Builder)
- **Reason:** Replaced by new unified editor
- **Action:** DELETE

#### `/api/ready-templates` ❌
- **Status:** References non-existent module (`@/modules/readyTemplate`)
- **Reason:** Module doesn't exist, replaced by `/api/templates`
- **Action:** DELETE

---

## Template Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    TEMPLATE SYSTEM                       │
└─────────────────────────────────────────────────────────┘

1. TEMPLATE STORAGE
   ├─ professionalTemplates.ts (Source code)
   ├─ templateData.ts (Legacy)
   └─ MongoDB 'templates' collection (Database)

2. API LAYER
   ├─ GET /api/templates → Lists all templates
   └─ GET /api/templates/[id] → Gets template details

3. FRONTEND
   ├─ TemplateGrid → Shows template gallery
   └─ TemplatePreview → Template card component

4. EDITOR FLOW
   ├─ User selects template
   ├─ Loads template via API
   ├─ Editor stores in Zustand state
   ├─ User edits content/theme
   └─ Saves as page to database

5. PUBLISHED PAGE
   ├─ Page stored in MongoDB
   ├─ Published route: /[slug]
   └─ Renders sections with theme applied
```

---

## Section Types Available

1. **Hero** - Large introductory section with image and CTA
2. **Features** - Grid of features/benefits
3. **Testimonials** - Customer reviews with ratings
4. **Pricing** - Pricing tables (for SaaS/products)
5. **Stats** - Numbers/metrics display
6. **CTA** - Call-to-action section

---

## Bilingual Support

Every template includes:
- ✅ Complete English content
- ✅ Complete Arabic content  
- ✅ RTL/LTR layout switching
- ✅ Arabic font support (Cairo, Tajawal, IBM Plex Arabic, Almarai)

When user switches language in editor:
- All text switches to that language
- Layout direction changes (RTL for Arabic)
- Fonts update (Arabic fonts for Arabic, English fonts for English)

---

## Template Customization

Users can edit:
- **Text Content** - All headings, descriptions, button text
- **Colors** - Primary, secondary, background, text, accent
- **Fonts** - Heading font, body font
- **Language** - Switch between Arabic/English
- **Sections** - Add, remove, reorder sections

---

## Current Templates

1. **E-commerce Product Launch** - For products/sales
2. **SaaS Landing Page** - For software/services
3. **Restaurant** - For restaurants/cafes
4. **Medical Clinic** - For healthcare
5. **Real Estate** - For property/real estate

Each template is:
- Fully bilingual (Arabic/English)
- Professional design
- Conversion-optimized
- Easy to customize

---

## Key Files

- `src/modules/templates/data/professionalTemplates.ts` - Template definitions
- `src/modules/templates/data/templateService.ts` - Database operations
- `src/modules/templates/components/TemplateGrid.tsx` - Gallery UI
- `src/modules/templates/components/TemplatePreview.tsx` - Template card
- `src/app/api/templates/route.ts` - Template API
- `src/modules/sections/` - Section renderers
- `src/modules/editor/` - Editor system

---

## Summary

The template system provides:
1. **Ready-to-use templates** stored in code and database
2. **API endpoints** to fetch templates
3. **Editor integration** to load and customize templates
4. **Bilingual support** for Arabic and English
5. **Professional designs** optimized for conversions

All old builder APIs (CraftJS, GrapesJS, Unlayer, Custom Builder) are no longer needed and can be removed.

