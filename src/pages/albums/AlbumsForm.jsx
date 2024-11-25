import { AlbumsSubmit } from '@/partials/albums/AlbumsSubmit';

import { useParams } from 'react-router-dom';
export const AlbumsForm = () => {
  const { id } = useParams();

  return (
    <>
      <h1 className="text-xl text-center mb-4">{id ? 'Edit' : 'Add'} Album</h1>

      <AlbumsSubmit />
    </>
  );
};
