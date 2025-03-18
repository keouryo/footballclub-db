
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async() => {
    const data = await prisma.country.findMany({select:{countryName:true,_count:{select:{footballClubs:true}}} })
    return NextResponse.json({
        data
    }) 
}