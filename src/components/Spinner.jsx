import { CgSpinner } from 'react-icons/cg';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <CgSpinner className="animate-spin text-4xl text-pink-400" />
    </div>
  );
};
