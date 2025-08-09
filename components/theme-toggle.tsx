'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    // Evita mismatch de hidratação
    return (
      <button
        className="px-3 py-2 rounded"
        aria-label="Alternar tema"
        disabled
      >
        …
      </button>
    )
  }

  const current = theme === 'system' ? systemTheme : theme
  const isDark = current === 'dark'

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="px-3 py-2 rounded border border-zinc-300 dark:border-zinc-700"
      title={`Tema: ${isDark ? 'escuro' : 'claro'}`}
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  )
}
