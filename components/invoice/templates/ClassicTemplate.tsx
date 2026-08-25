import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceData } from '../../../types';
import { calculateTotals, formatCurrency } from '../invoiceUtils';

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, fontFamily: 'Times-Roman', color: '#1a1a1a' },
  headerCenter: { alignItems: 'center', marginBottom: 24, borderBottomWidth: 2, borderBottomColor: '#1a1a1a', paddingBottom: 16 },
  title: { fontSize: 20, fontFamily: 'Times-Bold', letterSpacing: 2 },
  meta: { fontSize: 9, color: '#444444', marginTop: 6 },
  partiesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  partyBlock: { maxWidth: 220 },
  label: { fontSize: 9, fontFamily: 'Times-Bold', textTransform: 'uppercase', marginBottom: 4 },
  partyName: { fontFamily: 'Times-Bold', fontSize: 11, marginBottom: 2 },
  partyLine: { color: '#444444', lineHeight: 1.4 },
  table: { marginTop: 8, borderWidth: 1, borderColor: '#1a1a1a' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#1a1a1a', paddingVertical: 7, paddingHorizontal: 8 },
  tableRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 8, borderTopWidth: 0.5, borderTopColor: '#cccccc' },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'right' },
  colRate: { flex: 1.2, textAlign: 'right' },
  colAmount: { flex: 1.2, textAlign: 'right' },
  headerText: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5, color: '#ffffff', fontFamily: 'Times-Bold' },
  totalsBlock: { marginTop: 16, alignSelf: 'flex-end', width: 200 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#1a1a1a', paddingTop: 8, marginTop: 4 },
  grandTotalLabel: { fontFamily: 'Times-Bold' },
  grandTotalValue: { fontFamily: 'Times-Bold' },
  notes: { marginTop: 40, fontSize: 9, color: '#444444', lineHeight: 1.5 },
  footer: { position: 'absolute', bottom: 32, left: 48, right: 48, textAlign: 'center', fontSize: 8, color: '#999999' },
});

const ClassicTemplate: React.FC<{ data: InvoiceData }> = ({ data }) => {
  const { subtotal, taxAmount, total } = calculateTotals(data);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.meta}>No. {data.invoiceNumber}  •  Issued {data.issueDate}  •  Due {data.dueDate}</Text>
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
            <Text style={styles.grandTotalLabel}>Total Due</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(total, data.currency)}</Text>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.notes}>
            <Text style={styles.label}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        ) : null}

        <Text style={styles.footer}>Thank you for your business.</Text>
      </Page>
    </Document>
  );
};

export default ClassicTemplate;
