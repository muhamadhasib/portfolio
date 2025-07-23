import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// SEO-optimized sitemap generator
router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://muhammadhasib.dev' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/profile.jpeg</image:loc>
      <image:title>Muhammad Hasib - AI & ML Engineer</image:title>
      <image:caption>Professional photo of Muhammad Hasib, AI & ML Engineer</image:caption>
    </image:image>
  </url>
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// SEO-optimized robots.txt
router.get('/robots.txt', async (req, res) => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://muhammadhasib.dev' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const robots = `User-agent: *
Allow: /

# Specific crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay for respectful crawling
Crawl-delay: 1`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
  } catch (error) {
    console.error('Robots.txt generation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Advanced Open Graph image generator endpoint
router.get('/og-image.png', async (req, res) => {
  try {
    // In a production environment, you would generate dynamic OG images
    // For now, redirect to a static image
    res.redirect('/profile.jpeg');
  } catch (error) {
    console.error('OG image generation error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Structured data endpoint for real-time updates
router.get('/structured-data.json', async (req, res) => {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://muhammadhasib.dev' 
      : `http://localhost:${process.env.PORT || 5000}`;
    
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${baseUrl}/#person`,
          "name": "Muhammad Hasib",
          "jobTitle": "AI & ML Engineer",
          "description": "Leading AI & ML Engineer specializing in neural networks, machine learning algorithms, and intelligent system architecture",
          "url": baseUrl,
          "image": `${baseUrl}/profile.jpeg`,
          "sameAs": [
            "https://github.com/muhamadhasib",
            "https://linkedin.com/in/muhammad-hasib",
            "https://twitter.com/hasib_me_"
          ],
          "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Neural Networks",
            "Deep Learning",
            "Computer Vision",
            "Natural Language Processing",
            "Python Programming",
            "TensorFlow",
            "PyTorch"
          ]
        },
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "url": baseUrl,
          "name": "Muhammad Hasib - AI Engineer Portfolio",
          "description": "Professional portfolio showcasing AI & ML engineering expertise, projects, and research",
          "publisher": {
            "@id": `${baseUrl}/#person`
          },
          "inLanguage": "en-US"
        },
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/#webpage`,
          "url": baseUrl,
          "name": "Muhammad Hasib | AI & ML Engineer - Building Tomorrow's Intelligent Systems",
          "description": "Leading AI & ML Engineer specializing in neural networks, machine learning algorithms, and intelligent system architecture",
          "isPartOf": {
            "@id": `${baseUrl}/#website`
          },
          "about": {
            "@id": `${baseUrl}/#person`
          },
          "inLanguage": "en-US"
        }
      ]
    };

    res.json(structuredData);
  } catch (error) {
    console.error('Structured data generation error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as seoRouter };