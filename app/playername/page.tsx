'use client';

import { Select, Pagination, LoadingOverlay } from '@mantine/core';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { IconPlayFootball } from '@tabler/icons-react';

export default function SearchByPlayer() {
  // Типы данных
  type Player = {
    id: string;
    name: string;
    position: string;
    birthdayDate: string;
    footballClubRelation: {
      clubName: string;
    } | null;
  };

  interface GetPlayer {
    total: number;
    totalPages: number;
    players: Player[];
  }

  interface Filters {
    search: string;
    page: number;
    limit: number;
  }

  const [players, setPlayers] = useState<Player[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    page: 1,
    limit: 10, // Стандартное количество на страницу
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  // Получение всех игроков
  const fetchPlayers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<GetPlayer>('/api/players', {
        params: filters,
      });

      const { players, totalPages } = data;
      setPlayers(players || []);
      setTotalPages(totalPages || 1);
    } catch (error) {
      console.error('Ошибка при получении данных об игроках', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const handleFilterChange = (value: string) => {
    setSelectedPlayer(value);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4">Поиск по игроку</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Select для фильтрации по имени игрока */}
          <Select
            placeholder="Выберите игрока"
            className="flex-1 min-w-[200px]"
            value={selectedPlayer}
            onChange={handleFilterChange}
            data={players.map((player) => ({
              value: player.id,
              label: player.name,
            }))}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          {loading ? (
            <LoadingOverlay visible={loading} />
          ) : selectedPlayer ? (
            // Отображаем информацию о выбранном игроке
            players
              .filter((player) => player.id === selectedPlayer)
              .map((player) => (
                <div key={player.id} className="flex items-center p-6 bg-white shadow-md rounded-lg">
                 <IconPlayFootball/> <p className="text-lg font-bold">{player.name || 'Имя не указано'}</p>
                    <p className="text-lg ml-2">
                    | Позиция: {player.position || 'Не указана'} | Год рождения: {player.birthdayDate || 'Не указан'} | Клуб: {player.footballClubRelation?.clubName || 'Не указан'}

                    </p>

                </div>
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Выберите игрока для отображения информации
            </div>
          )}
        </div>
      </div>

      {/* Пагинация для списка игроков */}
      <div className="flex justify-center mt-4">
        <Pagination
          total={1}
          value={filters.page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
