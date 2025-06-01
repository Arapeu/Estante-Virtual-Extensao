import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Estante Virtual Confabu.lab",
  description: "Plataforma de livros digitais da Confabu.lab",
    generator: 'v0.dev'
}

export default function LayoutPrincipal({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
