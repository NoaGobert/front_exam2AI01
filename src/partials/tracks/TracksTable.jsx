import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const TracksTable = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const { data } = await api.get('/tracks');
      setTracks(data.data);
      setLoading(false);
    };
    fetchTracks();
  }, []);

  const handleDelete = async id => {
    await api.delete(`/tracks/${id}`);
    setTracks(
      tracks.map(track =>
        track.id === id
          ? { ...track, deleted_at: new Date().toISOString() }
          : track,
      ),
    );
  };

  const handleRestore = async id => {
    await api.get(`/tracks/${id}/restore`);
    setTracks(
      tracks.map(track =>
        track.id === id ? { ...track, deleted_at: null } : track,
      ),
    );
  };

  const handleRowClick = track => {
    if (track.deleted_at) return;
    navigate(`/tracks/${track.id}/edit`);
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
      accessor: 'composer',
      header: 'Composer',
    },

    {
      accessor: 'milliseconds',
      header: 'Milliseconds',
    },
    {
      accessor: 'bytes',
      header: 'Bytes',
    },
    {
      accessor: 'unit_price',
      header: 'Unit Price',
    },
    {
      accessor: 'genre.name',
      header: 'Genre',
    },
    {
      accessor: 'album.title',
      header: 'Album',
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
        <Table columns={columns} data={tracks} onRowClick={handleRowClick} />
      )}
    </div>
  );
};
