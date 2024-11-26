import { cn } from '@/utils/cn';
import { ErrorMessage, Field, useField } from 'formik';

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        className={cn(
          'w-full border rounded-lg p-2',
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300',
        )}
        {...field}
        {...props}
      />
      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
