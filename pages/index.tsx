import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Income = {
  id: string
  amount: number
  date: string
  description?: string
}

type Profile = {
  id: string
  email?: string
  name?: string
  tax_mode?: 'kleinunternehmer' | 'regelbesteuerung'
  income_tax_rate?: number
}

// Hilfsfunktion: berechnet die empfohlene Rücklage (Einkommensteuer + ggf. Umsatzsteuer)
function calculateTaxReserve(income: number, incomeTaxRate = 0.25, taxMode: string | null = 'regelbesteuerung') {
  // Einkommensteuer-Anteil
  const incomeTax = income * incomeTaxRate
  // Umsatzsteuer nur bei Regelbesteuerung (19%)
  const vat = taxMode === 'regelbesteuerung' ? income * 0.19 : 0
  return incomeTax + vat
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [incomes, setIncomes] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Auth state listener
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id)
        fetchIncomes(session.user.id)
      } else {
        setProfile(null)
        setIncomes([])
      }
    })

    // Try to fetch current session/profile on mount
    ;(async () => {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData?.data?.session?.user?.id
      if (userId) {
        await fetchProfile(userId)
        await fetchIncomes(userId)
      }
      setLoading(false)
    })()

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) {
      console.error('Fehler beim Laden des Profils', error)
      return
    }
    setProfile(data as Profile)
  }

  async function fetchIncomes(userId: string) {
    const { data, error } = await supabase.from('incomes').select('*').eq('user_id', userId).order('date', { ascending: false })
    if (error) {
      console.error('Fehler beim Laden der Einnahmen', error)
      return
    }
    setIncomes((data as Income[]) || [])
  }

  async function signInWithMagicLink() {
    setMessage('Sende Magic Link...')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage('Fehler beim Senden des Links: ' + error.message)
      return
    }
    setMessage('Magic Link gesendet — bitte überprüfe deine E‑Mail.')
  }

  const totalIncome = incomes.reduce((s, it) => s + Number(it.amount), 0)
  const reserve = calculateTaxReserve(totalIncome, profile?.income_tax_rate ?? 0.25, profile?.tax_mode ?? 'regelbesteuerung')

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">SteuerBuddy — Dashboard (MVP)</h1>

        {!profile && (
          <section className="mb-8">
            <p className="mb-2">Anmelden per Magic Link (E‑Mail):</p>
            <div className="flex gap-2">
              <input
                className="border p-2 rounded flex-1"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={signInWithMagicLink}>
                Senden
              </button>
            </div>
            {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
          </section>
        )}

        {profile && (
          <section className="mb-8">
            <h2 className="text-xl font-medium">Willkommen, {profile.name ?? profile.email}</h2>
            <p className="text-sm text-gray-600">Steuermodus: {profile.tax_mode} — Einkommensteuerquote: {Math.round((profile.income_tax_rate ?? 0.25) * 100)}%</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Gesamteinnahmen</div>
                <div className="text-2xl font-semibold">{totalIncome.toFixed(2)} {"EUR"}</div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Empfohlene Rücklage</div>
                <div className="text-2xl font-semibold text-blue-600">{reserve.toFixed(2)} EUR</div>
              </div>
              <div className="p-4 border rounded">
                <div className="text-sm text-gray-500">Durchschnittliche Steuerquote</div>
                <div className="text-2xl font-semibold">{Math.round(((profile.income_tax_rate ?? 0.25) + (profile.tax_mode === 'regelbesteuerung' ? 0.19 : 0)) * 100)}%</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium">Letzte Einnahmen</h3>
              <ul className="mt-2 space-y-2">
                {incomes.length === 0 && <li className="text-sm text-gray-500">Keine Einnahmen erfasst.</li>}
                {incomes.map((inc) => (
                  <li key={inc.id} className="p-3 border rounded flex justify-between">
                    <div>
                      <div className="font-medium">{inc.description ?? '—'}</div>
                      <div className="text-sm text-gray-500">{inc.date}</div>
                    </div>
                    <div className="font-semibold">{Number(inc.amount).toFixed(2)} EUR</div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="text-sm text-gray-500 mt-8">Built with Next.js + Supabase — MVP preview</footer>
      </main>
    </div>
  )
}