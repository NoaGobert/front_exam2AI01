import { Button } from '@/components/Button';
import { TracksTable } from '@/partials/tracks/TracksTable';
import { useNavigate } from 'react-router-dom';

export const TracksList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Liste des Tracks</h1>
        <Button onClick={() => navigate('/tracks/add')}>Add Track</Button>
      </div>
      <TracksTable />
    </>
  );
};
