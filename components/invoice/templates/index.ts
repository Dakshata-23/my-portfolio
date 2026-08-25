import { FC } from 'react';
import { InvoiceData, InvoiceTemplateId } from '../../../types';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import minimalPreview from '../../../assets/invoice-templates/minimal.png';
import modernPreview from '../../../assets/invoice-templates/modern.png';
import classicPreview from '../../../assets/invoice-templates/classic.png';

export const INVOICE_TEMPLATES: Record<InvoiceTemplateId, FC<{ data: InvoiceData }>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  classic: ClassicTemplate,
};

export const TEMPLATE_OPTIONS: { id: InvoiceTemplateId; name: string; description: string; preview: string }[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean black & white, plenty of whitespace', preview: minimalPreview },
  { id: 'modern', name: 'Modern', description: 'Indigo header block with soft rounded panels', preview: modernPreview },
  { id: 'classic', name: 'Classic', description: 'Traditional serif layout with bordered table', preview: classicPreview },
];
