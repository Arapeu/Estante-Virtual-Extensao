"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { UserCircle, LogOut, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  name: string
  role: "STUDENT" | "TEACHER" | "VISITOR"
}

export default function Cabecalho() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Buscar usuário do localStorage
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Estante Virtual
          </Link>

          <nav className="flex items-center gap-8">
            {user ? (
              <div className="flex items-center gap-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <UserCircle className="h-6 w-6" />
                      <div className="text-left">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.role === "STUDENT" ? "Estudante" : 
                           user.role === "TEACHER" ? "Professor" : 
                           "Visitante"}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/perfil">Meu Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/catalogo">Catálogo</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white" asChild>
                  <Link href="/admin/login" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Painel do Editor
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Button variant="outline" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="outline" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
                  <Link href="/register">Registrar</Link>
                </Button>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700 hover:text-white" asChild>
                  <Link href="/admin/login" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Painel do Editor
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}