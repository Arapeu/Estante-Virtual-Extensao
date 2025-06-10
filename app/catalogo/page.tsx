"use client"

import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BookOpen, Download, Filter, Search } from "lucide-react"
import Image from 'next/image'
import { useEffect, useState } from "react"

interface Book {
  id: string
  title: string
  author: string
  pdfPath: string
  coverImagePath: string | null
  theme: string | null
}

export default function PaginaCatalogo() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error('Erro ao buscar os livros')
        }
        const data = await response.json()
        setBooks(data.books || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const themes = Array.from(new Set(books.map((book) => book.theme).filter(Boolean)))

  const filteredBooks = books.filter(
    (book) =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedTheme || book.theme === selectedTheme)
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />

      <div className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Catálogo de Livros</h1>
            <p className="text-gray-600">
              Explore nossa coleção de livros e materiais educativos
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filtros Laterais */}
            <aside className="w-full lg:w-64">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtrar por Tema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={!selectedTheme ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedTheme(null)}
                  >
                    Todos os temas
                  </Button>
                  {themes.map((theme) => (
                    <Button
                      key={theme}
                      variant={selectedTheme === theme ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedTheme(theme as string)}
                    >
                      {theme}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </aside>

            {/* Área Principal */}
            <div className="flex-1">
              {/* Barra de Busca e Botão de Upload */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Buscar por título ou autor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Resultados */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600">
                  {filteredBooks.length} livro(s) encontrado(s)
                </p>
              </div>

              {/* Grade de Livros */}
              {isLoading ? (
                <p className="text-center">Carregando livros...</p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBooks.map((book) => (
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
                        <CardTitle className="line-clamp-2 text-lg">
                          {book.title}
                        </CardTitle>
                        <CardDescription>por {book.author}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4 p-4 pt-0">
                        {book.theme && (
                          <Badge variant="outline" className="w-fit">
                            {book.theme}
                          </Badge>
                        )}
                        <Button size="sm" className="w-full" asChild>
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

              {/* Mensagem de Nenhum Livro Encontrado */}
              {!isLoading && filteredBooks.length === 0 && (
                <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-xl font-semibold">
                    Nenhum livro encontrado
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Tente ajustar sua busca ou o filtro de tema.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  )
}
