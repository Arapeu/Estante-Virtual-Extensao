import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Download, Heart } from "lucide-react"
import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"

export default function PaginaInicial() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Banner Principal */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Estante Virtual Confabu.lab</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Acesse uma biblioteca digital completa com livros, cartilhas e materiais educativos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/catalogo">Explorar Catálogo</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/login">Fazer Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seções Destacadas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossas Seções</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  Confabu.Lab
                </CardTitle>
                <CardDescription>Laboratório de conhecimento e inovação</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explore materiais de pesquisa, estudos e projetos desenvolvidos em nosso laboratório.
                </p>
                <Button variant="outline" size="sm">
                  Ver Mais
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  Confabu.Lário
                </CardTitle>
                <CardDescription>Comunidade e colaboração</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Conecte-se com outros usuários, compartilhe conhecimento e colabore em projetos.
                </p>
                <Button variant="outline" size="sm">
                  Participar
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-6 w-6 text-purple-600" />
                  Biblioteca Digital
                </CardTitle>
                <CardDescription>Acesso livre ao conhecimento</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Baixe livros, cartilhas e materiais educativos em formato PDF.</p>
                <Button variant="outline" size="sm">
                  Explorar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Cartilha Imigrantes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Cartilha para Imigrantes</h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Guia completo com informações essenciais para imigrantes no Brasil
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cartilha">
                <Heart className="mr-2 h-5 w-5" />
                Acessar Cartilha
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  )
}
