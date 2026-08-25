import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatCurrency } from '../invoiceUtils';

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: 'Helvetica', color: '#111111' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 36 },
  title: { fontSize: 22, fontFamily: 'Helvetica-Bold', letterSpacing: 1 },
  meta: { fontSize: 9, color: '#666666', marginTop: 4 },
  partiesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  partyBlock: { maxWidth: 220 },
  label: { fontSize: 8, color: '#999999', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  partyName: { fontFamily: 'Helvetica-Bold', fontSize: 11, marginBottom: 2 },
  partyLine: { color: '#444444', lineHeight: 1.4 },
  table: { marginTop: 8 },
  tableHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#111111', paddingBottom: 6, marginBottom: 6 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#dddddd', paddingVertical: 8 },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colRate: { flex: 1.2, textAlign: 'right' },
  colAmount: { flex: 1.2, textAlign: 'right' },
  headerText: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: '#666666' },
  totalsBlock: { marginTop: 16, alignSelf: 'flex-end', width: 200 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#111111', paddingTop: 8, marginTop: 4 },
  grandTotalLabel: { fontFamily: 'Helvetica-Bold' },
  grandTotalValue: { fontFamily: 'Helvetica-Bold' },
  notes: { marginTop: 40, fontSize: 9, color: '#666666', lineHeight: 1.5 },
});

const MinimalTemplate: React.FC<{ data: InvoiceData }> = ({ data }) => {
  const { subtotal, taxAmount, total } = calculateTotals(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.meta}>#{data.invoiceNumber}</Text>
          </View>
          <View>
            <Text style={styles.meta}>Issued: {data.issueDate}</Text>
            <Text style={styles.meta}>Due: {data.dueDate}</Text>
          </View>
        </View>

        <View style={styles.partiesRow}>
          <View style={styles.partyBlock}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.partyName}>{data.fromName || 'Your Name'}</Text>
            <Text style={styles.partyLine}>{data.fromAddress}</Text>
            <Text style={styles.partyLine}>{data.fromEmail}</Text>
          </View>
          <View style={styles.partyBlock}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.partyName}>{data.billToName || 'Client Name'}</Text>
            <Text style={styles.partyLine}>{data.billToAddress}</Text>
            <Text style={styles.partyLine}>{data.billToEmail}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.colDesc, styles.headerText]}>Description</Text>
            <Text style={[styles.colQty, styles.headerText]}>Qty</Text>
            <Text style={[styles.colRate, styles.headerText]}>Rate</Text>
            <Text style={[styles.colAmount, styles.headerText]}>Amount</Text>
          </View>
          {data.items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.colDesc}>{item.description || 'Item description'}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colRate}>{formatCurrency(item.rate, data.currency)}</Text>
              <Text style={styles.colAmount}>{formatCurrency(item.quantity * item.rate, data.currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBlock}>
          <View style={styles.totalsRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(subtotal, data.currency)}</Text>
          </View>
          {data.taxRate > 0 && (
            <View style={styles.totalsRow}>
              <Text>Tax ({data.taxRate}%)</Text>
              <Text>{formatCurrency(taxAmount, data.currency)}</Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(total, data.currency)}</Text>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.notes}>
            <Text style={styles.label}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

export default MinimalTemplate;
