import { AlbumsTable } from '@/partials/albums/AlbumsTable';
import { Link } from 'react-router-dom';

export const AlbumsList = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Albums List</h1>
        <Link
          to="/albums/add"
          className="bg-pink-400 text-white font-bold py-2 px-4 rounded hover:bg-pink-500"
        >
          Add Album
        </Link>
      </div>
      <AlbumsTable />
    </>
  );
};
