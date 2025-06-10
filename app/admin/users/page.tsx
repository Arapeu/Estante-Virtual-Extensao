"use client"

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
import { Badge } from '@/components/ui/badge'
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
import { ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  institution: string | null
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        throw new Error('Erro ao buscar os usuários')
      }
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar os usuários.',
        description: 'Tente novamente mais tarde.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar o usuário')
      }

      toast({
        title: 'Sucesso!',
        description: 'O usuário foi deletado.',
      })
      fetchUsers() // Atualiza a lista
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar o usuário.',
        description: 'Tente novamente mais tarde.',
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Cabecalho />
      <main className="flex-1 bg-gray-50/50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
              <p className="text-gray-600">
                Visualize e delete os usuários cadastrados.
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Instituição</TableHead>
                  <TableHead>Função</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.institution || 'N/A'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
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
                                deletar permanentemente o usuário.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                              >
                                Deletar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum usuário encontrado.
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