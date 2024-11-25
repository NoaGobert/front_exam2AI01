import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const AlbumsSubmit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      artist_id: '',
    },
  });

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await api.get('/artists');
        setArtists(response.data.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (id) {
        try {
          const response = await api.get(`/albums/${id}`);
          const albumData = response.data.data;
          setAlbum(albumData);
        } catch (error) {
          console.error('Error fetching album:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [id]);

  useEffect(() => {
    if (!loading && album) {
      reset({
        title: album.title,
        artist_id: album.artist_id,
      });
    }
  }, [album, artists, reset, loading]);

  const onSubmit = async data => {
    try {
      setLoading(true);
      if (id) {
        await api.put(`/albums/${id}`, data);
      } else {
        await api.post('/albums', data);
      }
      navigate('/albums');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Title Field */}
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
              {...register('title', { required: 'Title is required' })}
              type="text"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Artist Select Field */}
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
              {...register('artist_id', { required: 'Artist is required' })}
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
            {errors.artist_id && (
              <p className="text-red-500 text-sm">{errors.artist_id.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit">Submit</Button>
        </form>
      )}
    </div>
  );
};
