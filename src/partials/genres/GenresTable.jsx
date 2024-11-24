import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { GenresTableItem } from './GenresTableItem';

export const GenresTable = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genres');
        const { data } = await response.data;
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {genres.map(genre => (
            <GenresTableItem key={genre.id} genre={genre} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
