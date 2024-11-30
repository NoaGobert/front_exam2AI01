import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { TextInput } from '@/components/TextInput';
import { api } from '@/utils/api';
import { handleError } from '@/utils/handleError';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

export const ArtistsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/artists/${id}`);
          setArtist(data.data);
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
        await api.put(`/artists/${id}`, values);
        toast.success('Artist updated successfully!');
      } else {
        await api.post('/artists', values);
        toast.success('Artist created successfully!');
      }
      navigate('/artists');
    } catch (error) {
      handleError(error, setErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: artist.name || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  return (
    <>
      <h1 className="text-xl text-center mb-4">{id ? 'Edit' : 'Add'} Artist</h1>
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
                  name="name"
                  placeholder="Artist name"
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
