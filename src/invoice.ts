export type InvoiceLine = {
  description: string;
  unitPrice: number;
  quantity: number;
};
const HIGH_DISCOUNT_THRESHOLD = 200;
const MEDIUM_DISCOUNT_THRESHOLD = 100;
const LOW_DISCOUNT_THRESHOLD = 50;

const HIGH_DISCOUNT_RATE = 0.15;
const MEDIUM_DISCOUNT_RATE = 0.1;
const LOW_DISCOUNT_RATE = 0.05;

function calculateDiscount(subtotal: number): number {
  if (subtotal > HIGH_DISCOUNT_THRESHOLD) {
    return HIGH_DISCOUNT_RATE;
  }
  if (subtotal > MEDIUM_DISCOUNT_THRESHOLD) {
    return MEDIUM_DISCOUNT_RATE;
  }
  if (subtotal > LOW_DISCOUNT_THRESHOLD) {
    return LOW_DISCOUNT_RATE;
  }
  return 0;
}

export function generateInvoice(
  invoiceLines: InvoiceLine[],
  currency: string,
  taxRate: number,
  applyDiscount: boolean,
): string {
  let invoiceText = "";
  let subtotal = 0;
  const sortedInvoiceLines = [...invoiceLines].sort((a, b) =>
    a.description.localeCompare(b.description),
  );
  for (let i = 0; i < sortedInvoiceLines.length; i++) {
    if (sortedInvoiceLines[i].quantity > 0) {
      if (sortedInvoiceLines[i].unitPrice > 0) {
        invoiceText +=
          sortedInvoiceLines[i].description +
          ": " +
          sortedInvoiceLines[i].quantity +
          " x " +
          sortedInvoiceLines[i].unitPrice.toFixed(2) +
          " = " +
          (
            sortedInvoiceLines[i].quantity * sortedInvoiceLines[i].unitPrice
          ).toFixed(2) +
          "\n";
        const lineTotal =
          sortedInvoiceLines[i].quantity * sortedInvoiceLines[i].unitPrice;
        subtotal += lineTotal;
      } else {
        invoiceText += sortedInvoiceLines[i].description + ": free\n";
      }
    }
  }
  if (applyDiscount) {
    const discountRate = calculateDiscount(subtotal);
    if (discountRate > 0) {
      const discountAmount = subtotal * discountRate;
      invoiceText += "Discount: -" + discountAmount.toFixed(2) + "\n";
      subtotal -= discountAmount;
    }
  }
  invoiceText += "Subtotal: " + subtotal.toFixed(2) + "\n";
  const formattedTaxRate = Number((taxRate * 100).toFixed(2));
  invoiceText +=
    "VAT (" +
    formattedTaxRate +
    "%): " +
    (subtotal * taxRate).toFixed(2) +
    "\n";
  invoiceText +=
    "Total: " +
    (subtotal + subtotal * taxRate).toFixed(2) +
    " " +
    currency +
    "\n";
  return invoiceText;
}
