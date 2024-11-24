import { cn } from '@/utils/cn';

export const Button = ({ onClick, children, className, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700',
        className,
      )}
    >
      {children}
    </button>
  );
};
