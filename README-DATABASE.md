# Database Setup Instructions

## MongoDB Setup

1. **Install MongoDB** (if not already installed)
   - Local: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas

2. **Set Environment Variables**
   
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

3. **Initialize Templates**
   
   Run the initialization script to seed templates:
   ```bash
   npx tsx scripts/init-templates.ts
   ```

## Database Collections

The application uses the following MongoDB collections:

- **templates** - Pre-built landing page templates
- **pages** - User-created landing pages
- **analytics** - Page analytics and events
- **leads** - Form submissions (premium feature)
- **users** - User accounts (simple, no auth for now)

## Indexes (Recommended)

Create indexes for better performance:

```javascript
// In MongoDB shell or Compass
db.pages.createIndex({ "pageId": 1 }, { unique: true });
db.pages.createIndex({ "userId": 1 });
db.pages.createIndex({ "slug": 1 });
db.analytics.createIndex({ "pageId": 1, "date": 1 });
db.templates.createIndex({ "templateId": 1 }, { unique: true });
```


