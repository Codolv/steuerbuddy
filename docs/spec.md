# Project: SteuerBuddy

## 🧩 Overview
SteuerBuddy ist ein SaaS-Tool für Freelancer in Deutschland.  
Es hilft, automatisch Steuer-Rücklagen zu berechnen, zu planen und zu verwalten, um monatlich den Überblick über zu zahlende Steuern zu behalten.

Zielgruppe: Selbstständige & Freelancer in Deutschland  
Hauptnutzen: Steuerstress vermeiden durch klare, automatische Rücklagenplanung.

---

## 🎯 Core Features (MVP)
1. **User Authentication**
   - E-Mail Login / Magic Link
   - Role: user (kein Admin nötig im MVP)

2. **Income Tracking**
   - Einnahmen manuell hinzufügen: Betrag, Datum, Beschreibung
   - Kategorie (optional: Projektname, Kunde)

3. **Tax Calculation Logic**
   - Steuerstatus: Kleinunternehmer / Regelbesteuerung
   - Einkommensteuer-Schätzung (20–30 %)
   - Umsatzsteuer (19 %)
   - Empfehlung: Rücklagenbetrag pro Monat = Einkommensteuer + Umsatzsteuer (falls relevant)
   - Steuerquote als Config im Userprofil speicherbar

4. **Dashboard**
   - Chart: Einnahmen vs. Rücklagen (Monatsübersicht)
   - Gesamtrücklage aktuell
   - Durchschnittliche Steuerquote
   - Farblich markierte Empfehlung (z. B. „Du solltest diesen Monat 850 € zurücklegen“)

5. **Exports**
   - CSV-Export aller Einnahmen & Rücklagen
   - PDF-Report für Steuerberater (Basic Layout)

6. **Notifications (optional MVP+)**
   - E-Mail-Erinnerung: „Überweise X € Rücklage bis Datum Y“
   - Wöchentliche Übersicht (optional)

---

## ⚙️ Tech Stack (empfohlen)
**Frontend:** Next.js (React) + Tailwind CSS  
**Backend:** Supabase (Auth, DB, API)  
**Database:** PostgreSQL  
**Auth:** Supabase Auth (Magic Link)  
**Hosting:** Vercel  
**E-Mail:** Resend oder Brevo API  
**Analytics:** Simple internal logging (kein Tracking notwendig im MVP)

---

## 🧱 Database Schema (Draft)

**users**
- id (uuid)
- email (string)
- name (string)
- tax_mode (enum: "kleinunternehmer" | "regelbesteuerung")
- income_tax_rate (float)
- created_at (timestamp)

**incomes**
- id (uuid)
- user_id (uuid)
- amount (float)
- date (date)
- description (text)
- created_at (timestamp)

**settings**
- id (uuid)
- user_id (uuid)
- notification_enabled (bool)
- preferred_currency (string, default: "EUR")

**backups / exports**
- id (uuid)
- user_id (uuid)
- type (enum: "csv" | "pdf")
- created_at (timestamp)
- download_url (string)

---

## 💅 Design & UX
- Fokus: Minimalistisch, ruhig, Vertrauen erzeugend
- Farbschema: Hellblau (#00A3FF), Weiß, Grau (#F4F4F5)
- Fonts: Inter / Roboto
- Stil: "FinTech für Freelancer" – clean, sympathisch, ohne Bürokratie-Vibe
- Mobile-first responsive layout
- Dashboard-Karten mit klaren Zahlen (keine Textwüsten)

---

## 🧠 AI / Copilot Style Guidance
Wenn Code generiert wird:
- Schreibe klaren, kommentierten Code (deutsche Kommentare)
- Verwende Typisierung (TypeScript)
- Priorisiere Lesbarkeit und einfache Logik statt Over-Engineering
- Schreibe helper functions für Berechnungen (`calculateTaxReserve(income, rate, taxMode)`)

---

## 🧪 Testing & Quality
- Use Jest for basic logic testing (especially tax calculation)
- No E2E tests in MVP phase
- Linting: ESLint + Prettier
- Deployment pipeline: GitHub Actions → Vercel auto deploy

---

## 📅 Milestones
1. Week 1–2: Auth + Datenmodell + Income Input
2. Week 3–4: Dashboard UI + Steuerberechnung
3. Week 5: Exportfunktion + Beta-Testing
4. Week 6: Launch (LinkedIn / Landingpage)

---

## 🧩 Future Features (v1.0+)
- Bank API Integration (FinAPI / Nordigen)
- Automatische Berechnung via Umsatzimport
- Steuerkalender mit Fristen
- E-Mail Automation
- Referral-Programm

---

## 🪪 Licensing & Legal
- Lizenz: MIT
- DSGVO-konform (kein unnötiges Tracking)
- Alle Daten auf EU-Servern (Supabase EU)

---

## 💬 Communication Style (Readme & Commit Guidelines)
- Freundlich, professionell, deutschsprachig
- Kurze Commit Messages: `feat:`, `fix:`, `style:`, `refactor:`
- Beispiel: `feat: Steuerberechnung implementiert`
