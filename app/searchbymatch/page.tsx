'use client'

import { Button, Input, Pagination, Select } from "@mantine/core";
import { IconBuildingStadium, IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Seachbymatch() {
  type Match = {
    id: string;
    season: string;
    league: {
      id: string;
      leagueName: string;
    } | null;
    homeClub: {
      id: string;
      clubName: string;
    } | null;
    awayClub: {
      id: string;
      clubName: string;
    } | null;
    scoreHomeAway: string;
    matchDate: string;
  };

  interface GetMatch{
    total:number,
    totalPages:number,
    matches:Match[],
  }
  const [matches, setMatches] = useState<Match[]>([]);
  
  const [leagues, setLeagues] = useState<string[]>([]);
  const [clubs, setClubs] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    leagueid: '',
    season: '',
    homeClubId: '',
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Запрос матчей
  const fetchMatches = async () => {
    try {
      const { data } = await axios.get<GetMatch>(`/api/matches`, { params: filters });
      setMatches(data.matches || []);
      setTotalPages(data.totalPages);
      setTotal(data.total);

      // Извлекаем уникальные лиги и клубы из данных матчей
      const leaguesData = Array.from(new Set(data.matches.map((match: any) => match.league?.id)))
        .map(id => data.matches.find((match: any) => match.league?.id === id)?.league)
        .filter((item: any) => item);
      setLeagues(leaguesData);

      const clubsData = Array.from(new Set([
        ...data.matches.map((match: any) => match.homeClub),
        ...data.matches.map((match: any) => match.awayClub),
      ])).filter((item: any) => item);
      setClubs(clubsData);

      const seasonsData = Array.from(new Set(data.matches.map((match: any) => match.season)));
      setSeasons(seasonsData);

    } catch (error) {
      console.error("Ошибка при получении матчей", error);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [filters]);

  const uniqueClubs = Array.from(
    new Map(clubs.map((club: any) => [club.id, club])).values()
  );

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1, // всегда сбрасываем на первую страницу при изменении фильтра
    }));
  };
  console.log(uniqueClubs )
  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4">Поиск по матчу</h1>

      {/* Панель фильтров */}
      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center gap-4">
          <Input
            leftSection={<IconSearch />}
            placeholder="Введите название матча..."
            className="w-1/3 mr-2"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />

          <Select
            placeholder="Выбрать сезон"
            className="flex-1 min-w-[200px]"
            value={filters.season}
            onChange={(val) => handleFilterChange("season", val || "")}
            data={seasons.map((s) => ({ value: s, label: s }))}
            clearable
          />

          <Select
            placeholder="Выбрать лигу"
            className="flex-1 min-w-[200px]"
            value={filters.leagueid}
            onChange={(val) => handleFilterChange("leagueid", val || "")}
            data={leagues.map((l: any) => ({ value: l.id, label: l.leagueName }))}
            clearable
          />

<Select
  placeholder="Выбрать домашнюю команду"
  className="flex-1 min-w-[200px]"
  value={filters.homeClubId}
  onChange={(val) => handleFilterChange("homeClubId", val || "")}
  data={uniqueClubs.map((c: any) => ({
    value: c.id,
    label: c.clubName,
  }))}
  clearable
/>
        </div>
      </div>

      {/* Блок результатов */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Результаты поиска</h1>
            <p className="text-sm font-extralight">
              Показ {matches.length} из {total} результатов
            </p>
          </div>

          <div className="space-y-6">
            {matches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg"
              >
                {/* Блок лиги и сезона */}
                <div className="w-1/4 text-left space-y-2">
                  <p className="text-lg font-medium">{match.league?.leagueName || "Лига не указана"}</p>
                  <p className="text-md font-medium">Сезон: {match.season}</p>
                </div>

                {/* Блок матча */}
                <div className="flex flex-col items-center w-2/4 text-center space-y-2">
                  <div className="flex items-center justify-center space-x-6">
                    <p className="text-xl font-bold">{match.homeClub?.clubName || "Home Team"}</p>
                    <span className="text-xl font-bold">{match.scoreHomeAway}</span>
                    <p className="text-xl font-bold">{match.awayClub?.clubName || "Away Team"}</p>
                  </div>
                  <p className="text-md">{match.matchDate}</p>
                  <p className="text-md">Домашняя команда: {match.homeClub?.clubName || "-"}</p>
                </div>

                {/* Иконка стадиона */}
                <div className="w-1/4 flex justify-end">
                  <IconBuildingStadium className="size-12 opacity-50" />
                </div>
              </div>
            ))}

            {/* Пагинация */}
            <div className="flex justify-center mt-4">
              <Pagination
                total={totalPages}
                value={filters.page}
                onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
