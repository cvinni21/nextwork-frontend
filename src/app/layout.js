// app/layout.js
import "./styles/globals.css"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/themeProvider"
import RouterProgress from "@/components/RouterProgress"
import VLibrasClient from "@/components/VLibrasClient"
import LayoutWrapper from "@/components/LayoutWrapper"

export const metadata = {
  title: 'NextWork',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
        <title>{metadata.title}</title>
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <ThemeProvider>
          <AuthProvider>
            <RouterProgress />
            <LayoutWrapper>{children}</LayoutWrapper>
            <VLibrasClient />
            <Toaster richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}