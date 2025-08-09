'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'
import { useEffect } from 'react'


function ThemeSync() {
  const { theme, resolvedTheme } = useTheme()
  useEffect(() => {
    const current = theme === 'system' ? resolvedTheme : theme
    if (!current) return
    const root = document.documentElement

    // Sincroniza Tailwind/shadcn (classe 'dark')
    if (current === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')

    // Sincroniza DaisyUI (atributo 'data-theme')
    root.setAttribute('data-theme', current)
  }, [theme, resolvedTheme])
  return null
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
      themes={['light', 'dark']}
      {...props}
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
