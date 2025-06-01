"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">Confabu.lab</span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Início
            </Link>
            <Link href="/catalogo" className="text-gray-700 hover:text-blue-600 transition-colors">
              Catálogo
            </Link>
            <Link href="/cartilha" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cartilha
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contato
            </Link>
          </nav>

          {/* Botões de Autenticação Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/editor">Área do Editor</Link>
            </Button>
          </div>

          {/* Botão Menu Mobile */}
          <button className="md:hidden" onClick={() => setMenuAberto(!menuAberto)}>
            {menuAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navegação Mobile */}
        {menuAberto && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </Link>
              <Link href="/catalogo" className="text-gray-700 hover:text-blue-600 transition-colors">
                Catálogo
              </Link>
              <Link href="/cartilha" className="text-gray-700 hover:text-blue-600 transition-colors">
                Cartilha
              </Link>
              <Link href="/contato" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contato
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/editor">Área do Editor</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}