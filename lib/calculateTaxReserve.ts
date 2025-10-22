// calculateTaxReserve.ts
// Helper für Steuer- und Rücklagenberechnung
// Deutsche Kommentare wie in docs/spec.md gefordert

export type TaxMode = 'kleinunternehmer' | 'regelbesteuerung';

export interface TaxReserveResult {
  incomeTax: number; // geschätzte Einkommensteuer (Betrag in der gleichen Währung wie income)
  vat: number; // Umsatzsteuer (falls regelbesteuerung), sonst 0
  reserve: number; // empfohlene Rücklage = incomeTax + vat
}

/**
 * Berechnet Einkommensteuer, Umsatzsteuer (falls relevant) und die empfohlene Rücklage.
 * @param income - Bruttoeinnahmen (z.B. für einen Monat)
 * @param incomeTaxRate - Einkommensteuerquote als Dezimalzahl (z.B. 0.25 für 25%)
 * @param taxMode - 'kleinunternehmer' oder 'regelbesteuerung'
 * @returns {TaxReserveResult}
 */
export default function calculateTaxReserve(
  income: number,
  incomeTaxRate: number,
  taxMode: TaxMode
): TaxReserveResult {
  // Eingabe-Validierung (einfach)
  const validIncome = Math.max(0, Number(income) || 0);
  const validRate = Math.max(0, Number(incomeTaxRate) || 0);

  // Einkommensteuer (einfache Schätzung)
  const incomeTax = validIncome * validRate;

  // Umsatzsteuer: Standard 19% bei Regelbesteuerung, 0 bei Kleinunternehmer
  const VAT_RATE = 0.19;
  const vat = taxMode === 'regelbesteuerung' ? validIncome * VAT_RATE : 0;

  // Empfohlene Rücklage = Einkommensteuer + Umsatzsteuer (falls relevant)
  const reserve = incomeTax + vat;

  return {
    incomeTax,
    vat,
    reserve,
  };
}
