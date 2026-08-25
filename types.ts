
export interface Project {
  slug: string;
  title: string;
  duration: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    features: string[];
    results?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  billToName: string;
  billToAddress: string;
  billToEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceLineItem[];
  taxRate: number;
  notes: string;
  currency: string;
}

export type InvoiceTemplateId = 'minimal' | 'modern' | 'classic';
