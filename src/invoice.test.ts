import { describe, expect, test } from "vitest";
import { inv } from "./invoice";

const notebook = { description: "Notebook", unitPrice: 4.5, quantity: 10 };
const pen = { description: "Pen", unitPrice: 1.2, quantity: 0 };
const sticker = { description: "Sticker", unitPrice: 0, quantity: 3 };
const backpack = { description: "Backpack", unitPrice: 79.9, quantity: 2 };
const mug = { description: "Mug", unitPrice: 12, quantity: 5 };

describe("invoice", () => {
  test("renders lines, discount, VAT and total", () => {
    const invoice = inv([notebook, pen, sticker, backpack], "EUR", 0.19, true);
    expect(invoice).toBe(
      [
        "Backpack: 2 x 79.90 = 159.80",
        "Notebook: 10 x 4.50 = 45.00",
        "Sticker: free",
        "Discount: -30.72",
        "Subtotal: 174.08",
        "VAT (19%): 33.08",
        "Total: 207.16 EUR",
        "",
      ].join("\n"),
    );
  });

  test("gives no discount up to 50", () => {
    const invoice = inv([notebook], "EUR", 0.19, true);
    expect(invoice).toBe(
      [
        "Notebook: 10 x 4.50 = 45.00",
        "Subtotal: 45.00",
        "VAT (19%): 8.55",
        "Total: 53.55 EUR",
        "",
      ].join("\n"),
    );
  });

  test("gives 5 % discount above 50", () => {
    const invoice = inv([mug], "EUR", 0.2, true);
    expect(invoice).toContain("Discount: -3.00");
    expect(invoice).toContain("Subtotal: 57.00");
  });

  test("ignores the discount when it is switched off", () => {
    const invoice = inv([mug], "EUR", 0.2, false);
    expect(invoice).not.toContain("Discount");
    expect(invoice).toContain("Total: 72.00 EUR");
  });

  test("sorts the lines by description", () => {
    const invoice = inv([notebook, backpack], "USD", 0.2, false);
    expect(invoice.indexOf("Backpack")).toBeLessThan(
      invoice.indexOf("Notebook"),
    );
  });
});
