"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { EDITOR_CONFIG, validateEditorCredentials, type EditorCredentials } from "@/lib/config/editor"

export function useEditorAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o editor está autenticado ao carregar a página
    const token = localStorage.getItem("editorToken")
    setIsAuthenticated(token === EDITOR_CONFIG.authToken)
    setIsLoading(false)
  }, [])

  const login = async (credentials: EditorCredentials) => {
    try {
      if (validateEditorCredentials(credentials)) {
        localStorage.setItem("editorToken", EDITOR_CONFIG.authToken)
        setIsAuthenticated(true)
        return { success: true }
      }
      return { success: false, error: "Credenciais inválidas" }
    } catch (error) {
      return { success: false, error: "Erro ao fazer login" }
    }
  }

  const logout = () => {
    localStorage.removeItem("editorToken")
    setIsAuthenticated(false)
    router.push("/editor/login")
  }

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/editor/login")
    }
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth
  }
} 