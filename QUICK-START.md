# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- MongoDB driver
- Zustand (state management)
- React Color (color picker)
- UUID (ID generation)
- All other required packages

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=lomira
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=lomira
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Initialize Database with Templates

Run the template initialization script:

```bash
npx tsx scripts/init-templates.ts
```

This will create the database and seed it with initial templates (Product, Service, Clinic).

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access the Application

- **Home**: http://localhost:3000
- **Templates Gallery**: http://localhost:3000/templates
- **Editor** (new page): http://localhost:3000/editor/new?templateId=product-ad-v1

## Creating Your First Landing Page

1. Go to http://localhost:3000/templates
2. Click "Use Template" on any template
3. Edit content in the right sidebar
4. Customize theme (colors, fonts, language) in the right panel
5. Click "Save" to save your work
6. Click "Publish" to make it live
7. Your page will be available at: `http://localhost:3000/[your-slug]`

## Project Structure

- `/src/app/[slug]` - Published landing pages
- `/src/app/editor` - Page editor
- `/src/app/templates` - Template gallery
- `/src/modules/editor` - Editor components and logic
- `/src/modules/templates` - Template management
- `/src/modules/sections` - Section renderers
- `/src/modules/analytics` - Analytics tracking

## Troubleshooting

### MongoDB Connection Issues

- Make sure MongoDB is running: `mongod` or check MongoDB Atlas connection
- Verify `MONGODB_URI` in `.env.local`
- Check MongoDB logs for connection errors

### Templates Not Loading

- Run the initialization script: `npx tsx scripts/init-templates.ts`
- Check MongoDB connection
- Verify templates collection exists in database

### Editor Not Loading

- Check browser console for errors
- Verify all dependencies are installed: `npm install`
- Clear browser cache and reload

## Next Steps

See `IMPLEMENTATION-SUMMARY.md` for:
- Complete feature list
- Architecture details
- What's implemented vs. TODO
- Database schema

## Support

For issues or questions, check:
1. `IMPLEMENTATION-SUMMARY.md` - Complete implementation details
2. `README-DATABASE.md` - Database setup and schema
3. Code comments in source files


