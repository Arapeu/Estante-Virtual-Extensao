import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Play, FileText, Printer, Heart } from "lucide-react"
import Cabecalho from "@/components/layout/cabecalho"
import Rodape from "@/components/layout/rodape"

export default function PaginaCartilha() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <div className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Cabeçalho da Cartilha */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Heart className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Cartilha para Imigrantes</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guia completo com informações essenciais para imigrantes que chegam ao Brasil
            </p>
          </div>

          {/* Vídeo Tutorial */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-red-600" />
                Vídeo Tutorial
              </CardTitle>
              <CardDescription>Assista ao vídeo explicativo sobre como usar esta cartilha</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <Play className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Este vídeo explica passo a passo como utilizar a cartilha e aproveitar ao máximo as informações
                disponíveis.
              </p>
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Assistir no Instagram
              </Button>
            </CardContent>
          </Card>

          {/* Conteúdo da Cartilha */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Conteúdo da Cartilha
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">1. Documentação Essencial</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• CPF - Como obter e para que serve</li>
                    <li>• RNE - Registro Nacional de Estrangeiro</li>
                    <li>• Carteira de Trabalho</li>
                    <li>• Conta bancária</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">2. Direitos e Deveres</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Direitos trabalhistas</li>
                    <li>• Acesso à saúde pública</li>
                    <li>• Educação para filhos</li>
                    <li>• Assistência social</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">3. Serviços Públicos</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• SUS - Sistema Único de Saúde</li>
                    <li>• Educação pública</li>
                    <li>• Transporte público</li>
                    <li>• Programas sociais</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">4. Orientações Práticas</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Como encontrar moradia</li>
                    <li>• Procurar emprego</li>
                    <li>• Aprender português</li>
                    <li>• Integração cultural</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="h-5 w-5 text-green-600" />
                  Como Imprimir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">Dicas de Impressão</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      <strong>Papel:</strong> Use papel A4 comum (75g/m²) para melhor resultado
                    </li>
                    <li>
                      <strong>Margem:</strong> Configure margens de 2cm em todos os lados
                    </li>
                    <li>
                      <strong>Qualidade:</strong> Imprima em modo "Normal" ou "Alta qualidade"
                    </li>
                    <li>
                      <strong>Frente e verso:</strong> Ative a impressão duplex para economizar papel
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Encadernação</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Use grampos ou espiral para facilitar o manuseio</li>
                    <li>• Considere plastificar a capa para maior durabilidade</li>
                    <li>• Faça furos para arquivar em pasta</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Dica:</strong> Imprima algumas cópias extras para compartilhar com outros imigrantes da sua
                    comunidade.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Download className="h-5 w-5 mr-2" />
              Baixar Cartilha PDF
            </Button>
            <Button size="lg" variant="outline">
              <Printer className="h-5 w-5 mr-2" />
              Como Imprimir este Livro?
            </Button>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Precisa de Ajuda?</h2>
            <p className="text-gray-700 mb-4">
              Se você tem dúvidas sobre algum procedimento ou precisa de orientação adicional, entre em contato conosco
              ou procure os órgãos competentes mencionados na cartilha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline">Entrar em Contato</Button>
              <Button variant="outline">Ver Outros Materiais</Button>
            </div>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  )
}
