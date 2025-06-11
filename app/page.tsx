'use client'

import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download, Heart, Users } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"
import { useEffect, useState } from 'react'

interface Book {
  id: string
  title: string
  author: string
  pdfPath: string
  coverImagePath: string | null
  accessLevel?: 'PUBLIC' | 'STUDENT_AND_TEACHER' | 'TEACHER_ONLY'
}

export default function PaginaInicial() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error('Erro ao buscar os livros')
        }
        const data = await response.json()
        setBooks(data.books)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Apenas livros públicos
  const publicBooks = books.filter((book) => book.accessLevel === 'PUBLIC')

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
              className="text-blue-600 border-white hover:bg-blue-600 hover:text-purple-300"
              asChild
            >
              <Link href="/login">Fazer Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Livros Recentes */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Livros Recentes
          </h2>
          {isLoading ? (
            <p className="text-center">Carregando livros...</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {publicBooks.slice(0, 6).map((book) => (
                <Card
                  key={book.id}
                  className="flex flex-col justify-between transition-shadow hover:shadow-lg"
                >
                  <CardHeader className="p-4">
                    <div className="relative mb-4 flex aspect-[3/4] items-center justify-center rounded-lg bg-gray-200">
                      {book.coverImagePath ? (
                        <Image
                          src={book.coverImagePath}
                          alt={`Capa do livro ${book.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      ) : (
                        <BookOpen className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <CardTitle>{book.title}</CardTitle>
                    <CardDescription>{book.author}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <a href={book.pdfPath} download>
                        <Download className="mr-2 h-4 w-4" />
                        Baixar PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
