import React from 'react';
import type { ReactElement } from 'react';
import DashboardClient from './components/DashboardClient';

/**
 * Server-Component (App Router, Next.js 15)
 * - Metadata instead of next/head (recommended in the App Router)
 * - Passes sample data as props to the Client component
 */

export const metadata = {
  title: 'SteuerBuddy — Dashboard (MVP)',
  description: 'Dashboard für Steuer-Rücklagenplanung',
};

type Income = {
  id: string;
  amount: number;
  date: string;
  description?: string;
};

type UserSettings = {
  tax_mode: 'kleinunternehmer' | 'regelbesteuerung';
  income_tax_rate: number;
};

const sampleIncomes: Income[] = [
  { id: '1', amount: 3500, date: '2025-10-01', description: 'Projekt A' },
  { id: '2', amount: 1200, date: '2025-10-10', description: 'Beratung' },
];

const sampleUser: UserSettings = {
  tax_mode: 'regelbesteuerung',
  income_tax_rate: 0.25, // 25 %
};

export default function Page(): ReactElement {
  return (
    <html lang="de">
      <body>
        <main className="min-h-screen bg-gray-50 text-gray-800 p-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-semibold text-blue-600">SteuerBuddy</h1>
              <p className="text-sm text-gray-600 mt-1">Automatische Rücklagenplanung für Freelancer</p>
            </header>

            <DashboardClient incomes={sampleIncomes} user={sampleUser} />

            <footer className="text-xs text-gray-500 mt-6">MVP — basierend auf docs/spec.md</footer>
          </div>
        </main>
      </body>
    </html>
  );
}
