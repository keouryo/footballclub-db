import { useState, useEffect } from 'react';

const useMatch = (filters: Record<string, string>) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams(filters);
        params.set('page', page.toString());

        const response = await fetch(`/api/matches?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Ошибка при загрузке матчей');
        }

        const data = await response.json();
        setMatches(data.matches);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [filters, page]);

  return {
    matches,
    loading,
    error,
    totalPages,
    page,
    setPage,
  };
};


export default useMatch;
