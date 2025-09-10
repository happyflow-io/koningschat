import { embeddingsService } from '../services/embeddings';
import { db } from '../services/database';
import 'dotenv/config';

async function testSearch() {
  try {
    console.log('Testing vector search...');
    
    const queries = [
      'Koningsspelen 2026 datum',
      'Wanneer zijn de Koningsspelen?',
      '17 april 2026'
    ];
    
    for (const query of queries) {
      console.log(`\n🔍 Query: "${query}"`);
      const results = await embeddingsService.searchSimilarContent(query, 3);
      
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title} (distance: ${result.distance})`);
        console.log(`   ${result.chunk_text.substring(0, 100)}...`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await db.close();
  }
}

testSearch();
