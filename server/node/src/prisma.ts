import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit()
})

export default prisma
