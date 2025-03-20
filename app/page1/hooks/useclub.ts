import { useState, useEffect } from 'react';

interface ClubFilters {
  search?: string;
  country?: string;
  league?: string;
  city?: string;
  year?: string;
  page?: number;
}

export default function useClubs(filters: ClubFilters) {
  const [clubs, setClubs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();

        if (filters.search) params.append('search', filters.search);
        if (filters.country) params.append('countryid', filters.country); // ✅ исправил key
        if (filters.league) params.append('leagueid', filters.league);   // ✅ исправил key
        if (filters.city) params.append('city', filters.city);
        if (filters.year) params.append('foundationYear', filters.year);
        if (filters.page) params.append('page', String(filters.page));

        // limit по умолчанию, если нужен:
        params.append('limit', '10');

        const res = await fetch(`/api/clubs?${params.toString()}`);
        const data = await res.json();

        setClubs(data.clubs);
        setTotal(data.total);
      } catch (error) {
        console.error('Ошибка загрузки клубов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [filters]);

  return { clubs, total, loading };
}
