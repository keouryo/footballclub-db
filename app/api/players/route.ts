import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Получение всех игроков с фильтрацией и пагинацией
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search') || '';
    const clubId = searchParams.get('clubId') || '';

    // Пагинация
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    const filters: any = {};

    // Поиск по имени игрока
    if (search) {
      filters.name = { contains: search, mode: 'insensitive' };
    }

    // Фильтр по клубу
    if (clubId) {
      filters.clubId = clubId;
    }

    // Получаем игроков с учетом пагинации
    const players = await prisma.player.findMany({
      where: filters,
      include: {
        footballClubRelation: true, // Включаем данные о клубе игрока
      },
      skip: offset,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });

    // Получаем общее количество игроков
    const total = await prisma.player.count({
      where: filters,
    });

    // Рассчитываем общее количество страниц
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      players,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error('Ошибка при получении данных об игроках:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
