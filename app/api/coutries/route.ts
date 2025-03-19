import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const countries = await prisma.country.findMany()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при получении стран' }, { status: 500 })
  }
}
