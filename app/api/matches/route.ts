
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || undefined;
  const leagueid = searchParams.get('leagueid') || undefined;
  const season = searchParams.get('season') || undefined;
  const homeClubId = searchParams.get('homeClubId') || undefined;
  const awayClubId = searchParams.get('awayClubId') || undefined;
  const matchDate = searchParams.get('matchDate') || undefined;

  // Pagination
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  const filters: any = {};

  // Search by match name (match between teams, example "Manchester United vs Liverpool")
  if (search) {
    filters.matchName = { contains: search, mode: 'insensitive' }; // Assuming you have a matchName field
  }

  // Filter by league
  if (leagueid) {
    filters.idLeague = leagueid;
  }

  // Filter by season
  if (season) {
    filters.season = season;
  }

  // Filter by home club
  if (homeClubId) {
    filters.idHomeClub = homeClubId;
  }

  // Filter by away club
  if (awayClubId) {
    filters.idAwayClub = awayClubId;
  }

  // Filter by match date
  if (matchDate) {
    filters.matchDate = matchDate;
  }

  try {
    const [matches, total] = await Promise.all([
      prisma.match.findMany({
        where: filters,
        include: {
          league: true,         // include league data
          homeClub: true,       // include home club data
          awayClub: true,       // include away club data
        },
        skip: offset,
        take: limit,
        orderBy: {
          matchDate: 'desc',  // Sort by match date (desc or asc)
        },
      }),

      prisma.match.count({
        where: filters,
      }),
    ]);

    return NextResponse.json({
      matches,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const POST = async(request: NextRequest)=> {
    const {idLeague,season,idHomeClub,idAwayClub,matchDate,scoreHomeAway} = await request.json()
 
    const data = await prisma.match.create({data:{
    season: season,
    matchDate: matchDate,
    scoreHomeAway: scoreHomeAway, 
    idHomeClub: idHomeClub,
    idAwayClub: idAwayClub,
    idLeague: idLeague,
    }})

    return NextResponse.json({data},{status: 200})
    
}
export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Не передан параметр id' },
        { status: 400 }
      );
    }

    // Проверяем, существует ли такой клуб
    const existingmatch = await prisma.match.findUnique({
      where: { id },
    });

    if (!existingmatch) {
      return NextResponse.json(
        { error: 'Матч не найден' },
        { status: 404 }
      );
    }

    // Удаляем клуб
    await prisma.match.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Матч успешно удалён', id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при удалении матча:', error);
    return NextResponse.json(
      { error: 'Ошибка на сервере' },
      { status: 500 }
    );
  }
};