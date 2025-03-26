'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select, Pagination, LoadingOverlay } from '@mantine/core';
import { IconBuildingStadium } from '@tabler/icons-react';

export default function SearchClubs() {
  type Club = {
    id: string;
    clubName: string;
    foundationYear: string;
    country: { countryName: string };
    league: { leagueName: string };
  };

  interface GetClubsResponse {
    clubs: Club[];
    total: number;
    totalPages: number;
    page: number;
    foundationYears: string[];
  }

  const [clubs, setClubs] = useState<Club[]>([]);
  const [foundationYear, setFoundationYear] = useState<string>('');
  const [foundationYears, setFoundationYears] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    page: 1,
    foundationYear: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch clubs with filtering
  const fetchClubs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<GetClubsResponse>('/api/clubs', {
        params: {
          page: filters.page,
          foundationYear: filters.foundationYear,
          limit: 10,
        },
      });
      setClubs(data.clubs);
      setTotalPages(data.totalPages);
      setFoundationYears(data.foundationYears);
    } catch (error) {
      console.error('Ошибка при получении клубов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [filters]);

  const handleFoundationYearChange = (value: string) => {
    setFoundationYear(value);
    setFilters((prev) => ({ ...prev, foundationYear: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4">Поиск клубов по году основания</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div>
          <Select
            id="foundationYear"
            value={foundationYear}
            onChange={handleFoundationYearChange}
            placeholder="Выберите год основания"
            data={foundationYears.map((year) => ({ value: year, label: year }))}
            classNames={{
              input: 'mt-2 p-2 w-full border rounded-md',
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <LoadingOverlay visible={loading} />
        ) : (
          <div className="space-y-4">
            {clubs.length > 0 ? (
              clubs.map((club) => (
                <div key={club.id} className="flex items-center p-6 bg-white shadow-md rounded-lg">
                    <IconBuildingStadium />{' '}
                    <p className="text-xl font-bold">{club.clubName}</p>
                    <p className="text-lg ml-2">
                      | Год основания: {club.foundationYear} | Страна: {club.country.countryName} | Лига:{' '}
                      {club.league.leagueName}
                    </p>

                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-md">Нет клубов, соответствующих критериям</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Pagination
            total={totalPages}
            value={filters.page}
            onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
          />
        </div>
      </div>
    </div>
  );
}