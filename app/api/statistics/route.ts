
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async() => {
    const countriesData = await prisma.country.findMany({
        select: {
          countryName: true,
          _count: {
            select: {
              footballClubs: true, // Количество футбольных клубов в стране
              leagues: true,       // Количество лиг в стране
            },
          },
          leagues: {
            select: {
              leagueName: true,
              _count: {
                select: {
                  footballClubs: true, // Количество футбольных клубов в лиге
                },
              },
            },
          },
        },
      })
      
          // Получение статистики по игрокам
    const playersStats = await prisma.player.aggregate({
      _count: {
        id: true,
      },
    });

    // Получение количества лиг
    const totalLeagues = await prisma.league.count();

    // Получение самого молодого игрока
    const youngestPlayer = await prisma.player.findFirst({
      orderBy: {
        birthdayDate: 'desc',
      },
      select: {
        name: true,
        birthdayDate: true,
      },
    });

    // Получение самого молодого клуба
    const youngestClub = await prisma.footballClub.findFirst({
      orderBy: {
        foundationYear: 'desc',
      },
      select: {
        clubName: true,
        foundationYear: true,
      },
    });

    // Получение последнего матча
    const latestMatch = await prisma.match.findFirst({
      orderBy: {
        matchDate: 'desc',
      },
      select: {
        homeClub: {
          select: {
            clubName: true,
          },
        },
        awayClub: {
          select: {
            clubName: true,
          },
        },
        scoreHomeAway: true,
        matchDate: true,
      },
    });

    // Получение матча с наибольшим счетом
    const highestScoreMatch = await prisma.match.findFirst({
      orderBy: {
        scoreHomeAway: 'desc',
      },
      select: {
        homeClub: {
          select: {
            clubName: true,
          },
        },
        awayClub: {
          select: {
            clubName: true,
          },
        },
        scoreHomeAway: true,
        matchDate: true,
      },
    })
      ;
      return NextResponse.json({
        countriesData,
      playersStats,
      totalLeagues,
      youngestPlayer,
      youngestClub,
      latestMatch,
      highestScoreMatch,
      });
}