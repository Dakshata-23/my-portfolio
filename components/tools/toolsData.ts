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
    slug: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Paste a token, see the decoded header & payload instantly, entirely client-side.',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    status: 'live',
  },
  {
    slug: 'cron-parser',
    name: 'Cron Expression Parser',
    description: 'Paste a cron expression, get a plain-English description and the next few run times.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    status: 'coming-soon',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Paste JSON, get it pretty-printed and validated with clear error messages.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 8l-4 4 4 4',
    status: 'coming-soon',
  },
];
