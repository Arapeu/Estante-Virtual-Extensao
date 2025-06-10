"use client"

import Cabecalho from '@/components/layout/cabecalho'
import Rodape from '@/components/layout/rodape'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookLock, PlusCircle, Users } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />
      <main className="flex-1 bg-gray-50/50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Painel do Editor</h1>
            <p className="text-gray-600">
              Gerencie os recursos da plataforma por aqui.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-6 w-6 text-blue-600" />
                  Cadastrar Livro
                </CardTitle>
                <CardDescription>
                  Adicione um novo livro em PDF ao acervo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/upload">Acessar Cadastro</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookLock className="h-6 w-6 text-green-600" />
                  Gerenciar Livros
                </CardTitle>
                <CardDescription>
                  Edite ou delete os livros existentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/manage">Acessar Gerenciador</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-orange-600" />
                  Gerenciar Usuários
                </CardTitle>
                <CardDescription>
                  Visualize e remova os usuários cadastrados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/users">Acessar Usuários</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  )
} 