import { Button } from '@/components/Button';

export const GenresTableItem = ({ genre }) => {
  return (
    <tr
      className={`border-b border-gray-200 hover:bg-gray-100 ${
        genre.deleted_at ? 'bg-red-100' : ''
      }`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">{genre.id}</td>
      <td className="py-3 px-6 text-left">{genre.name}</td>
      <td className="py-3 px-6 text-left space-x-2 flex  justify-end">
        <Button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Editer
        </Button>
        {genre.deleted_at ? (
          <Button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
            Restaurer
          </Button>
        ) : (
          <Button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">
            Supprimer
          </Button>
        )}
      </td>
    </tr>
  );
};
