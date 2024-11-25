import { cn } from '@/utils/cn';

export const Button = ({
  onClick,
  children,
  className,
  type = 'button',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        'bg-pink-400 text-white font-bold py-2 px-4 rounded hover:bg-pink-500 disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
};
