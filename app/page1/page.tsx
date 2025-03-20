'use client'

import React, { useState, useEffect } from 'react';
import { Input, Select, Pagination, Loader } from '@mantine/core';
import { IconSearch, IconBuildingStadium } from '@tabler/icons-react';
import useClubs from './hooks/useclub';


export default function ClubSearchPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [league, setLeague] = useState('');
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);

  const { clubs, total, loading } = useClubs({
    search,
    country,
    league,
    city,
    year,
    page,
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Поиск по клубу</h1>

      {/* Поисковая панель */}
      <div className="bg-white shadow-lg p-6 rounded-2xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Поиск по клубам..."
            className="flex-1 min-w-[200px]"
            rightSection={<IconSearch className="text-gray-400" />}
            size="md"
          />

          <Select
            placeholder="Выбрать страну"
            value={country}
            onChange={(val) => {
              setPage(1);
              setCountry(val || '');
            }}
            data={[
              { value: 'england', label: 'England' },
              { value: 'spain', label: 'Spain' },
              { value: 'germany', label: 'Germany' },
            ]}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать лигу"
            value={league}
            onChange={(val) => {
              setPage(1);
              setLeague(val || '');
            }}
            data={[
              { value: 'premier-league', label: 'Premier League' },
              { value: 'la-liga', label: 'La Liga' },
              { value: 'bundesliga', label: 'Bundesliga' },
            ]}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать город"
            value={city}
            onChange={(val) => {
              setPage(1);
              setCity(val || '');
            }}
            data={[
              { value: 'manchester', label: 'Manchester' },
              { value: 'madrid', label: 'Madrid' },
              { value: 'munich', label: 'Munich' },
            ]}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать год основания"
            value={year}
            onChange={(val) => {
              setPage(1);
              setYear(val || '');
            }}
            data={[
              { value: '1878', label: '1878' },
              { value: '1902', label: '1902' },
              { value: '1899', label: '1899' },
            ]}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />
        </div>
      </div>

      {/* Результаты поиска */}
      <div className="bg-white shadow-lg p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Результаты поиска</h2>
          <span className="text-sm text-gray-500">Показ 1-{clubs.length} из {total} результатов</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {clubs.map((club) => (
                <div
                  key={club.id}
                  className="flex items-center bg-gray-50 hover:bg-gray-100 transition p-4 rounded-xl shadow-sm"
                >
                  <IconBuildingStadium className="w-12 h-12 text-gray-400 mr-6" />
                  <div>
                    <p className="text-lg font-semibold">{club.name}</p>
                    <p className="text-sm text-gray-600">
                      {club.league} - {club.city}, {club.country} - Est. {club.yearFounded}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Пагинация */}
            <div className="flex justify-center mt-8">
              <Pagination
                total={Math.ceil(total / 10)}

                onChange={setPage}
                size="md"
                radius="xl"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
