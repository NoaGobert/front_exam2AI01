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

export const AlbumsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState({});
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const { data } = await api.get('/artists');
        setArtists(data.data);
      } catch {
        toast.error('Error fetching artists');
      }
    };

    fetchArtists();

    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/albums/${id}`);
          setAlbum(data.data);
        } catch (error) {
          handleError(error);
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
        await api.put(`/albums/${id}`, values);
        toast.success('Album updated successfully!');
      } else {
        await api.post('/albums', values);
        toast.success('Album created successfully!');
      }
      navigate('/albums');
    } catch (error) {
      handleError(error, setErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    title: album.title || '',
    artist_id: album.artist_id || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    artist_id: Yup.number().required('Artist is required'),
  });

  return (
    <>
      <h1 className="text-xl text-center mb-4">{id ? 'Edit' : 'Add'} Album</h1>

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
                <TextInput
                  label="Title"
                  name="title"
                  placeholder="Album Title"
                />
                <SelectInput
                  label="Artist"
                  name="artist_id"
                  options={artists.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  placeholder="Select an artist"
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
