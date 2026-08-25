import { InvoiceData } from '../../types';

export const calculateTotals = (data: InvoiceData) => {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const taxAmount = subtotal * (data.taxRate / 100);
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
};

export const formatCurrency = (value: number, currency: string) => {
  const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', INR: '₹' };
  const symbol = symbols[currency] || currency + ' ';
  return `${symbol}${value.toFixed(2)}`;
};

export const emptyLineItem = (id: string) => ({
  id,
  description: '',
  quantity: 1,
  rate: 0,
});

// Deliberately static (no Date.now()/Math.random()) — this form is prerendered as a
// static page, and a non-deterministic default would mismatch on hydration (React #418)
// since the prerendered snapshot and the visitor's client render would compute different values.
export const createEmptyInvoice = (): InvoiceData => ({
  fromName: '',
  fromAddress: '',
  fromEmail: '',
  billToName: '',
  billToAddress: '',
  billToEmail: '',
  invoiceNumber: '',
  issueDate: '',
  dueDate: '',
  items: [emptyLineItem('1')],
  taxRate: 0,
  notes: '',
  currency: 'USD',
});
