'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60 * 1000, retry: 1 },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => {
        if (!node) return false
        const tag = node.tagName?.toUpperCase()
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
        if (node.hasAttribute?.('data-lenis-prevent')) return true
        if (node.closest?.('form, input, textarea, select, [data-lenis-prevent]')) return true
        return false
      },
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
