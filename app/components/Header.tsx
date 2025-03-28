'use client'
import prisma from "@/lib/prisma"
import { Button, Popover, Select, Menu} from "@mantine/core"
import {IconBallFootball, IconChartBarPopular, IconInputSearch, IconTablePlus} from "@tabler/icons-react"
import Link from "next/link"
import React from "react"

export default function Header(){
    return(
    <header className="text-2xl pt-4 pl-5 pr-5 pb-4">
        <div className="flex items-center ">
        <IconBallFootball/> 
            <div className="flex-auto ">
            <h1>Футбольная база данных</h1>
            </div>
            <div>
                <Button component={Link} href={"/"} variant="white" color="#171717" rightSection= {<IconChartBarPopular/>}>Статистика</Button>
            </div>
            <div>
            <Menu shadow="md" width={200}>
            {/* Кнопка, которая открывает меню */}
            <Menu.Target>
                <Button 
                    
                    variant="white" 
                    color="#171717" 
                    rightSection={<IconChartBarPopular />}
                >
                    Поиск
                </Button>
            </Menu.Target>

            {/* Выпадающее меню */}
            <Menu.Dropdown>
                {/* Элементы меню */}
                {/* <Menu.Item component={Link} href={'/page1'}>
                Поиск клуба по атрибутам
                </Menu.Item>
                <Menu.Item component={Link} href={'/searchbyleague'}>
                Поиск по лиге
                </Menu.Item>
                <Menu.Item component={Link} href={'/searchbymatch'}>
                Поиск по матчу
                </Menu.Item> */}
                <Menu.Item component={Link} href={'/twoattributes'}>
                Поиск по двум атрибутам
                </Menu.Item>
                <Menu.Item component={Link} href={'/oneattribute'}>
                Поиск по одному атрибуту
                </Menu.Item>
                <Menu.Item component={Link} href={'/playername'}>
                Поиск по имени игрока
                </Menu.Item>
                <Menu.Item component={Link} href={'/foundationyear'}>
                Поиск по году создания
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
            </div>
            <div>
                <Button component= {Link} href={"/page2"} variant="white" color="#171717" rightSection= {<IconTablePlus/>}> Добавить </Button>
            </div>
        </div>

    </header>
    )
}