import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    })
  }
  prisma = global.prisma
}

// Verificar a conexão com o banco de dados
prisma.$connect()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso')
  })
  .catch((error: Error) => {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message)
  })

export { prisma } 