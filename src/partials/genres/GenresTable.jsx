import { api } from '@/utils/api';
import { handleError } from '@/utils/handleError';
import { useEffect, useState } from 'react';

export const GenresTable = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genres');
        const { data } = await response.data;
        setGenres(data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchGenres();
  }, []);

  return <>Genre table</>;
};
