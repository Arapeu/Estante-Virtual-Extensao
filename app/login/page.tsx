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

export default function PaginaLogin() {
  const [tipoUsuario, setTipoUsuario] = useState<"visitante" | "aluno" | "professor">("visitante")

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
                  <Tabs value={tipoUsuario} onValueChange={(valor) => setTipoUsuario(valor as any)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="visitante" className="text-xs">
                        <User className="h-4 w-4 mr-1" />
                        Visitante
                      </TabsTrigger>
                      <TabsTrigger value="aluno" className="text-xs">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Aluno
                      </TabsTrigger>
                      <TabsTrigger value="professor" className="text-xs">
                        <Users className="h-4 w-4 mr-1" />
                        Professor
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="visitante" className="space-y-4 mt-6">
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

                    <TabsContent value="aluno" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            Ainda não possui registro?{" "}
                            <Link href="/cadastro/aluno" className="text-blue-600 hover:underline font-medium">
                              Faça seu cadastro agora
                            </Link>
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="email-aluno">Email do Aluno</Label>
                          <Input id="email-aluno" type="email" placeholder="seu.email@instituicao.edu" />
                        </div>
                        <div>
                          <Label htmlFor="senha-aluno">Senha</Label>
                          <Input id="senha-aluno" type="password" />
                        </div>
                        <Button className="w-full">Entrar como Aluno</Button>
                        <div className="text-center">
                          <Link href="/esqueci-senha" className="block text-sm text-blue-600 hover:underline">
                            Esqueci minha senha
                          </Link>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="professor" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 mb-4">
                            Ainda não possui registro?{" "}
                            <Link href="/cadastro/professor" className="text-blue-600 hover:underline font-medium">
                              Faça seu cadastro agora
                            </Link>
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="email-professor">Email Institucional</Label>
                          <Input id="email-professor" type="email" placeholder="professor@instituicao.edu" />
                        </div>
                        <div>
                          <Label htmlFor="senha-professor">Senha</Label>
                          <Input id="senha-professor" type="password" />
                        </div>
                        <Button className="w-full">Entrar como Professor</Button>
                        <div className="text-center space-y-2">
                          <Link href="/esqueci-senha" className="block text-sm text-blue-600 hover:underline">
                            Esqueci minha senha
                          </Link>
                          <Link href="/solicitar-acesso" className="block text-sm text-blue-600 hover:underline">
                            Solicitar acesso como professor
                          </Link>
                        </div>
                      </div>
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
