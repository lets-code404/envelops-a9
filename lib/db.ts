import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query"] : [],
    })
  }
  return globalForPrisma.prisma
}

// Use a Proxy to lazily initialize PrismaClient only when a method is actually called
const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient()
    const value = client[prop as keyof PrismaClient]
    if (typeof value === "function") {
      return value.bind(client)
    }
    return value
  },
})

export default prisma
