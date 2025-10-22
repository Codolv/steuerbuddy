# 💙 SteuerBuddy

**SteuerBuddy** ist ein einfaches, datenschutzfreundliches SaaS-Tool für **Freelancer in Deutschland**,  
um automatisch ihre **monatlichen Steuer-Rücklagen zu berechnen und zu planen** – ganz ohne komplizierte Buchhaltungssoftware.

> 💡 „Weniger Steuerstress. Mehr Überblick. Mehr Zeit für dein Business.“

---

## 🚀 Funktionen (MVP)

✅ Einnahmen erfassen (manuell oder automatisch)  
✅ Automatische Steuerberechnung (Einkommensteuer + Umsatzsteuer)  
✅ Rücklagen-Empfehlung je Monat  
✅ Dashboard mit Übersicht (Einnahmen vs. Rücklagen)  
✅ Export als CSV oder PDF  

---

## 🧩 Beispiel: Steuerberechnung
| Monatseinnahmen | Steuerstatus | Rücklage empfohlen |
|------------------|---------------|--------------------|
| 3.000 € | Regelbesteuerung | 1.140 € |
| 3.000 € | Kleinunternehmer | 750 € |

*(Basierend auf geschätzter Einkommensteuerquote 25–30 %)*

---

## ⚙️ Tech Stack
| Komponente | Technologie |
|-------------|--------------|
| Frontend | **Next.js (React + Tailwind CSS)** |
| Backend | **Supabase (Auth + PostgreSQL)** |
| Authentifizierung | Magic Link / E-Mail Login |
| Hosting | Vercel |
| E-Mail | Resend / Brevo |
| Testing | Jest |
| CI/CD | GitHub Actions → Vercel Deploy |

---

## 🧱 Projektstruktur

```
steuerbuddy/
│
├── /app/                # Next.js App Router
│   ├── dashboard/       # Dashboard & Steuerübersicht
│   ├── api/             # Serverless APIs
│   └── auth/            # Login / Signup
│
├── /components/         # Reusable UI components
├── /lib/                # Helper functions (z. B. Steuerlogik)
├── /public/             # Static assets
├── /styles/             # Tailwind setup
│
├── /docs/               # Projekt-Spezifikation (spec.md)
└── README.md
```

---

## 🧮 Beispiel-Funktion: Steuerberechnung

```ts
// lib/tax.ts

export function calculateTaxReserve(
  income: number,
  taxRate: number,
  taxMode: "regelbesteuerung" | "kleinunternehmer"
): number {
  const incomeTax = income * (taxRate / 100);
  const vat = taxMode === "regelbesteuerung" ? income * 0.19 : 0;
  return incomeTax + vat;
}
```

---

## 🧠 Entwicklungsphasen

| Phase | Ziel | Dauer |
|-------|------|-------|
| MVP | Einnahmen + Berechnung + Dashboard | 4–6 Wochen |
| V1.0 | Bankintegration + Erinnerungen | 2–3 Monate |
| V2.0 | Steuerkalender + Coach-Modus + Referral-System | 6+ Monate |

---

## 🪪 Datenschutz & Sicherheit
- DSGVO-konform (Server in der EU via Supabase EU Region)  
- Keine externen Tracker  
- Datenverschlüsselung bei Speicherung und Übertragung  
- Nur notwendige personenbezogene Daten werden erhoben  

---

## 🧩 Setup (lokal)

```bash
# Repository klonen
git clone https://github.com/deinusername/steuerbuddy.git
cd steuerbuddy

# Abhängigkeiten installieren
npm install

# Lokalen Dev-Server starten
npm run dev
```

### 🔑 Umgebungsvariablen
Erstelle eine `.env.local` Datei:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
```

---

## 📤 Deployment
Das Projekt ist für **Vercel** optimiert.  
Einfach das Repository verknüpfen – alle Secrets werden über das Dashboard gesetzt.

```bash
# Optionales Build
npm run build
```

Vercel übernimmt Deployment & Preview automatisch.

---

## 🧪 Tests

```bash
npm run test
```

Unit-Tests für Berechnungslogik (Jest) sind im `/tests`-Verzeichnis.

---

## 📅 Roadmap

- [x] MVP: Einnahmen + Rücklagenberechnung  
- [ ] PDF-Export  
- [ ] E-Mail-Erinnerungen  
- [ ] FinAPI / Nordigen Bankanbindung  
- [ ] Steuerkalender  
- [ ] Partnerprogramm  

---

## 🤝 Beitrag leisten

Pull Requests und Issues sind willkommen!  
Bitte halte dich an die [Code of Conduct](CODE_OF_CONDUCT.md) und Commit-Konventionen:

```
feat: Neue Funktion hinzugefügt
fix: Fehler in Steuerlogik behoben
refactor: Code-Struktur verbessert
```

---

## 📄 Lizenz
Dieses Projekt steht unter der **MIT-Lizenz**.  
Siehe [LICENSE](LICENSE) für Details.

---

## 💬 Kontakt & Community
👨‍💻 Entwickelt von: [Dein Name oder Alias]  
📬 LinkedIn: [linkedin.com/in/deinprofil]  
🌐 Website: [steuerbuddy.de – coming soon]

> Wenn dir das Projekt gefällt, ⭐️ das Repo und folge für Updates!
