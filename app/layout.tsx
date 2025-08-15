import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Rajdhani } from "next/font/google"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rajdhani",
})

export const metadata: Metadata = {
  title: "StoxGPT - AI-Powered Trading Platform",
  description: "AI-powered Crypto & Indian Stock Market Trading Platform",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} dark`}>
      <head>
        <script src="https://smtpjs.com/v3/smtp.js"></script>
      </head>
      <body className="font-rajdhani antialiased">{children}</body>
    </html>
  )
}
