import { Toaster } from "sonner";
import "./styles/globals.css"
import Head from "next/head";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/themeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: 'NextWork',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>{metadata.title}</title>
        <link rel="icon" href='/public/icon.svg' />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <ThemeProvider>
          <AuthProvider>
            <ThemeToggle />
            {children}
            <Toaster richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

