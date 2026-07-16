"use client";

import { useRef } from "react";
import { GST_RATES } from "@/lib/tools/gstCalculator";
import { calculateInvoiceTotals, lineItemAmount, type InvoiceLineItem } from "@/lib/tools/invoice";
import { formatInr } from "@/lib/tools/format";
import { useLocalStorageState } from "@/lib/tools/useLocalStorageState";
import { FormField } from "@/components/tools/FormField";

interface StoredInvoice {
  companyName: string;
  companyDetails: string;
  clientName: string;
  clientDetails: string;
  invoiceNumber: string;
  invoiceDate: string;
  gstPercent: number;
  items: InvoiceLineItem[];
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const DEFAULT_INVOICE: StoredInvoice = {
  companyName: "",
  companyDetails: "",
  clientName: "",
  clientDetails: "",
  invoiceNumber: "INV-001",
  invoiceDate: "",
  gstPercent: 18,
  items: [{ id: "item-1", description: "", quantity: 1, rate: 0 }],
};

export function InvoiceGeneratorClient() {
  const [invoice, setInvoice, hydrated] = useLocalStorageState<StoredInvoice>(
    "gx_tool_invoice_generator",
    DEFAULT_INVOICE
  );
  const nextItemId = useRef(2);

  if (!hydrated) {
    return (
      <div
        className="gx-result-card"
        aria-busy="true"
        aria-label="Loading tool"
        style={{ opacity: 0.5, animation: "gxPulse 1.4s ease-in-out infinite", maxWidth: 320 }}
      >
        <span className="gx-result-label">Loading…</span>
        <span className="gx-result-value" style={{ color: "var(--faint)" }}>
          —
        </span>
      </div>
    );
  }

  const displayDate = invoice.invoiceDate || todayIso();
  const totals = calculateInvoiceTotals(invoice.items, invoice.gstPercent);

  function updateItem(id: string, patch: Partial<InvoiceLineItem>) {
    setInvoice({
      ...invoice,
      items: invoice.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    });
  }

  function addItem() {
    const id = `item-${nextItemId.current}`;
    nextItemId.current += 1;
    setInvoice({ ...invoice, items: [...invoice.items, { id, description: "", quantity: 1, rate: 0 }] });
  }

  function removeItem(id: string) {
    if (invoice.items.length <= 1) return;
    setInvoice({ ...invoice, items: invoice.items.filter((item) => item.id !== id) });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div className="gx-print-hide" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <FormField label="Your Company Name" htmlFor="inv-company-name">
            <input
              id="inv-company-name"
              className="gx-tool-input"
              placeholder="GooglixLabs"
              value={invoice.companyName}
              onChange={(e) => setInvoice({ ...invoice, companyName: e.target.value })}
            />
          </FormField>
          <FormField label="Your Details" htmlFor="inv-company-details" hint="Address, phone, email — one per line">
            <textarea
              id="inv-company-details"
              rows={3}
              className="gx-tool-input"
              style={{ resize: "vertical", fontFamily: "var(--font-manrope), sans-serif" }}
              value={invoice.companyDetails}
              onChange={(e) => setInvoice({ ...invoice, companyDetails: e.target.value })}
            />
          </FormField>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <FormField label="Bill To" htmlFor="inv-client-name">
            <input
              id="inv-client-name"
              className="gx-tool-input"
              placeholder="Client name"
              value={invoice.clientName}
              onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
            />
          </FormField>
          <FormField label="Client Details" htmlFor="inv-client-details" hint="Address, phone, email — one per line">
            <textarea
              id="inv-client-details"
              rows={3}
              className="gx-tool-input"
              style={{ resize: "vertical", fontFamily: "var(--font-manrope), sans-serif" }}
              value={invoice.clientDetails}
              onChange={(e) => setInvoice({ ...invoice, clientDetails: e.target.value })}
            />
          </FormField>
        </div>

        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          <FormField label="Invoice Number" htmlFor="inv-number">
            <input
              id="inv-number"
              className="gx-tool-input"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
            />
          </FormField>
          <FormField label="Invoice Date" htmlFor="inv-date">
            <input
              id="inv-date"
              type="date"
              className="gx-tool-input"
              value={displayDate}
              onChange={(e) => setInvoice({ ...invoice, invoiceDate: e.target.value })}
            />
          </FormField>
          <fieldset style={{ border: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <legend className="gx-field-label" style={{ padding: 0, marginBottom: 2 }}>
              GST Rate
            </legend>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[0, ...GST_RATES].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className="gx-toggle-chip"
                  aria-pressed={invoice.gstPercent === rate}
                  onClick={() => setInvoice({ ...invoice, gstPercent: rate })}
                >
                  {rate === 0 ? "No GST" : `${rate}%`}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div>
          <span className="gx-field-label" style={{ display: "block", marginBottom: 12 }}>
            Items
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {invoice.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 90px 130px 32px",
                  gap: 10,
                  alignItems: "start",
                }}
              >
                <input
                  aria-label="Item description"
                  className="gx-tool-input"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
                <input
                  aria-label="Quantity"
                  type="number"
                  min={0}
                  className="gx-tool-input"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) || 0 })}
                />
                <input
                  aria-label="Rate"
                  type="number"
                  min={0}
                  className="gx-tool-input"
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, { rate: Number(e.target.value) || 0 })}
                />
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => removeItem(item.id)}
                  disabled={invoice.items.length <= 1}
                  style={{
                    width: 32,
                    height: 40,
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    background: "transparent",
                    color: invoice.items.length <= 1 ? "var(--faint)" : "var(--ink)",
                    cursor: invoice.items.length <= 1 ? "not-allowed" : "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-cursor
            className="gx-nav-cta"
            style={{ fontSize: 12, marginTop: 14 }}
            onClick={addItem}
          >
            + Add Item
          </button>
        </div>
      </div>

      <div
        className="gx-invoice-print"
        style={{
          background: "#fff",
          color: "#17181B",
          border: "1px solid var(--line)",
          borderRadius: 14,
          padding: "clamp(28px,4vw,52px)",
          maxWidth: 720,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 700, fontSize: 22, margin: "0 0 8px" }}>
              {invoice.companyName || "Your Company Name"}
            </p>
            <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, lineHeight: 1.6, color: "#555", margin: 0, whiteSpace: "pre-line" }}>
              {invoice.companyDetails || "Company address, phone, email"}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 22, letterSpacing: ".05em", margin: "0 0 10px" }}>
              INVOICE
            </p>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 12.5, color: "#555", margin: 0 }}>
              {invoice.invoiceNumber} · {displayDate}
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "#888", margin: "0 0 8px" }}>
            Bill To
          </p>
          <p style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, fontSize: 16, margin: "0 0 4px" }}>
            {invoice.clientName || "Client Name"}
          </p>
          <p style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 13, lineHeight: 1.6, color: "#555", margin: 0, whiteSpace: "pre-line" }}>
            {invoice.clientDetails}
          </p>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 28 }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #17181B" }}>
              <th style={{ textAlign: "left", padding: "8px 4px", fontFamily: "var(--font-mono), monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em" }}>
                Description
              </th>
              <th style={{ textAlign: "right", padding: "8px 4px", fontFamily: "var(--font-mono), monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em" }}>
                Qty
              </th>
              <th style={{ textAlign: "right", padding: "8px 4px", fontFamily: "var(--font-mono), monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em" }}>
                Rate
              </th>
              <th style={{ textAlign: "right", padding: "8px 4px", fontFamily: "var(--font-mono), monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".04em" }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #e4e2da" }}>
                <td style={{ padding: "10px 4px", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5 }}>
                  {item.description || "—"}
                </td>
                <td style={{ padding: "10px 4px", textAlign: "right", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5 }}>
                  {item.quantity}
                </td>
                <td style={{ padding: "10px 4px", textAlign: "right", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5 }}>
                  {formatInr(item.rate)}
                </td>
                <td style={{ padding: "10px 4px", textAlign: "right", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5 }}>
                  {formatInr(lineItemAmount(item))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: 220, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5, color: "#555" }}>
              <span>Subtotal</span>
              <span>{formatInr(totals.subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-manrope), sans-serif", fontSize: 13.5, color: "#555" }}>
              <span>GST ({invoice.gstPercent}%)</span>
              <span>{formatInr(totals.gstAmount)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-bricolage), sans-serif",
                fontWeight: 700,
                fontSize: 17,
                borderTop: "1.5px solid #17181B",
                paddingTop: 10,
                marginTop: 4,
              }}
            >
              <span>Total</span>
              <span>{formatInr(totals.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gx-print-hide" style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start" }}>
        <button
          type="button"
          data-cursor
          data-magnetic
          className="gx-nav-cta gx-tool-cta-btn"
          onClick={() => window.print()}
        >
          Download PDF
        </button>
        <span style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 12.5, color: "var(--faint)" }}>
          Opens your browser&apos;s print dialog — choose &quot;Save as PDF&quot; as the destination.
        </span>
      </div>
    </div>
  );
}
