export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceTotals {
  subtotal: number;
  gstAmount: number;
  total: number;
}

export function lineItemAmount(item: InvoiceLineItem): number {
  return Math.max(0, item.quantity) * Math.max(0, item.rate);
}

export function calculateInvoiceTotals(items: InvoiceLineItem[], gstPercent: number): InvoiceTotals {
  const subtotal = items.reduce((sum, item) => sum + lineItemAmount(item), 0);
  const gstAmount = (subtotal * Math.max(0, gstPercent)) / 100;
  return { subtotal, gstAmount, total: subtotal + gstAmount };
}
