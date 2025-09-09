import * as cheerio from 'cheerio';
import postgres from 'postgres';

const BASE_URL = 'https://www.koningsspelen.nl';

// Database connection
const sql = postgres(process.env.DATABASE_URL || 'postgresql://localhost:5432/koningschat');

interface ScrapedContent {
  url: string;
  title: string;
  content: string;
}

async function scrapeUrl(url: string): Promise<ScrapedContent | null> {
  try {
    console.log(`Scraping: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove script, style, and navigation elements
    $('script, style, nav, header, footer, .menu, .navigation').remove();

    // Extract title
    const title = $('title').text().trim() || $('h1').first().text().trim();

    // Extract main content
    const contentSelectors = [
      'main',
      '.content',
      '.main-content', 
      'article',
      '.post-content',
      '.entry-content'
    ];

    let content = '';
    for (const selector of contentSelectors) {
      const element = $(selector);
      if (element.length > 0) {
        content = element.text().trim();
        break;
      }
    }

    // Fallback: get body content if no main content found
    if (!content) {
      content = $('body').text().trim();
    }

    // Clean up whitespace
    content = content.replace(/\s+/g, ' ').trim();

    if (!content || content.length < 50) {
      console.warn(`Insufficient content for ${url}`);
      return null;
    }

    return {
      url,
      title,
      content
    };

  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return null;
  }
}

async function findUrls(): Promise<string[]> {
  const urls = new Set<string>();
  
  try {
    // Start with homepage
    const response = await fetch(BASE_URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Find all internal links
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (!href) return;

      let fullUrl: string;
      if (href.startsWith('/')) {
        fullUrl = BASE_URL + href;
      } else if (href.startsWith(BASE_URL)) {
        fullUrl = href;
      } else {
        return; // Skip external links
      }

      // Clean URL (remove fragments and query params for deduplication)
      const cleanUrl = fullUrl.split('#')[0].split('?')[0];
      
      // Skip certain file types and admin pages
      if (cleanUrl.match(/\.(pdf|jpg|jpeg|png|gif|zip|doc|docx)$/i)) return;
      if (cleanUrl.includes('/admin') || cleanUrl.includes('/wp-')) return;

      urls.add(cleanUrl);
    });

    // Add homepage
    urls.add(BASE_URL);

  } catch (error) {
    console.error('Error finding URLs:', error);
  }

  return Array.from(urls);
}

async function saveContent(content: ScrapedContent): Promise<void> {
  try {
    await sql`
      INSERT INTO content (url, title, content)
      VALUES (${content.url}, ${content.title}, ${content.content})
      ON CONFLICT (url) 
      DO UPDATE SET 
        title = EXCLUDED.title,
        content = EXCLUDED.content,
        updated_at = CURRENT_TIMESTAMP
    `;
    console.log(`Saved: ${content.url}`);
  } catch (error) {
    console.error(`Error saving ${content.url}:`, error);
  }
}

async function main() {
  console.log('Starting Koningsspelen website scraper...');
  
  // Find all URLs
  const urls = await findUrls();
  console.log(`Found ${urls.length} URLs to scrape`);

  // Scrape each URL
  for (const url of urls) {
    const content = await scrapeUrl(url);
    if (content) {
      await saveContent(content);
    }
    
    // Be respectful - wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Scraping completed!');
  process.exit(0);
}

if (import.meta.main) {
  main().catch(console.error);
}
