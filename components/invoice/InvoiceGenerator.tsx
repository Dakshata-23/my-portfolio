import React, { useMemo, useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { InvoiceData, InvoiceTemplateId } from '../../types';
import { calculateTotals, createEmptyInvoice, emptyLineItem, formatCurrency } from './invoiceUtils';
import { INVOICE_TEMPLATES, TEMPLATE_OPTIONS } from './templates';

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR'];

const inputClass =
  'w-full bg-surface border border-accent rounded-lg px-3 py-2 text-sm text-textPrimary placeholder:text-textSecondary/50 outline-none focus:border-textSecondary/50 transition-colors';

const InvoiceGenerator: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(createEmptyInvoice());
  const [template, setTemplate] = useState<InvoiceTemplateId>('minimal');
  const [showPreview, setShowPreview] = useState(false);

  const { subtotal, taxAmount, total } = useMemo(() => calculateTotals(data), [data]);

  const isValid = useMemo(() => {
    return (
      data.fromName.trim().length > 0 &&
      data.billToName.trim().length > 0 &&
      data.items.some((item) => item.description.trim().length > 0 && item.quantity > 0)
    );
  }, [data]);

  const updateField = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const updateItem = (id: string, patch: Partial<InvoiceData['items'][number]>) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  };

  const addItem = () => {
    setData((prev) => ({ ...prev, items: [...prev.items, emptyLineItem(String(Date.now()))] }));
  };

  const removeItem = (id: string) => {
    setData((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }));
  };

  const TemplateComponent = INVOICE_TEMPLATES[template];

  return (
    <section id="invoice-generator" className="mb-24">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4 text-textPrimary tracking-tight">
          Free Invoice Generator
        </h2>
        <p className="text-textSecondary max-w-xl text-sm">
          Fill in your details, pick a template, and download a ready-to-send PDF invoice. Nothing is stored or sent anywhere — it's all generated right here in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <div className="lg:col-span-3 p-6 rounded-2xl glass border border-accent shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">From</p>
              <div className="space-y-2">
                <input className={inputClass} placeholder="Your name / business" value={data.fromName} onChange={(e) => updateField('fromName', e.target.value)} />
                <input className={inputClass} placeholder="Address" value={data.fromAddress} onChange={(e) => updateField('fromAddress', e.target.value)} />
                <input className={inputClass} placeholder="Email" value={data.fromEmail} onChange={(e) => updateField('fromEmail', e.target.value)} />
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Bill To</p>
              <div className="space-y-2">
                <input className={inputClass} placeholder="Client name / business" value={data.billToName} onChange={(e) => updateField('billToName', e.target.value)} />
                <input className={inputClass} placeholder="Address" value={data.billToAddress} onChange={(e) => updateField('billToAddress', e.target.value)} />
                <input className={inputClass} placeholder="Email" value={data.billToEmail} onChange={(e) => updateField('billToEmail', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Invoice #</p>
              <input className={inputClass} value={data.invoiceNumber} onChange={(e) => updateField('invoiceNumber', e.target.value)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Currency</p>
              <select className={inputClass} value={data.currency} onChange={(e) => updateField('currency', e.target.value)}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Issue Date</p>
              <input type="date" className={inputClass} value={data.issueDate} onChange={(e) => updateField('issueDate', e.target.value)} />
            </div>
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Due Date</p>
              <input type="date" className={inputClass} value={data.dueDate} onChange={(e) => updateField('dueDate', e.target.value)} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Line Items</p>
              <button onClick={addItem} className="text-xs font-medium text-textPrimary hover:text-blue-500 transition-colors">
                + Add Item
              </button>
            </div>
            <div className="space-y-2">
              {data.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <input
                    className={`${inputClass} flex-grow`}
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                  />
                  <input
                    type="number"
                    min={0}
                    className={`${inputClass} w-full sm:w-20`}
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                  />
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    className={`${inputClass} w-full sm:w-28`}
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) })}
                  />
                  <span className="text-sm text-textSecondary w-24 text-right hidden sm:block">
                    {formatCurrency(item.quantity * item.rate, data.currency)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    disabled={data.items.length === 1}
                    className="text-textSecondary hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors px-2"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-start">
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Tax Rate (%)</p>
              <input
                type="number"
                min={0}
                max={100}
                className={inputClass}
                value={data.taxRate}
                onChange={(e) => updateField('taxRate', Number(e.target.value))}
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">Notes</p>
              <input className={inputClass} placeholder="Payment terms, thank you note..." value={data.notes} onChange={(e) => updateField('notes', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Template picker + summary + download */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
            <p className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-3">Template</p>
            <div className="space-y-2">
              {TEMPLATE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setTemplate(opt.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${
                    template === opt.id
                      ? 'border-textPrimary bg-accent/40'
                      : 'border-accent hover:bg-accent/20'
                  }`}
                >
                  <span className="block text-sm font-medium text-textPrimary">{opt.name}</span>
                  <span className="block text-xs text-textSecondary mt-0.5">{opt.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass border border-accent shadow-sm">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-textSecondary">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal, data.currency)}</span>
              </div>
              {data.taxRate > 0 && (
                <div className="flex justify-between text-textSecondary">
                  <span>Tax ({data.taxRate}%)</span>
                  <span>{formatCurrency(taxAmount, data.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-textPrimary pt-2 border-t border-accent">
                <span>Total</span>
                <span>{formatCurrency(total, data.currency)}</span>
              </div>
            </div>

            {isValid ? (
              <PDFDownloadLink
                document={<TemplateComponent data={data} />}
                fileName={`${data.invoiceNumber || 'invoice'}.pdf`}
                className="block w-full text-center px-6 py-3 rounded-full bg-textPrimary text-background font-medium hover:scale-[1.02] transition-transform shadow-md"
              >
                {({ loading }) => (loading ? 'Preparing PDF…' : 'Download PDF')}
              </PDFDownloadLink>
            ) : (
              <button disabled className="block w-full text-center px-6 py-3 rounded-full bg-accent text-textSecondary font-medium cursor-not-allowed">
                Add sender, client & one item
              </button>
            )}

            <button
              onClick={() => setShowPreview((v) => !v)}
              className="mt-3 w-full text-center text-xs font-medium text-textSecondary hover:text-textPrimary transition-colors"
            >
              {showPreview ? 'Hide preview' : 'Show live preview'}
            </button>
          </div>

          {showPreview && (
            <div className="hidden md:block rounded-2xl overflow-hidden border border-accent shadow-sm h-[500px]">
              <PDFViewer width="100%" height="100%" showToolbar={false}>
                <TemplateComponent data={data} />
              </PDFViewer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InvoiceGenerator;
