/**
 * Script to initialize templates in MongoDB
 * Run with: npx tsx scripts/init-templates.ts
 */

import { MongoClient } from 'mongodb';
import { allTemplates } from '../src/modules/templates/data/templateData';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB_NAME || 'lomira';

async function initTemplates() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection('templates');

    // Clear existing templates (optional - comment out if you want to keep them)
    // await collection.deleteMany({});

    // Insert templates
    for (const template of allTemplates) {
      const existing = await collection.findOne({ templateId: template.templateId });
      
      if (existing) {
        console.log(`Template ${template.templateId} already exists, skipping...`);
      } else {
        await collection.insertOne(template);
        console.log(`Inserted template: ${template.templateId}`);
      }
    }

    console.log('Templates initialization completed!');
  } catch (error) {
    console.error('Error initializing templates:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

initTemplates();


