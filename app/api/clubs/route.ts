import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || undefined;
  const countryid = searchParams.get('countryid') || undefined; // 👉 именно countryid
  const leagueid = searchParams.get('leagueid') || undefined;   // 👉 именно leagueid
  const city = searchParams.get('city') || undefined;
  const foundationYear = searchParams.get('foundationYear') || undefined; // Строка, как в модели!

  const all = searchParams.get('all') === 'true'; // Проверяем флаг "все данные"
  const page = parseInt(searchParams.get('page') || '1');
  const limit = all ? 1000 : parseInt(searchParams.get('limit') || '10'); // Устанавливаем большой лимит, если all=true
  const offset = (page - 1) * limit;

  const filters: any = {};

  // Поиск по названию клуба (clubName)
  if (search) {
    filters.clubName = { contains: search, mode: 'insensitive' };
  }

  // Фильтр по countryid
  if (countryid) {
    filters.countryid = countryid;
  }

  // Фильтр по leagueid
  if (leagueid) {
    filters.leagueid = leagueid;
  }

  // Фильтр по городу
  if (city) {
    filters.city = { contains: city, mode: 'insensitive' };
  }

  // Фильтр по foundationYear (т.к. у тебя он String)
  if (foundationYear) {
    filters.foundationYear = foundationYear;
  }

  try {
    const [clubs, total] = await Promise.all([
      prisma.footballClub.findMany({
        where: filters,
        include: {
          country: true,  // country — имя связи
          league: true,   // league — имя связи
        },
        skip: all ? undefined : offset,
        take: limit,
        orderBy: {
          clubName: 'asc',
        },
      }),

      prisma.footballClub.count({
        where: filters,
      }),
    ]);

    return NextResponse.json({
      clubs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Ошибка при получении клубов:', error);
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 });
  }
}

export const POST = async(request: NextRequest)=> {
    const {clubName,foundationYear,city,country,league} = await request.json()

    const data = await prisma.footballClub.create({data:{
      clubName:clubName,
      foundationYear:foundationYear,
      city:city,
      country:country,
      league:league,
    }})

    return NextResponse.json({data},{status: 200})
    
}