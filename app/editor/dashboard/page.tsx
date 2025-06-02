"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, FileText, Settings } from "lucide-react"
import Link from "next/link"
import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"
import { useEditorAuth } from "@/hooks/useEditorAuth"

export default function EditorDashboard() {
  const { isAuthenticated, isLoading, logout, requireAuth } = useEditorAuth()

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // O requireAuth já redirecionará para o login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel do Editor</h1>
          <Button variant="outline" onClick={logout}>
            Sair
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Gerenciar Catálogo
              </CardTitle>
              <CardDescription>Adicione, edite ou remova livros do catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Gerencie todos os livros disponíveis na biblioteca digital.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-600" />
                Gerenciar Cartilhas
              </CardTitle>
              <CardDescription>Administre as cartilhas educativas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Atualize e gerencie o conteúdo das cartilhas disponíveis.
              </p>
            </CardContent>
          </Card>

          <Link href="/editor/usuarios" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-purple-600" />
                  Gerenciar Usuários
                </CardTitle>
                <CardDescription>Controle de acesso e permissões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Gerencie usuários e suas permissões no sistema.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-600" />
                Configurações
              </CardTitle>
              <CardDescription>Configurações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ajuste as configurações gerais da plataforma.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Rodape />
    </div>
  )
} 