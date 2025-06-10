'use client'

import Cabecalho from '@/components/layout/cabecalho'
import Rodape from '@/components/layout/rodape'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Edit, PlusCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Book {
  id: string
  title: string
  author: string
}

export default function ManageBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchBooks = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/books')
      if (!response.ok) {
        throw new Error('Erro ao buscar os livros')
      }
      const data = await response.json()
      setBooks(data.books || [])
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar os livros.',
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleDelete = async (bookId: string) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar o livro')
      }

      toast({
        title: 'Sucesso!',
        description: 'O livro foi deletado.',
      })
      // Atualiza a lista de livros após a exclusão
      fetchBooks()
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar o livro.',
        description: 'Tente novamente mais tarde.',
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />
      <main className="flex-1 bg-gray-50/50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Voltar</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Gerenciar Livros</h1>
                <p className="text-gray-600">
                  Edite ou delete os livros cadastrados.
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/upload">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Novo Livro
              </Link>
            </Button>
          </div>

          <div className="rounded-lg border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead className="w-[120px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : books.length > 0 ? (
                  books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" disabled>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Deletar</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Você tem certeza?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Essa ação não pode ser desfeita. Isso irá
                                  deletar permanentemente o livro do servidor.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(book.id)}
                                >
                                  Deletar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      Nenhum livro cadastrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Rodape />
    </div>
  )
} 