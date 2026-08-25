import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatCurrency } from '../invoiceUtils';

const ACCENT = '#4f46e5';

const styles = StyleSheet.create({
  page: { fontSize: 10, fontFamily: 'Helvetica', color: '#1f1f28' },
  header: { backgroundColor: ACCENT, color: '#ffffff', padding: 40, flexDirection: 'row', justifyContent: 'space-between' },
  title: { fontSize: 24, fontFamily: 'Helvetica-Bold' },
  headerMeta: { fontSize: 9, marginTop: 4, color: '#e0e0fb' },
  headerRight: { alignItems: 'flex-end' },
  body: { padding: 40 },
  partiesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  partyBlock: { maxWidth: 220 },
  label: { fontSize: 8, color: ACCENT, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, fontFamily: 'Helvetica-Bold' },
  partyName: { fontFamily: 'Helvetica-Bold', fontSize: 11, marginBottom: 2 },
  partyLine: { color: '#555555', lineHeight: 1.4 },
  table: { marginTop: 8, borderRadius: 6, overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f3f2ff', paddingVertical: 8, paddingHorizontal: 10 },
  tableRow: { flexDirection: 'row', paddingVertical: 9, paddingHorizontal: 10, borderBottomWidth: 0.5, borderBottomColor: '#eeeeee' },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colRate: { flex: 1.2, textAlign: 'right' },
  colAmount: { flex: 1.2, textAlign: 'right' },
  headerText: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: ACCENT, fontFamily: 'Helvetica-Bold' },
  totalsBlock: { marginTop: 20, alignSelf: 'flex-end', width: 220, backgroundColor: '#f8f8fc', padding: 14, borderRadius: 6 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#dddddd', paddingTop: 8, marginTop: 4 },
  grandTotalLabel: { fontFamily: 'Helvetica-Bold', color: ACCENT },
  grandTotalValue: { fontFamily: 'Helvetica-Bold', color: ACCENT, fontSize: 12 },
  notes: { marginTop: 36, fontSize: 9, color: '#666666', lineHeight: 1.5 },
});

const ModernTemplate: React.FC<{ data: InvoiceData }> = ({ data }) => {
  const { subtotal, taxAmount, total } = calculateTotals(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Invoice</Text>
            <Text style={styles.headerMeta}>#{data.invoiceNumber}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerMeta}>Issued: {data.issueDate}</Text>
            <Text style={styles.headerMeta}>Due: {data.dueDate}</Text>
          </View>
        </View>

        <View style={styles.body}>
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
        </View>
      </Page>
    </Document>
  );
};

export default ModernTemplate;
