"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"
import { useEditorAuth } from "@/hooks/useEditorAuth"
import { EDITOR_CONFIG } from "@/lib/config/editor"

export default function EditorLogin() {
  const router = useRouter()
  const { login } = useEditorAuth()
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login({ email, password: senha })
      
      if (result.success) {
        toast.success("Login realizado com sucesso!")
        router.push("/editor/dashboard")
      } else {
        toast.error(result.error || "Credenciais inválidas")
      }
    } catch (error) {
      toast.error("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Área do Editor</CardTitle>
            <CardDescription className="text-center">
              Faça login para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={EDITOR_CONFIG.credentials.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <Input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Rodape />
    </div>
  )
} 