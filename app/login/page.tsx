"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, GraduationCap, Users, Play } from "lucide-react"
import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"
import { useRouter, useSearchParams } from "next/navigation"

export default function PaginaLogin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeRole, setActiveRole] = useState(searchParams.get("role") || "VISITOR")
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          role: activeRole
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Salvar dados do usuário no localStorage
        localStorage.setItem("user", JSON.stringify(data.user))
        // Redirecionar para o catálogo
        router.push("/catalogo")
      } else {
        const data = await response.json()
        alert(data.error || "Erro ao fazer login")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      alert("Erro ao fazer login")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Acesse a Estante Virtual</h1>
              <p className="text-gray-600">Escolha seu tipo de acesso para começar</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Área de Demonstração */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-blue-600" />
                      Demonstração
                    </CardTitle>
                    <CardDescription>Veja como funciona nossa plataforma</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <Play className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Assista ao vídeo de apresentação e descubra todas as funcionalidades da nossa biblioteca digital.
                    </p>
                    <Button variant="outline" className="w-full">
                      Assistir Demonstração
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Acesso como Visitante</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Explore nosso catálogo público e acesse materiais gratuitos sem necessidade de cadastro.
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/catalogo">Explorar como Visitante</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Formulário de Login */}
              <Card>
                <CardHeader>
                  <CardTitle>Fazer Login</CardTitle>
                  <CardDescription>Entre com suas credenciais para acessar conteúdo exclusivo</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeRole} onValueChange={setActiveRole}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="VISITOR" className="text-xs">
                        <User className="h-4 w-4 mr-1" />
                        Visitante
                      </TabsTrigger>
                      <TabsTrigger value="STUDENT" className="text-xs">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Aluno
                      </TabsTrigger>
                      <TabsTrigger value="TEACHER" className="text-xs">
                        <Users className="h-4 w-4 mr-1" />
                        Professor
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="VISITOR" className="space-y-4 mt-6">
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Acesso Livre</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Como visitante, você pode explorar nosso catálogo público
                        </p>
                        <Button asChild>
                          <Link href="/catalogo">Continuar como Visitante</Link>
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="STUDENT" className="space-y-4 mt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-center">
                          <Link href="/register?role=STUDENT" className="text-blue-600 hover:underline">
                            Não possui uma conta? Registre-se como aluno
                          </Link>
                        </div>
                        <div>
                          <Label htmlFor="student-email">Email</Label>
                          <Input
                            id="student-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="student-password">Senha</Label>
                          <Input
                            id="student-password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Entrar como Aluno
                        </Button>
                        <div className="text-center">
                          <Link href="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
                            Esqueci minha senha
                          </Link>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="TEACHER" className="space-y-4 mt-6">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="text-center">
                          <Link href="/register?role=TEACHER" className="text-blue-600 hover:underline">
                            Não possui uma conta? Registre-se como professor
                          </Link>
                        </div>
                        <div>
                          <Label htmlFor="teacher-email">Email</Label>
                          <Input
                            id="teacher-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="teacher-password">Senha</Label>
                          <Input
                            id="teacher-password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Entrar como Professor
                        </Button>
                        <div className="text-center">
                          <Link href="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
                            Esqueci minha senha
                          </Link>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  )
}
