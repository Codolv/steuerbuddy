'use client';

import React from 'react';
import calculateTaxReserve, { TaxMode, TaxReserveResult } from '../../lib/calculateTaxReserve';

type Income = {
  id: string;
  amount: number;
  date: string;
  description?: string;
};

type UserSettings = {
  tax_mode: TaxMode;
  income_tax_rate: number;
};

export default function DashboardClient({
  incomes,
  user,
}: {
  incomes: Income[];
  user: UserSettings;
}) {
  const totals = incomes.reduce((acc, cur) => acc + cur.amount, 0);

  const { incomeTax, vat, reserve }: TaxReserveResult = calculateTaxReserve(
    totals,
    user.income_tax_rate,
    user.tax_mode
  );

  return (
    <section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Monatliche Einnahmen</h2>
          <p className="text-2xl font-bold">€ {totals.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Geschätzte Einkommensteuer</h2>
          <p className="text-2xl font-bold">€ {incomeTax.toFixed(2)}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Empfohlene Rücklage</h2>
          <p className="text-2xl font-bold text-blue-600">€ {reserve.toFixed(2)}</p>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-medium mb-3">Einnahmen (Beispiel)</h3>
        <ul className="space-y-2">
          {incomes.map((inc) => (
            <li key={inc.id} className="bg-white p-3 rounded shadow flex justify-between">
              <div>
                <div className="font-medium">{inc.description}</div>
                <div className="text-sm text-gray-500">{inc.date}</div>
              </div>
              <div className="font-semibold">€ {inc.amount.toFixed(2)}</div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
