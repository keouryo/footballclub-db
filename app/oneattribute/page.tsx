'use client';

import { Button, Input, Pagination, Select } from '@mantine/core';
import { IconBuildingStadium, IconSearch } from '@tabler/icons-react';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function SearchByMatch() {
  // Типы данных
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

  interface League {
    id: string;
    leagueName: string;
  }

  interface Club {
    id: string;
    clubName: string;
  }

  interface GetMatch {
    total: number;
    totalPages: number;
    matches: Match[];
  }

  interface Filters {
    search: string;
    leagueid: string | null;
    season: string | null;
    homeClubId: string | null;
    page: number;
  }

  const [seasons, setSeasons] = useState<string[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const [filters, setFilters] = useState<Filters>({
    search: '',
    leagueid: '',
    season: '',
    homeClubId: '',
    page: 1,
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Получение матчей
  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<GetMatch>('/api/matches', {
        params: filters,
      });

      const { matches, totalPages, total } = data;
      setMatches(matches || []);
      setTotalPages(totalPages || 1);
      setTotal(total || 0);

      // Лиги
      setLeagues(prev => [
        ...prev,
        ...Array.from(new Map(
          matches.filter((match) => match.league)
                 .map((match) => [match.league!.id, match.league!])
        ).values())
      ]);

      // Убираем дубликаты перед обновлением состояния клубов
setClubs((prev) => {
    const allClubs = [...prev, ...matches
      .filter((match) => match.homeClub)
      .map((match) => match.homeClub!)
    ];
  
    const uniqueClubs = Array.from(
      new Map(allClubs.map((club) => [club.id, club])).values()
    );
  
    return uniqueClubs;
  });
      // Сезоны
      setSeasons(prev => [
        ...prev,
        ...Array.from(new Set(matches.map((match) => match.season)))
      ]);
    } catch (error) {
      console.error('Ошибка при получении матчей', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleFilterChange = (
    key: keyof Filters,
    value: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4">Поиск по матчу</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <Select
            placeholder="Выбрать домашнюю команду"
            className="flex-1 min-w-[200px]"
            value={filters.homeClubId}
            onChange={(val) => handleFilterChange('homeClubId', val || '')}
            data={clubs.map((c) => ({
              value: c.id,
              label: c.clubName,
            }))}

          />
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Загрузка матчей...</div>
          ) : (
            <div className="space-y-6">
              {matches.map((match) => (
                <div key={match.id} className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg">
                  <div className="w-1/4 text-left space-y-2">
                    <p className="text-lg font-medium">
                      {match.league?.leagueName || 'Лига не указана'}
                    </p>
                    <p className="text-md font-medium">Сезон: {match.season}</p>
                  </div>
                  <div className="flex flex-col items-center w-2/4 text-center space-y-2">
                    <div className="flex items-center justify-center space-x-6">
                      <p className="text-xl font-bold">{match.homeClub?.clubName || 'Home Team'}</p>
                      <span className="text-xl font-bold">{match.scoreHomeAway}</span>
                      <p className="text-xl font-bold">{match.awayClub?.clubName || 'Away Team'}</p>
                    </div>
                    <p className="text-md">{match.matchDate}</p>
                  </div>
                  <div className="w-1/4 flex justify-end">
                    <IconBuildingStadium className="size-12 opacity-50" />
                  </div>
                </div>
              ))}

              <div className="flex justify-center mt-4">
                <Pagination total={totalPages} value={filters.page} onChange={(page) => setFilters((prev) => ({ ...prev, page }))} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}