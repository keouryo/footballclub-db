import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET() {
  try {
    const countries = await prisma.country.findMany()
    return NextResponse.json(countries)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при получении стран' }, { status: 500 })
  }
}

  
export const POST = async(request: NextRequest)=> {
    const {countryName,countryCodeShort,continent} = await request.json()

    const data = await prisma.country.create({data:{
      countryName:countryName,
      countryCodeShort: countryCodeShort,
      continent: continent,
    }})

    return NextResponse.json({data},{status: 200})
    
}