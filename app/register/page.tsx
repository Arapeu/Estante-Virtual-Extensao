"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const role = searchParams.get("role") || "STUDENT"
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpf: "",
        institution: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    role
                }),
            })

            if (response.ok) {
                router.push("/login")
            } else {
                const data = await response.json()
                alert(data.error || "Erro ao registrar usuário")
            }
        } catch (error) {
            console.error("Erro ao registrar:", error)
            alert("Erro ao registrar usuário")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        {role === "STUDENT" ? "Registro de Aluno" : "Registro de Professor"}
                    </CardTitle>
                    <CardDescription className="text-center">
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                                id="cpf"
                                type="text"
                                required
                                value={formData.cpf}
                                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="institution">Instituição</Label>
                            <Input
                                id="institution"
                                type="text"
                                required
                                value={formData.institution}
                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Registrar
                        </Button>

                        <div className="text-center text-sm">
                            Já possui uma conta?{" "}
                            <Link href={`/login?role=${role}`} className="text-blue-600 hover:underline">
                                Fazer login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 