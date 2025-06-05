"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserPlus, UserMinus, Edit2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "STUDENT" | "TEACHER"
  institution: string
  createdAt: string
}

export default function UsersManagement() {
  const router = useRouter()
  const [admin, setAdmin] = useState<any>(null)
  const [students, setStudents] = useState<User[]>([])
  const [teachers, setTeachers] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState("students")

  useEffect(() => {
    // Verificar se o admin está logado
    const adminData = localStorage.getItem("admin")
    if (!adminData) {
      router.push("/admin/login")
      return
    }
    setAdmin(JSON.parse(adminData))

    // Carregar usuários
    fetchUsers()
  }, [router])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users")
      const data = await response.json()
      
      // Separar usuários por tipo
      const studentsList = data.filter((user: User) => user.role === "STUDENT")
      const teachersList = data.filter((user: User) => user.role === "TEACHER")
      
      setStudents(studentsList)
      setTeachers(teachersList)
    } catch (error) {
      console.error("Erro ao carregar usuários:", error)
    }
  }

  const handleBack = () => {
    router.push("/admin/dashboard")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBack} className="text-gray-600">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="students" onClick={() => setActiveTab("students")}>
              Alunos ({students.length})
            </TabsTrigger>
            <TabsTrigger value="teachers" onClick={() => setActiveTab("teachers")}>
              Professores ({teachers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Alunos</CardTitle>
                <CardDescription>
                  Visualize e gerencie os alunos cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border"
                    >
                      <div>
                        <h3 className="font-medium">{student.name}</h3>
                        <p className="text-sm text-gray-500">{student.email}</p>
                        <p className="text-sm text-gray-500">{student.institution}</p>
                        <p className="text-xs text-gray-400">
                          Cadastrado em: {formatDate(student.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <UserMinus className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Professores</CardTitle>
                <CardDescription>
                  Visualize e gerencie os professores cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border"
                    >
                      <div>
                        <h3 className="font-medium">{teacher.name}</h3>
                        <p className="text-sm text-gray-500">{teacher.email}</p>
                        <p className="text-sm text-gray-500">{teacher.institution}</p>
                        <p className="text-xs text-gray-400">
                          Cadastrado em: {formatDate(teacher.createdAt)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <UserMinus className="h-4 w-4 mr-2" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
} 