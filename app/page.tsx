'use client'

import { PieChart } from "@mantine/charts";
import { Button, Table, Title } from "@mantine/core";
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
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import React from "react";

// --- Типы данных ---
// Страна и связанные с ней данные
export interface CountryData {
  countryName: string;
  _count: {
    footballClubs: number;
    leagues: number;
  };
  leagues: LeagueData[];
}

// Лига и связанные с ней данные
export interface LeagueData {
  leagueName: string;
  _count: {
    footballClubs: number;
  };
}

// Статистика по игрокам
export interface PlayersStats {
  _count: {
    id: number;
  };
}

// Молодой игрок
export interface YoungestPlayer {
  name: string;
  birthdayDate: string;
}

// Молодой клуб
export interface YoungestClub {
  clubName: string;
  foundationYear: string;
}

// Матч с последней датой или наибольшим счётом
export interface MatchInfo {
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
  scoreHomeAway: string;
  matchDate: string;
}

// Итоговый тип ответа сервера
export interface StatisticsResponse {
  countriesData: CountryData[];
  playersStats: PlayersStats;
  totalLeagues: number;
  youngestPlayer: YoungestPlayer | null;
  youngestClub: YoungestClub | null;
  latestMatch: MatchInfo | null;
  highestScoreMatch: MatchInfo | null;
}

// --- Компонент ---
const Home: React.FC = () => {

  const { data: response }: UseQueryResult<StatisticsResponse> = useQuery({
    queryKey: ['getstatistics'],
    queryFn: async (): Promise<StatisticsResponse> => {
      const res = await fetch('/api/statistics');
      if (!res.ok) throw new Error("Ошибка загрузки статистики");
      return res.json();
    },
  });

  if (!response) return <div>Loading...</div>;

  const {
    countriesData,
    playersStats,
    totalLeagues,
    youngestPlayer,
    youngestClub,
    latestMatch,
    highestScoreMatch
  } = response;

  // Таблица стран
  const countryRows = countriesData.map((item: CountryData) => (
    <Table.Tr key={item.countryName}>
      <Table.Td className="font-medium">{item.countryName}</Table.Td>
      <Table.Td>{item._count.footballClubs}</Table.Td>
    </Table.Tr>
  ));

  // Таблица лиг
  const leagueRows = countriesData.flatMap((item: CountryData) =>
    item.leagues.map((league: LeagueData) => (
      <Table.Tr key={league.leagueName}>
        <Table.Td className="font-medium">{league.leagueName}</Table.Td>
        <Table.Td>{league._count.footballClubs}</Table.Td>
      </Table.Tr>
    ))
  );

  return (
    <div className="pt-5 pl-4">
      {/* Заголовок */}
      <div className="text-2xl flex justify-center">
        <h1>Статистика по клубам и лигам:</h1>
      </div>

      {/* Блок статистики по странам и лигам */}
      <div className="flex justify-center mt-8">
        {/* Таблица со странами */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md h-auto">
          <div className="flex items-center mb-6">
            <IconFlag />
            <Title order={3} className="ml-2">
              Статистика по странам:
            </Title>
          </div>

          <Table striped highlightOnHover withTableBorder withColumnBorders >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Страна</Table.Th>
                <Table.Th>Количество клубов</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{countryRows}</Table.Tbody>
          </Table>
        </div>

        {/* Таблица с лигами */}
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-md ml-4">
          <div className="flex items-center mb-4">
            <IconTrophy className="mr-2" />
            <Title order={3} className="ml-2">
              Статистика по лигам:
            </Title>
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
            <h2 className="text-3xl">{playersStats._count.id}</h2>
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
            <h2 className="text-3xl">{totalLeagues}</h2>
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
          {/* Самый молодой игрок */}
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <p className="ml-2 text-2xl text-center">Самый молодой игрок</p>
            <div className="flex items-center">
              <IconBabyCarriageFilled className="size-10" />
              <div>
                <p className="text-lg">{youngestPlayer?.name}</p>
                <div>
                  <p className="text-lg">{youngestPlayer?.birthdayDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Самый молодой клуб */}
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Самый молодой клуб</h2>
            <div className="flex items-center">
              <IconShieldHalfFilled className="size-10" />
              <div>
                <p className="text-lg">{youngestClub?.clubName}</p>
                <div>
                  <p className="text-lg">{youngestClub?.foundationYear}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Последний матч */}
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Последний матч</h2>
            <div className="flex items-center">
              <IconSoccerField className="size-10" />
              <div>
                <p className="text-lg">
                  {latestMatch?.homeClub.clubName} vs {latestMatch?.awayClub.clubName}
                </p>
                <div>
                  <p className="text-lg">{latestMatch?.scoreHomeAway} ({latestMatch?.matchDate})</p>
                </div>
              </div>
            </div>
          </div>

          {/* Наибольший счет */}
          <div className="p-4 bg-white rounded-lg shadow-md mr-4 w-1/4">
            <h2 className="text-2xl text-center">Наибольший счет</h2>
            <div className="flex items-center">
              <IconScoreboard className="size-10" />
              <div>
                <p className="text-lg">
                  {highestScoreMatch?.homeClub.clubName} vs {highestScoreMatch?.awayClub.clubName}
                </p>
                <div>
                  <p className="text-lg">{highestScoreMatch?.scoreHomeAway} ({highestScoreMatch?.matchDate})</p>
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
