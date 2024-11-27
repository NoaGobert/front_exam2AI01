import { Button } from '@/components/Button';
import { GenresTable } from '@/partials/genres/GenresTable';
import { useNavigate } from 'react-router-dom';

export const GenresList = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">Genres List</h1>
        <Button onClick={() => navigate('/genres/add')}>Add Genre</Button>
      </div>
      <GenresTable />
    </>
  );
};
