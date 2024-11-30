import { Button } from '@/components/Button';
import { ArtistsTable } from '@/partials/artists/ArtistsTable';
import { useNavigate } from 'react-router-dom';

export const ArtistsList = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Artists List</h1>
        <Button onClick={() => navigate('/artists/add')}>Add Artist</Button>
      </div>
      <ArtistsTable />
    </>
  );
};
