// lib/db.js
const { PrismaClient } = require('@prisma/client')

let prisma

try {
  prisma = new PrismaClient()
} catch (error) {
  console.error("Failed to create Prisma Client:", error)
  process.exit(1)
}

module.exports = { prisma }