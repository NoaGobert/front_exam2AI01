import { ErrorMessage, Field, useField } from 'formik';

export const SelectInput = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <Field
        as="select"
        className={`w-full border rounded-lg p-2 ${
          meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...field}
        {...props}
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={props.name}
        component="p"
        className="text-red-500 text-sm"
      />
    </div>
  );
};
