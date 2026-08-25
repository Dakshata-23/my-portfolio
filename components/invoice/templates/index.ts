import { FC } from 'react';
import { InvoiceData, InvoiceTemplateId } from '../../../types';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';

export const INVOICE_TEMPLATES: Record<InvoiceTemplateId, FC<{ data: InvoiceData }>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
};

export const TEMPLATE_OPTIONS: { id: InvoiceTemplateId; name: string; description: string }[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean black & white, plenty of whitespace' },
  { id: 'modern', name: 'Modern', description: 'Indigo header block with soft rounded panels' },
  { id: 'classic', name: 'Classic', description: 'Traditional serif layout with bordered table' },
];
