'use client';

import React, { useState, useEffect } from 'react';
import { Input, Select, Pagination, Loader, Button } from '@mantine/core';
import { IconSearch, IconBuildingStadium } from '@tabler/icons-react';

// Типы для данных
type Country = {
  id: string;
  countryName: string;
};

type League = {
  id: string;
  leagueName: string;
};

type City = string;

type Club = {
  id: string;
  clubName: string;
  foundationYear: string;
  city: string;
  country: Country;
  league: League;
};

export default function ClubSearchPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [league, setLeague] = useState('');
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    search: '',
    countryid: '',
    leagueid: '',
    city: '',
    foundationYear: '',
    page: 1,
  });

  const [clubs, setClubs] = useState<Club[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [years, setYears] = useState<string[]>([]);

  // =============================
  // Загрузка справочников стран и лиг (начальный список)
  useEffect(() => {
    fetchCountries();
    fetchLeagues();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/coutries');
      let data = await res.json();

      // Сортируем по алфавиту
      data.sort((a: Country, b: Country) => a.countryName.localeCompare(b.countryName));
      setCountries(data);
    } catch (err) {
      console.error('Ошибка загрузки стран:', err);
    }
  };

  const fetchLeagues = async () => {
    try {
      const res = await fetch('/api/leagues');
      let data = await res.json();

      // Сортируем по алфавиту
      data.sort((a: League, b: League) => a.leagueName.localeCompare(b.leagueName));
      setLeagues(data);
    } catch (err) {
      console.error('Ошибка загрузки лиг:', err);
    }
  };

  // =============================
  // Основная функция загрузки клубов + обновление фильтров
  const updateFiltersAndClubs = async (updatedFilters: any) => {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        ...(updatedFilters.search && { search: updatedFilters.search }),
        ...(updatedFilters.countryid && { countryid: updatedFilters.countryid }),
        ...(updatedFilters.leagueid && { leagueid: updatedFilters.leagueid }),
        ...(updatedFilters.city && { city: updatedFilters.city }),
        ...(updatedFilters.foundationYear && { foundationYear: updatedFilters.foundationYear }),
        page: updatedFilters.page?.toString() || '1',
        limit: '10',
      });

      const res = await fetch(`/api/clubs?${params.toString()}`);
      const data = await res.json();

      const clubsData: Club[] = data.clubs || [];

      setClubs(clubsData);
      setTotal(data.total || 0);

      // Уникальные страны из результата клубов
      const uniqueCountries = Array.from(
        new Set(clubsData.map((club) => club.country?.id).filter(Boolean))
      )
        .map((id) => countries.find((c) => c.id === id))
        .filter(Boolean) as Country[];

      uniqueCountries.sort((a, b) => a.countryName.localeCompare(b.countryName));
      setCountries(uniqueCountries);

      // Уникальные лиги из результата клубов
      const uniqueLeagues = Array.from(
        new Set(clubsData.map((club) => club.league?.id).filter(Boolean))
      )
        .map((id) => leagues.find((l) => l.id === id))
        .filter(Boolean) as League[];

      uniqueLeagues.sort((a, b) => a.leagueName.localeCompare(b.leagueName));
      setLeagues(uniqueLeagues);

      // Уникальные города (алфавит)
      const uniqueCities = Array.from(
        new Set(clubsData.map((club) => club.city).filter(Boolean))
      ).sort((a, b) => a.localeCompare(b));
      setCities(uniqueCities);

      // Уникальные года основания (по возрастанию чисел)
      const uniqueYears = Array.from(
        new Set(clubsData.map((club) => club.foundationYear).filter(Boolean))
      ).sort((a, b) => Number(a) - Number(b));
      setYears(uniqueYears);
    } catch (err) {
      console.error('Ошибка обновления фильтров и клубов:', err);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Хендлеры изменения фильтров
  const handleLeagueChange = (val: string | null) => {
    const newLeague = val || '';
    setLeague(newLeague);

    const updatedFilters = {
      ...filters,
      leagueid: newLeague,
      countryid: '',
      city: '',
      foundationYear: '',
      page: 1,
    };

    setCountry('');
    setCity('');
    setYear('');

    setFilters(updatedFilters);
    updateFiltersAndClubs(updatedFilters);
  };

  const handleCountryChange = (val: string | null) => {
    const newCountry = val || '';
    setCountry(newCountry);

    const updatedFilters = {
      ...filters,
      countryid: newCountry,
      city: '',
      foundationYear: '',
      page: 1,
    };

    setCity('');
    setYear('');

    setFilters(updatedFilters);
    updateFiltersAndClubs(updatedFilters);
  };

  const handleCityChange = (val: string | null) => {
    const newCity = val || '';
    setCity(newCity);

    const updatedFilters = {
      ...filters,
      city: newCity,
      foundationYear: '',
      page: 1,
    };

    setYear('');

    setFilters(updatedFilters);
    updateFiltersAndClubs(updatedFilters);
  };

  const handleYearChange = (val: string | null) => {
    const newYear = val || '';
    setYear(newYear);

    const updatedFilters = {
      ...filters,
      foundationYear: newYear,
      page: 1,
    };

    setFilters(updatedFilters);
    updateFiltersAndClubs(updatedFilters);
  };

  const handleSearchClick = () => {
    const updatedFilters = {
      ...filters,
      search,
      page: 1,
    };

    setFilters(updatedFilters);
    updateFiltersAndClubs(updatedFilters);
  };

  // =============================
  // Преобразуем справочники для Select
  const countryOptions = countries
    .map((c) => ({
      value: c.id,
      label: c.countryName,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const leagueOptions = leagues
    .map((l) => ({
      value: l.id,
      label: l.leagueName,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const cityOptions = cities
    .map((cityName) => ({
      value: cityName,
      label: cityName,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const yearOptions = years
    .map((year) => ({
      value: year,
      label: year,
    }))
    .sort((a, b) => Number(a.value) - Number(b.value));

  const areFiltersEmpty =
    !filters.search &&
    !filters.countryid &&
    !filters.leagueid &&
    !filters.city &&
    !filters.foundationYear;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Поиск по клубу</h1>

      {/* Панель фильтров */}
      <div className="bg-white shadow-lg p-6 rounded-2xl mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по клубам..."
            className="flex-1 min-w-[200px]"
            rightSection={<IconSearch className="text-gray-400" />}
            size="md"
          />

          <Select
            placeholder="Выбрать лигу"
            value={league}
            onChange={handleLeagueChange}
            onDropdownOpen={fetchLeagues}
            data={leagueOptions}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать страну"
            value={country}
            onChange={handleCountryChange}
            onDropdownOpen={fetchCountries}
            data={countryOptions}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать город"
            value={city}
            onChange={handleCityChange}
            data={cityOptions}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />

          <Select
            placeholder="Выбрать год основания"
            value={year}
            onChange={handleYearChange}
            data={yearOptions}
            className="flex-1 min-w-[200px]"
            size="md"
            clearable
          />
        </div>

        
      </div>

      {!loading && clubs.length === 0 && !areFiltersEmpty && (
        <div className="flex justify-center mt-6 text-gray-500">
          Ничего не найдено
        </div>
      )}

      <div className="bg-white shadow-lg p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Результаты поиска</h2>
          <span className="text-sm text-gray-500">
            Показано {clubs.length} из {total} результатов
          </span>
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
                    <p className="text-lg font-semibold">{club.clubName}</p>
                    <p className="text-sm text-gray-600">
                      {club.league?.leagueName || 'Без лиги'} - {club.city},{' '}
                      {club.country?.countryName || 'Без страны'} - Основан в {club.foundationYear}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Pagination
                total={Math.ceil(total / 10) || 1}
                value={page}
                onChange={(p) => {
                  setPage(p);
                  const updatedFilters = { ...filters, page: p };
                  setFilters(updatedFilters);
                  updateFiltersAndClubs(updatedFilters);
                }}
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
