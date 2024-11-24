import { AlbumsTable } from '@/partials/albums/AlbumsTable';
import { Link } from 'react-router-dom';

export const TracksList = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Liste des Tracks</h1>
        <Link
          to="/tracks/add"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Ajouter un Track
        </Link>
      </div>
      <AlbumsTable />
    </>
  );
};
