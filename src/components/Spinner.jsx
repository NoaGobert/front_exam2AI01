import { cn } from '@/utils/cn';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Spinner = ({ className }) => {
  return (
    <div className={cn('flex justify-center items-center p-2', className)}>
      <AiOutlineLoading3Quarters className="animate-spin text-4xl  text-pink-400" />
    </div>
  );
};
