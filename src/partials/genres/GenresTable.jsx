import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table';
import { api } from '@/utils/api';
import { handleError } from '@/utils/handleError';
import { useEffect, useState } from 'react';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const GenresTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genres');
        const { data } = await response.data;
        setGenres(data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);

  const handleDelete = async id => {
    await api.delete(`/genres/${id}`);
    setGenres(
      genres.map(genre =>
        genre.id === id
          ? { ...genre, deleted_at: new Date().toISOString() }
          : genre,
      ),
    );
  };

  const handleRestore = async id => {
    await api.get(`/genres/${id}/restore`);
    setGenres(
      genres.map(genre =>
        genre.id === id ? { ...genre, deleted_at: null } : genre,
      ),
    );
  };

  const handleRowClick = genre => {
    if (genre.deleted_at) return;
    navigate(`/genres/${genre.id}/edit`);
  };

  const columns = [
    {
      accessor: 'id',
      header: '#',
    },
    {
      accessor: 'name',
      header: 'Name',
    },
    {
      header: 'Actions',
      element: row => (
        <div className="flex items-center gap-2 ">
          {!row.deleted_at ? (
            <span onClick={e => (e.stopPropagation(), handleDelete(row.id))}>
              <FaTrash className="size-5" />
            </span>
          ) : (
            <span onClick={e => (e.stopPropagation(), handleRestore(row.id))}>
              <FaTrashRestore className="size-5" />
            </span>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      {loading ? (
        <Spinner className="h-64" />
      ) : (
        <Table columns={columns} data={genres} onRowClick={handleRowClick} />
      )}
    </div>
  );
};
