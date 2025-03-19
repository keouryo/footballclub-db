import { useState } from 'react';
import axios from 'axios';

export const useLeagueSearch = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchLeagues = async (filters: {
    search: string;
    leagueLevel: string;
    country: string;
    continent: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/leagues', {
        params: {
          search: filters.search,
          leagueLevel: filters.leagueLevel,
          country: filters.country,
          continent: filters.continent,
        },
      });

      setData({
        results: response.data,
        leaguesList: response.data.map((league: any) => ({
          value: league.id,
          label: league.leagueName,
        })),
        countriesList: response.data.map((league: any) => ({
          value: league.country.id,
          label: league.country.countryName,
        })),
      });
    } catch (error) {
      console.error('Ошибка при поиске лиг:', error);
      setData({
        results: [],
        leaguesList: [],
        countriesList: [],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    searchLeagues,
  };
};
