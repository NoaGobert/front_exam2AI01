import toast from 'react-hot-toast';

export const handleError = (error, setErrors) => {
  if (error.response?.data?.errors && setErrors) {
    setErrors(error.response.data.errors);
  } else if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error('An error occurred');
  }
};
