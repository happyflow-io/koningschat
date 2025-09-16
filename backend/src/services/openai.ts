import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: text,
      });
      
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  async generateChatResponseStream(question: string, context: string = ''): Promise<AsyncIterable<string>> {
    try {
      const systemPrompt = `Je bent een behulpzame assistent voor de Koningsspelen website. 
Je beantwoordt alleen vragen over de Koningsspelen in het Nederlands.

Als je relevante informatie hebt gekregen in de context, gebruik die om een accuraat antwoord te geven.
Geef altijd de voorkeur aan informatie uit de context boven je algemene kennis.
Als de vraag niet over de Koningsspelen gaat, zeg dan vriendelijk dat je alleen vragen over de Koningsspelen kunt beantwoorden.

Houd je antwoorden kort en informatief.`;

      const userPrompt = context 
        ? `Context informatie van de Koningsspelen website:
${context}

Vraag: ${question}

Beantwoord de vraag op basis van de context informatie hierboven.`
        : `Vraag: ${question}`;

      const stream = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 500,
        stream: true,
      });

      return (async function* () {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            yield content;
          }
        }
      })();
    } catch (error) {
      console.error('Error generating streaming chat response:', error);
      throw error;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      await openai.models.list();
      console.log('✅ OpenAI connection successful');
      return true;
    } catch (error) {
      console.error('❌ OpenAI connection failed:', error);
      return false;
    }
  }
}

export const openaiService = new OpenAIService();
