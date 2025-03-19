
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async() => {
    const data = await prisma.country.findMany({
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
      });
      return NextResponse.json({
        data,
      });
}