import { embeddingsService } from '../services/embeddings';
import { db } from '../services/database';
import 'dotenv/config';

async function main() {
  try {
    // Test database connection
    const dbConnected = await db.testConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed');
      process.exit(1);
    }

    // Generate embeddings for all content
    await embeddingsService.generateEmbeddingsForAllContent();
    
    // Show results
    const embeddingCount = await db.getEmbeddingCount();
    console.log(`\n🎉 Generated ${embeddingCount} embeddings successfully!`);
    
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
    process.exit(1);
  } finally {
    await db.close();
  }
}

main();
