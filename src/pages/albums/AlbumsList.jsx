import { Button } from '@/components/Button';
import { AlbumsTable } from '@/partials/albums/AlbumsTable';
import { useNavigate } from 'react-router-dom';

export const AlbumsList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Albums List</h1>
        <Button onClick={() => navigate('/albums/add')}>Add Album</Button>
      </div>
      <AlbumsTable />
    </>
  );
};
