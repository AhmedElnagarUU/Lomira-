<!-- 80a523ec-4660-4087-a91c-f4799731d903 cc78ae37-5999-419a-a840-0687784ed97f -->
# Custom Landing Page Builder Module

## Overview

Create a new custom landing page builder module (`custombuilder`) with React DnD drag-and-drop functionality. This will be a simple, user-friendly builder with React components that can be dragged from a toolbox onto a canvas.

## Module Structure

### 1. Module Foundation

**Location**: `src/modules/custombuilder/`

Create the following structure:

- `components/` - React components for the builder
  - `CustomBuilderEditor.tsx` - Main editor component
  - `CustomBuilderToolbox.tsx` - Sidebar with draggable components
  - `CustomBuilderCanvas.tsx` - Canvas area where components are dropped
  - `CustomBuilderSettings.tsx` - Settings panel for selected component
  - `CustomBuilderHeader.tsx` - Header with title and save button
  - `user/` - User-defined draggable components
    - `Text.tsx`, `Image.tsx`, `Button.tsx`, `Section.tsx`
    - `Hero.tsx`, `Features.tsx`, `Testimonials.tsx`, `Pricing.tsx`, `Form.tsx`, `Video.tsx`
    - Settings components for each (e.g., `TextSettings.tsx`)
- `types/index.ts` - TypeScript types for templates and components
- `data/customBuilderService.ts` - Service functions for fetching/saving templates
- `hooks/useCustomBuilder.ts` - Custom hook for editor state management

### 2. Component Blocks to Create

Each component in `user/` should:

- Be a React functional component
- Accept props for customization (text, styles, etc.)
- Be draggable using React DnD
- Have a corresponding settings component

**Components to implement:**

1. **Text** - Simple text/heading with editable content
2. **Image** - Image with URL input and alt text
3. **Button** - Button with text, link, and style options
4. **Section** - Container/section wrapper with background options
5. **Hero** - Hero section with title, subtitle, CTA button, background image
6. **Features** - Features grid (3-4 columns) with icons and descriptions
7. **Testimonials** - Testimonials carousel/section with quotes and author info
8. **Pricing** - Pricing table with multiple tiers
9. **Form** - Contact form with name, email, message fields
10. **Video** - Video embed component (YouTube/Vimeo)

### 3. React DnD Setup

**Dependencies to add:**

- `react-dnd` - Core library
- `react-dnd-html5-backend` - HTML5 backend for drag and drop

**Implementation:**

- Wrap editor with `DndProvider` using `HTML5Backend`
- Make toolbox items draggable using `useDrag`
- Make canvas droppable using `useDrop`
- Handle drop events to add components to canvas

### 4. Editor Architecture

**CustomBuilderEditor.tsx:**

- Main orchestrator component
- Manages page structure (array of components)
- Handles add/remove/reorder components
- Provides context for selected component
- Integrates toolbox, canvas, and settings panels

**State Management:**

- Page structure: Array of component instances with IDs and props
- Selected component: Currently selected component ID
- Component registry: Map of component types to React components

### 5. API Routes

**Location**: `src/app/api/custombuilder/route.ts`

- **GET**: Fetch saved template by `projectId`
- **POST**: Save template with components structure

**Storage**: `src/app/api/custombuilder/storage.ts`

- In-memory mock storage (Map-based, similar to Craft.js)
- Can be replaced with database later

### 6. Page Route

**Location**: `src/app/custombuilder/page.tsx`

- Render `CustomBuilderEditor` component
- Full-screen layout similar to other builders

### 7. Dashboard Integration

**Update**: `src/modules/dashboard/components/BuilderSelector.tsx`

- Add new builder option for "Custom Builder"
- Route: `/custombuilder`
- Description: "Simple drag-and-drop landing page builder"

## Implementation Details

### Component Data Structure

```typescript
interface ComponentInstance {
  id: string;
  type: 'text' | 'image' | 'button' | 'section' | 'hero' | 'features' | 'testimonials' | 'pricing' | 'form' | 'video';
  props: Record<string, any>;
  order: number;
}
```

### Template Structure

```typescript
interface CustomBuilderTemplate {
  projectId: string;
  title: string;
  components: ComponentInstance[];
  updatedAt: string;
}
```

### Drag and Drop Flow

1. User drags component from toolbox
2. Component is dropped on canvas
3. New component instance is created with unique ID
4. Component is added to page structure
5. Component is rendered on canvas
6. User can click to select and edit via settings panel

## Files to Create

1. `src/modules/custombuilder/types/index.ts`
2. `src/modules/custombuilder/data/customBuilderService.ts`
3. `src/modules/custombuilder/hooks/useCustomBuilder.ts`
4. `src/modules/custombuilder/components/CustomBuilderEditor.tsx`
5. `src/modules/custombuilder/components/CustomBuilderToolbox.tsx`
6. `src/modules/custombuilder/components/CustomBuilderCanvas.tsx`
7. `src/modules/custombuilder/components/CustomBuilderSettings.tsx`
8. `src/modules/custombuilder/components/CustomBuilderHeader.tsx`
9. `src/modules/custombuilder/components/user/Text.tsx`
10. `src/modules/custombuilder/components/user/TextSettings.tsx`
11. `src/modules/custombuilder/components/user/Image.tsx`
12. `src/modules/custombuilder/components/user/ImageSettings.tsx`
13. `src/modules/custombuilder/components/user/Button.tsx`
14. `src/modules/custombuilder/components/user/ButtonSettings.tsx`
15. `src/modules/custombuilder/components/user/Section.tsx`
16. `src/modules/custombuilder/components/user/SectionSettings.tsx`
17. `src/modules/custombuilder/components/user/Hero.tsx`
18. `src/modules/custombuilder/components/user/HeroSettings.tsx`
19. `src/modules/custombuilder/components/user/Features.tsx`
20. `src/modules/custombuilder/components/user/FeaturesSettings.tsx`
21. `src/modules/custombuilder/components/user/Testimonials.tsx`
22. `src/modules/custombuilder/components/user/TestimonialsSettings.tsx`
23. `src/modules/custombuilder/components/user/Pricing.tsx`
24. `src/modules/custombuilder/components/user/PricingSettings.tsx`
25. `src/modules/custombuilder/components/user/Form.tsx`
26. `src/modules/custombuilder/components/user/FormSettings.tsx`
27. `src/modules/custombuilder/components/user/Video.tsx`
28. `src/modules/custombuilder/components/user/VideoSettings.tsx`
29. `src/modules/custombuilder/components/user/index.ts`
30. `src/modules/custombuilder/components/index.ts`
31. `src/app/api/custombuilder/storage.ts`
32. `src/app/api/custombuilder/route.ts`
33. `src/app/custombuilder/page.tsx`

## Files to Modify

1. `package.json` - Add `react-dnd` and `react-dnd-html5-backend` dependencies
2. `src/modules/dashboard/components/BuilderSelector.tsx` - Add custom builder option

## Styling

- Use Tailwind CSS for styling
- Responsive design (mobile-friendly)
- Clean, modern UI matching existing builders
- Visual feedback for drag operations (opacity, cursor changes)

### To-dos

- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space
- [ ] Update dashboard types to reflect landing page builder context (rename sections, update interfaces)
- [ ] Update mock dashboard data with landing page builder metrics (pages, views, conversions, recent pages)
- [ ] Update DashboardLayout component to use new section IDs and render appropriate content
- [ ] Fix GrapesJS page wrapper to use h-screen instead of min-h-screen
- [ ] Fix GrapesEditor component height to properly fill viewport without blank space