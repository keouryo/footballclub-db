import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


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
        country: true,
        _count: {
          select: {
            footballClubs: true, // Подсчитываем количество футбольных клубов
          },
        },
      },
    })

    // Преобразуем результаты, чтобы добавить поле clubCount
    const formattedLeagues = leagues.map((league) => ({
      ...league,
      clubCount: league._count.footballClubs, // Количество клубов
    }))

    return NextResponse.json(formattedLeagues)
  } catch (error) {
    console.error(error)  // Логируем ошибку для диагностики
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 })
  }
}


export const POST = async(request: NextRequest)=> {
    const { leagueName, leagueLevel, countryid } = await request.json();

const data = await prisma.league.create({
  data: {
    leagueName: leagueName, // Правильно
    leagueLevel: leagueLevel,
    countryid: countryid,   // Правильно
  },
});
    return NextResponse.json({data},{status: 200})
    
}