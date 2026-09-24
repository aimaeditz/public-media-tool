import { useEffect } from 'react';

export interface SeoInput {
  title: string;
  description: string;
  path: string; // e.g. '/tools/password-generator'
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: object;
}

// Unused legacy GitHub Pages URL kept as a fallback constant
export const LEGACY_GITHUB_PAGES_URL = 'https://aimaeditz.github.io/public-media-tool';
// Active canonical domain URL
export const BASE_URL = 'https://publicmediatool.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function useSeo({ title, description, path, type = 'website', image, jsonLd }: SeoInput) {
  const jsonLdSerialized = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    // 1. Set document.title
    document.title = title;

    // Normalize path to ensure leading slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const fullCanonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
    const fullOgImage = image || DEFAULT_OG_IMAGE;

    // 2. Set/update <meta name="description">
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Set/update <link rel="canonical">
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // 4. Helper for OG tags
    const setMetaProperty = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaProperty('og:url', fullCanonicalUrl);
    setMetaProperty('og:type', type);
    setMetaProperty('og:site_name', 'Public Media Tool');
    setMetaProperty('og:image', fullOgImage);
    setMetaProperty('og:image:width', '1200');
    setMetaProperty('og:image:height', '630');
    setMetaProperty('og:image:alt', title);

    // 5. Helper for Twitter tags
    const setMetaName = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);
    setMetaName('twitter:image', fullOgImage);

    // 6. JSON-LD script management
    let scriptEl = document.getElementById('page-jsonld') as HTMLScriptElement | null;
    if (jsonLdSerialized) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        scriptEl.id = 'page-jsonld';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = jsonLdSerialized;
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [title, description, path, type, jsonLdSerialized]);
}
