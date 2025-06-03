'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()

  const hideFooter = ['/login', '/register', '/not-found'].some(route =>
    pathname.startsWith(route)
  )

  return (
    <>
      <ThemeToggle />
      {children}
      {!hideFooter && <Footer />}
    </>
  )
}
