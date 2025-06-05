"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, Settings, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)

  useEffect(() => {
    // Verificar se o admin está logado
    const adminData = localStorage.getItem("admin")
    if (!adminData) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(adminData))
  }, [router])

  const handleLogout = () => {
    // Limpar tanto o estado do admin quanto o do usuário normal
    localStorage.removeItem("admin")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <Button variant="outline" onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gerenciar Usuários */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciar Usuários
              </CardTitle>
              <CardDescription>
                Visualize, edite e remova usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/admin/users")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>

          {/* Gerenciar Livros */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Gerenciar Livros
              </CardTitle>
              <CardDescription>
                Publique, edite ou remova livros do catálogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/admin/books")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>

          {/* Configurações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações
              </CardTitle>
              <CardDescription>
                Configure as opções do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => router.push("/admin/settings")}
              >
                Acessar
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 