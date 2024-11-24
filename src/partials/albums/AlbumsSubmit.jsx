import { Button } from '@/components/Button';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const AlbumsSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get('/artists');
        const { data } = await response.data;
        setArtists(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchAlbum = async () => {
        try {
          const response = await api.get(`/albums/${id}`);
          const { data } = await response.data;
          setValue('title', data.title);
          setValue('artist_id', data.artist_id || '');
        } catch (error) {
          console.error(error);
        }
      };
      fetchAlbum();
    }
  }, [id, setValue]);

  const onSubmit = async data => {
    try {
      if (id) {
        await api.put(`/albums/${id}`, data);
      } else {
        await api.post('/albums', data);
      }
      navigate('/albums');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex-1">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="w-full border border-gray-300 rounded-lg p-2"
            id="title"
            name="title"
            {...register('title')}
            type="text"
          />
        </div>
        <div className="flex-1">
          <label
            className="block mb-2 text-sm font-medium text-gray-700"
            htmlFor="artist_id"
          >
            Artist
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            id="artist_id"
            name="artist_id"
            defaultValue=""
            {...register('artist_id')}
          >
            <option value="" disabled>
              Select an artist
            </option>
            {artists.map(artist => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
