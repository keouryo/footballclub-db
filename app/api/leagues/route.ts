import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const search = searchParams.get('search') || undefined
  const leagueId = searchParams.get('leagueId') || undefined
  const leagueLevel = searchParams.get('leagueLevel') || undefined
  const countryId = searchParams.get('countryId') || undefined
  const continent = searchParams.get('continent') || undefined

  const filters: any = {}

  if (search) {
    filters.leagueName = { contains: search, mode: 'insensitive' }
  }

  if (leagueId) {
    filters.id = (leagueId)
  }

  if (leagueLevel) {
    filters.leagueLevel = (leagueLevel)  // Убедитесь, что это число
  }

  if (countryId || continent) {
    filters.country = {}

    if (countryId) {
      filters.country.id = countryId  // Строка из URL, не нужно приводить к числу
    }

    if (continent) {
      filters.country.continent = continent
    }
  }

  try {
    const leagues = await prisma.league.findMany({
      where: filters,
      include: {
        country: true
      }
    })

    return NextResponse.json(leagues)
  } catch (error) {
    console.error(error)  // Логируем ошибку для диагностики
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 })
  }
}
