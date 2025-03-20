import { useState, useEffect } from 'react';
import axios from 'axios';

interface Club {
  id: number;
  name: string;
  league: string;
  city: string;
  country: string;
  yearFounded: number;
}

interface Params {
  search: string;
  country: string;
  league: string;
  city: string;
  year: string;
  page: number;
}

export default function useClubs(params: Params) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/clubs', {
          params: {
            search: params.search,
            country: params.country,
            league: params.league,
            city: params.city,
            year: params.year,
            page: params.page,
          },
        });

        setClubs(data.clubs);
        setTotal(data.total);
      } catch (error) {
        console.error('Ошибка загрузки клубов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [params]);

  return { clubs, total, loading };
}
