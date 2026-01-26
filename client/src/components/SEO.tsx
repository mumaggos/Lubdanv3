import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
}

export function SEO({ title, description, url, image = 'https://lubdan.com/images/lubdan-og-image.png', type = 'website' }: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    }
    
    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:type', type);
    
    // Update Twitter Card tags
    updateMetaTag('property', 'twitter:title', title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:url', url);
    updateMetaTag('property', 'twitter:image', image);
  }, [title, description, url, image, type]);

  return null;
}

function updateMetaTag(attribute: string, name: string, content: string) {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
