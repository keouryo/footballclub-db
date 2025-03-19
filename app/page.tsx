'use client'
import { PieChart } from "@mantine/charts";
import { Button, Table,Title } from "@mantine/core";
import {
  IconBabyCarriageFilled,
  IconBellHeart,
  IconCalendarFilled,
  IconFlag,
  IconScoreboard,
  IconShieldHalfFilled,
  IconShirtSport,
  IconSoccerField,
  IconTrophy,
  IconUsers,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

// Определяем тип для компонента (в данном случае пропсов нет)
const Home: React.FC = () => {
  const {data:response} = useQuery({queryKey:['getstatistics'],queryFn:() => {
    return fetch('/api/statistics').then(res => res.json())
  }})
  console.log(response)

  const data =
  response?.data.map(item => ({
    label: item.countryName,
    league: item.leagueName,
    value: item._count.footballClubs,
  })) ?? [];
   // Преобразование данных для второй таблицы (лиги)
   const leagueData =
   response?.data.flatMap(item =>
     item.leagues.map(league => ({
       label: league.leagueName,
       value: league._count.footballClubs,
     }))
   ) ?? [];

 // Генерация строк для таблицы со странами
 const countryRows = data.map((item) => (
   <Table.Tr key={item.label}>
     <Table.Td className="font-medium">{item.label}</Table.Td>
     <Table.Td>{item.value}</Table.Td>
   </Table.Tr>
 ));

 // Генерация строк для таблицы с лигами
 const leagueRows = leagueData.map((item) => (
   <Table.Tr key={item.label}>
     <Table.Td className="font-medium">{item.label}</Table.Td>
     <Table.Td>{item.value}</Table.Td>
   </Table.Tr>
 ));

  return (
    
    <div className="pt-5 pl-4">
      {/* Заголовок */}
      <div className="text-2xl flex justify-center">
        <h1>Статистика по клубам и лигам:</h1>
      </div>

      {/* Блок статистики по странам и лигам */}
      <div className="flex justify-center mt-8">
      <div className="w-1/2 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <IconFlag />
          <Title order={3} className="ml-2">
            Статистика по странам:
          </Title>
        </div>

        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Страна</Table.Th>
              <Table.Th>Количество клубов</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{countryRows}</Table.Tbody>
        </Table>
      </div>

        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md ml-4">
          <div className="flex items-center mb-4">
            <IconTrophy className="mr-2" />
            <h2 className="text-xl">Статистика по лигам:</h2>
          </div>
          <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Лига</Table.Th>
                <Table.Th>Количество клубов</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{leagueRows}</Table.Tbody>
          </Table>
        </div>
      </div>

      {/* Блок статистики по игрокам */}
      <div className="text-2xl ml-5 mt-5 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <IconShirtSport className="mr-2" />
          <h1>Статистика по игрокам</h1>
        </div>
        <div className="flex justify-between">
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/3">
            <h2 className="text-3xl">12</h2>
            <div className="flex items-center">
              <IconUsers />
              <p className="ml-2 text-lg">Количество игроков</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/3">
            <h2 className="text-3xl">27.5</h2>
            <div className="flex items-center">
              <IconCalendarFilled />
              <p className="ml-2 text-lg">Средний возраст</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/3">
            <h2 className="text-3xl">12</h2>
            <div className="flex items-center">
              <IconTrophy />
              <p className="ml-2 text-lg">Количество лиг</p>
            </div>
          </div>
        </div>
      </div>

      {/* Блок ключевой информации */}
      <div className="text-2xl ml-5 mt-5 bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <IconBellHeart className="mr-2" />
          <h1>Ключевая информация</h1>
        </div>
        <div className="flex justify-between">
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <p className="ml-2 text-2xl text-center">Самый молодой игрок</p>
            <div className="flex items-center">
              <IconBabyCarriageFilled className="size-10" />
              <div>
                <p className="text-lg">Kobbie Mainoo</p>
                <div>
                  <p className="text-lg">2003</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Самый молодой клуб</h2>
            <div className="flex items-center">
              <IconShieldHalfFilled className="size-10" />
              <div>
                <p className="text-lg">RB Leipzig</p>
                <div>
                  <p className="text-lg">2006</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Последний матч</h2>
            <div className="flex items-center">
              <IconSoccerField className="size-10" />
              <div>
                <p className="text-lg">Liverpool vs Arsenal</p>
                <div>
                  <p className="text-lg">2-2(16.03.2025)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Наибольший счет</h2>
            <div className="flex items-center">
              <IconScoreboard className="size-10" />
              <div>
                <p className="text-lg">Barcelona vs Real Madrid</p>
                <div>
                  <p className="text-lg">5-1 (16.02.2025)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;