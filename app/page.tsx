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
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export interface CountryData {
  countryName: string;
  _count: {
    footballClubs: number;
    leagues: number;
  };
  leagues: LeagueData[];
}


export interface LeagueData {
  leagueName: string;
  _count: {
    footballClubs: number;
  };
}


export interface PlayersStats {
  _count: {
    id: number;
  };
}


export interface YoungestPlayer {
  name: string;
  birthdayDate: string;
}


export interface YoungestClub {
  clubName: string;
  foundationYear: string;
}


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


export interface StatisticsResponse {
  countriesData: CountryData[];
  playersStats: PlayersStats;
  totalLeagues: number;
  youngestPlayer: YoungestPlayer | null;
  youngestClub: YoungestClub | null;
  latestMatch: MatchInfo | null;
  highestScoreMatch: MatchInfo | null;
}


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


const filteredCountries = countriesData
  .filter(c => c._count.footballClubs > 0)
  .sort((a, b) => b._count.footballClubs - a._count.footballClubs);

const countryChartData = {
  labels: filteredCountries.map(c => c.countryName),
  datasets: [
    {
      label: "Количество клубов",
      data: filteredCountries.map(c => c._count.footballClubs),
      backgroundColor: [
        "#4ade80",
        "#60a5fa",
        "#fbbf24",
        "#f87171",
        "#a78bfa",
        "#34d399",
        "#f472b6",
        "#38bdf8",
      ],
    },
  ],
};


const leagueData = countriesData.flatMap(c => 
  c.leagues.map(l => ({
    leagueName: l.leagueName,
    footballClubs: l._count.footballClubs,
  }))
);


const filteredLeagues = leagueData
  .filter(l => l.footballClubs > 0)
  .sort((a, b) => b.footballClubs - a.footballClubs);

const leagueChartData = {
  labels: filteredLeagues.map(l => l.leagueName),
  datasets: [
    {
      label: "Клубов в лиге",
      data: filteredLeagues.map(l => l.footballClubs),
      backgroundColor: "#60a5fa",
    },
  ],
};


  return (
    <div className="pt-5 pl-4">
      <div className="text-2xl flex justify-center">
        <h1>Статистика по клубам и лигам</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="w-full md:w-[45%] bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <IconFlag className="text-green-500 mr-2" />
            <h2 className="text-xl font-semibold">Распределение клубов по странам</h2>
          </div>
          <Pie data={countryChartData} width={150} height={150} />
        </div>

        <div className="w-full md:w-[45%] bg-white rounded-2xl shadow-lg p-6 ">
          <div className="flex items-center mb-4">
            <IconTrophy className="text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Клубы по лигам</h2>
          </div>
          <Bar data={leagueChartData} height={300} />
        </div>
      </div>

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
                <p className="text-lg">{youngestPlayer?.name}</p>
                <div>
                  <p className="text-lg">{youngestPlayer?.birthdayDate}</p>
                </div>
              </div>
            </div>
          </div>

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
