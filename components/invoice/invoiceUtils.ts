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

export const createEmptyInvoice = (): InvoiceData => {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 14);
  const fmt = (d: Date) => d.toISOString().split('T')[0];

  return {
    fromName: '',
    fromAddress: '',
    fromEmail: '',
    billToName: '',
    billToAddress: '',
    billToEmail: '',
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    issueDate: fmt(today),
    dueDate: fmt(due),
    items: [emptyLineItem('1')],
    taxRate: 0,
    notes: '',
    currency: 'USD',
  };
};
