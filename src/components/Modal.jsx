import { useTranslation } from 'react-i18next';
import { Button } from './Button';

export const Modal = ({ is_open, on_close, title, children }) => {
  const { t } = useTranslation();

  if (!is_open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={on_close}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t(title)}</h2>
          <Button
            onClick={on_close}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
