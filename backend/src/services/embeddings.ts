import { openaiService } from './openai';
import { db } from './database';

export class EmbeddingsService {
  
  // Split text into chunks for better embeddings
  private chunkText(text: string, maxChunkSize: number = 1000): string[] {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (currentChunk.length + trimmedSentence.length > maxChunkSize) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = trimmedSentence;
        }
      } else {
        currentChunk += (currentChunk ? '. ' : '') + trimmedSentence;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks.length > 0 ? chunks : [text];
  }

  async generateEmbeddingsForAllContent(): Promise<void> {
    console.log('🔄 Starting embeddings generation...');
    
    const content = await db.getAllContent();
    console.log(`Found ${content.length} content items to process`);
    
    for (const item of content) {
      console.log(`Processing: ${item.title}`);
      
      // Combine title and content for better context
      const fullText = `${item.title}\n\n${item.content}`;
      const chunks = this.chunkText(fullText);
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        console.log(`  Generating embedding for chunk ${i + 1}/${chunks.length}`);
        
        try {
          const embedding = await openaiService.generateEmbedding(chunk);
          await db.saveEmbedding(item.id, chunk, i, embedding);
          
          // Small delay to avoid rate limits
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error processing chunk ${i + 1} of ${item.title}:`, error);
        }
      }
    }
    
    console.log('✅ Embeddings generation completed!');
  }

  async searchSimilarContent(query: string, limit: number = 3): Promise<Array<{chunk_text: string, title: string, url: string, distance: number}>> {
    try {
      const queryEmbedding = await openaiService.generateEmbedding(query);
      return await db.searchSimilarContent(queryEmbedding, limit);
    } catch (error) {
      console.error('Error searching similar content:', error);
      return [];
    }
  }
}

export const embeddingsService = new EmbeddingsService();
