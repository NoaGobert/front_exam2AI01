import { GenresTable } from '@/partials/genres/GenresTable';
import { Link } from 'react-router-dom';

export const GenresList = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Liste des Genres</h1>
        <Link
          to="/genres/add"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Ajouter un Genre
        </Link>
      </div>
      <GenresTable />
    </>
  );
};
