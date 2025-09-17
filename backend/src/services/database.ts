import postgres from 'postgres';
import 'dotenv/config';

// Database connection
const sql = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/koningschat');

export interface ContentRow {
  id: number;
  url: string;
  title: string;
  content: string;
  content_type: string;
  scraped_at: Date;
  updated_at: Date;
}

export interface EmbeddingRow {
  id: number;
  content_id: number;
  chunk_text: string;
  chunk_index: number;
  embedding: number[];
  created_at: Date;
}

export class DatabaseService {
  
  async testConnection(): Promise<boolean> {
    try {
      await sql`SELECT 1`;
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      return false;
    }
  }

  async getContentCount(): Promise<number> {
    const result = await sql`SELECT COUNT(*) as count FROM content`;
    return parseInt(result[0].count);
  }

  async getEmbeddingCount(): Promise<number> {
    const result = await sql`SELECT COUNT(*) as count FROM embeddings`;
    return parseInt(result[0].count);
  }

  async getAllContent(): Promise<ContentRow[]> {
    return await sql<ContentRow[]>`
      SELECT * FROM content 
      ORDER BY scraped_at DESC
    `;
  }

  async searchSimilarContent(embedding: number[], limit: number = 5): Promise<Array<EmbeddingRow & {title: string, url: string}>> {
    return await sql`
      SELECT 
        e.*,
        c.title,
        c.url,
        (e.embedding <=> ${JSON.stringify(embedding)}::vector) as distance
      FROM embeddings e
      JOIN content c ON e.content_id = c.id
      ORDER BY e.embedding <=> ${JSON.stringify(embedding)}::vector
      LIMIT ${limit}
    `;
  }

  async saveContent(url: string, title: string, content: string): Promise<number> {
    const result = await sql`
      INSERT INTO content (url, title, content)
      VALUES (${url}, ${title}, ${content})
      ON CONFLICT (url) 
      DO UPDATE SET 
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id
    `;
    return result[0].id;
  }

  async saveEmbedding(contentId: number, chunkText: string, chunkIndex: number, embedding: number[]): Promise<void> {
    await sql`
      INSERT INTO embeddings (content_id, chunk_text, chunk_index, embedding)
      VALUES (${contentId}, ${chunkText}, ${chunkIndex}, ${JSON.stringify(embedding)}::vector)
    `;
  }

  async getAllEmbeddings(limit: number = 50): Promise<any[]> {
    const result = await sql`
      SELECT 
        e.id,
        e.chunk_text,
        e.chunk_index,
        c.title,
        c.url,
        LENGTH(e.chunk_text) as chunk_length
      FROM embeddings e
      JOIN content c ON e.content_id = c.id
      ORDER BY c.id, e.chunk_index
      LIMIT ${limit}
    `;
    return result;
  }

  async close(): Promise<void> {
    await sql.end();
  }
}

export const db = new DatabaseService();
