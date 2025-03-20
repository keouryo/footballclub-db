import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get('search') || undefined;
  const countryid = searchParams.get('countryid') || undefined; // 👉 именно countryid
  const leagueid = searchParams.get('leagueid') || undefined;   // 👉 именно leagueid
  const city = searchParams.get('city') || undefined;
  const foundationYear = searchParams.get('foundationYear') || undefined; // Строка, как в модели!

  // Пагинация
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
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
        skip: offset,
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
