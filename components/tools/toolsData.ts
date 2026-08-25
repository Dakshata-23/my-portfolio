export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  icon: string; // heroicons-style path
  status: 'live' | 'coming-soon';
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Fill in your details, pick a template, and download a ready-to-send PDF invoice. Nothing is stored or sent anywhere.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    status: 'live',
  },
  {
    slug: 'url-shortener',
    name: 'URL Shortener',
    description: 'Paste a long link, get a short one back.',
    icon: 'M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5',
    status: 'coming-soon',
  },
  {
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Paste a token, see the decoded header & payload instantly, entirely client-side.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    status: 'coming-soon',
  },
  {
    slug: 'uptime-checker',
    name: 'Uptime Checker',
    description: 'Enter a URL and check whether it is up right now.',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    status: 'coming-soon',
  },
];
