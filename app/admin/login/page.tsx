"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Credenciais estáticas do admin
  const ADMIN_EMAIL = "admin@estantevirtual.com"
  const ADMIN_PASSWORD = "admin123"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Salvar estado de admin no localStorage
      localStorage.setItem("admin", JSON.stringify({ email: ADMIN_EMAIL }))
      router.push("/admin/dashboard")
    } else {
      setError("Credenciais inválidas")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login Administrativo</CardTitle>
          <CardDescription className="text-center">
            Acesse o painel de controle da Estante Virtual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@estantevirtual.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 