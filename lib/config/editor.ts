// Configurações do Editor
export const EDITOR_CONFIG = {
  // Em um ambiente de produção, estas credenciais devem vir de variáveis de ambiente
  credentials: {
    email: "editor@confabu.lab",
    // Em produção, a senha deve ser armazenada de forma segura (hasheada)
    password: "Confabu@2024"
  },
  // Token de autenticação (em produção, deve ser gerado pelo backend)
  authToken: "confabu-editor-token-2024"
} as const

// Tipo para as credenciais do editor
export type EditorCredentials = {
  email: string
  password: string
}

// Função para validar as credenciais do editor
export function validateEditorCredentials(credentials: EditorCredentials): boolean {
  return (
    credentials.email === EDITOR_CONFIG.credentials.email &&
    credentials.password === EDITOR_CONFIG.credentials.password
  )
} 