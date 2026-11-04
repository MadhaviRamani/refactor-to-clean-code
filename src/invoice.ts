export type InvoiceLine = {
  description: string;
  unitPrice: number;
  quantity: number;
};

export function inv(
  l: InvoiceLine[],
  c: string,
  t: number,
  d: boolean,
): string {
  let r = "";
  let s = 0;
  l.sort((a, b) => a.description.localeCompare(b.description));
  for (let i = 0; i < l.length; i++) {
    if (l[i].quantity > 0) {
      if (l[i].unitPrice > 0) {
        r =
          r +
          l[i].description +
          ": " +
          l[i].quantity +
          " x " +
          l[i].unitPrice.toFixed(2) +
          " = " +
          (l[i].quantity * l[i].unitPrice).toFixed(2) +
          "\n";
        s = s + l[i].quantity * l[i].unitPrice;
      } else {
        r = r + l[i].description + ": free\n";
      }
    }
  }
  if (d) {
    if (s > 200) {
      r = r + "Discount: -" + (s * 0.15).toFixed(2) + "\n";
      s = s - s * 0.15;
    } else {
      if (s > 100) {
        r = r + "Discount: -" + (s * 0.1).toFixed(2) + "\n";
        s = s - s * 0.1;
      } else {
        if (s > 50) {
          r = r + "Discount: -" + (s * 0.05).toFixed(2) + "\n";
          s = s - s * 0.05;
        }
      }
    }
  }
  r = r + "Subtotal: " + s.toFixed(2) + "\n";
  r = r + "VAT (" + t * 100 + "%): " + (s * t).toFixed(2) + "\n";
  r = r + "Total: " + (s + s * t).toFixed(2) + " " + c + "\n";
  return r;
}
