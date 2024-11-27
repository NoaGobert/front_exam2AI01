import { Button } from '@/components/Button';
import { SelectInput } from '@/components/SelectInput';
import { Spinner } from '@/components/Spinner';
import { TextInput } from '@/components/TextInput';
import { api } from '@/utils/api';
import { handleError } from '@/utils/handleError';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

export const TracksForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { data } = await api.get('/albums');
        setAlbums(data.data);
      } catch {
        toast.error('Error fetching albums');
      }
    };
    const fetchGenres = async () => {
      try {
        const { data } = await api.get('/genres');
        setGenres(data.data);
      } catch {
        toast.error('Error fetching genres');
      }
    };
    fetchAlbums();
    fetchGenres();

    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/tracks/${id}`);
          setTrack(data.data);
        } catch {
          toast.error('Error fetching track');
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (id) {
        await api.put(`/tracks/${id}`, values);
        toast.success('Track updated successfully!');
      } else {
        await api.post('/tracks', values);
        toast.success('Track created successfully!');
      }
      navigate('/tracks');
    } catch (error) {
      handleError(error, setErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: track.name || '',
    composer: track.composer || '',
    milliseconds: track.milliseconds || '',
    bytes: track.bytes || '',
    unit_price: track.unit_price || '',
    album_id: track.album_id || '',
    genre_id: track.genre_id || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    composer: Yup.string().required('Composer is required'),
    milliseconds: Yup.number().required('Milliseconds is required'),
    bytes: Yup.number().required('Bytes is required'),
    unit_price: Yup.number().required('Unit Price is required'),
    album_id: Yup.number().required('Album is required'),
    genre_id: Yup.number().required('Genre is required'),
  });

  return (
    <>
      <h1 className="text-xl text-center mb-4">{id ? 'Edit' : 'Add'} Track</h1>

      <div className="p-6 bg-white rounded-xl shadow-md">
        {loading ? (
          <Spinner className="h-52" />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <TextInput label="Name" name="name" placeholder="Track Name" />
                <TextInput
                  label="Composer"
                  name="composer"
                  placeholder="Track Composer"
                />
                <TextInput
                  label="Milliseconds"
                  name="milliseconds"
                  placeholder="Track Milliseconds"
                />
                <TextInput
                  label="Bytes"
                  name="bytes"
                  placeholder="Track Bytes"
                />
                <TextInput
                  label="Unit Price"
                  name="unit_price"
                  placeholder="Track Unit Price"
                />
                <SelectInput
                  label="Album"
                  name="album_id"
                  type="select"
                  options={albums.map(({ id, title }) => ({
                    value: id,
                    label: title,
                  }))}
                  placeholder="Select an album"
                />
                <SelectInput
                  label="Genre"
                  name="genre_id"
                  type="select"
                  options={genres.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  placeholder="Select a genre"
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : 'Submit'}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};
