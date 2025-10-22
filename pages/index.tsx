import React from 'react';
import Head from 'next/head';
import calculateTaxReserve from '../lib/calculateTaxReserve';

const sampleIncomes = [
  { id: '1', amount: 3500, date: '2025-10-01', description: 'Projekt A' },
  { id: '2', amount: 1200, date: '2025-10-10', description: 'Beratung' },
];

export default function Home() {
  // Beispielnutzer-Settings (später aus Supabase laden)
  const user = {
    tax_mode: 'regelbesteuerung' as const,
    income_tax_rate: 0.25, // 25%
  };

  const totals = sampleIncomes.reduce(
    (acc, cur) => ({ ...acc, amount: acc.amount + cur.amount }),
    { amount: 0 }
  );

  const { incomeTax, vat, reserve } = calculateTaxReserve(totals.amount, user.income_tax_rate, user.tax_mode);

  return (
    <>
      <Head>
        <title>SteuerBuddy — Dashboard (MVP)</title>
        <meta name="description" content="Dashboard für Steuer-Rücklagenplanung" />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold text-blue-600">SteuerBuddy</h1>
            <p className="text-sm text-gray-600 mt-1">Automatische Rücklagenplanung für Freelancer</p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-sm text-gray-500">Monatliche Einnahmen</h2>
              <p className="text-2xl font-bold">€ {totals.amount.toFixed(2)}</p>
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
              {sampleIncomes.map((inc) => (
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

          <footer className="text-xs text-gray-500">MVP — basierend auf docs/spec.md</footer>
        </div>
      </main>
    </>
  );
}