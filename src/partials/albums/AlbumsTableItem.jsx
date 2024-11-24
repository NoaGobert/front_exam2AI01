import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';

export const AlbumsTableItem = ({ album }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/albums/${album.id}/edit`);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">{album.id}</td>
      <td className="py-3 px-6 text-left">{album.title}</td>
      <td className="py-3 px-6 text-left">{album.artist.name}</td>
      <td className="py-3 px-6 text-left space-x-2 flex ">
        <Button onClick={handleEdit} className="bg-blue-500  hover:bg-blue-700">
          Edit
        </Button>
        {album.deleted_at ? (
          <Button className="bg-green-500  hover:bg-green-700">
            Restaurer
          </Button>
        ) : (
          <Button className="bg-red-500  hover:bg-red-700">Supprimer</Button>
        )}
      </td>
    </tr>
  );
};
