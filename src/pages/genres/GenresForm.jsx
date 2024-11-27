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

export const GenresForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await api.get(`/genres/${id}`);
          setGenre(data.data);
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
        await api.put(`/genres/${id}`, values);
        toast.success('Genre updated successfully!');
      } else {
        await api.post('/genres', values);
        toast.success('Genre created successfully!');
      }
      navigate('/genres');
    } catch (error) {
      handleError(error, setErrors);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    name: genre.name || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  return (
    <>
      <h1 className="text-xl text-center mb-4">{id ? 'Edit' : 'Add'} Genre</h1>

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
                <TextInput label="Name" name="name" placeholder="Genre Name" />
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
