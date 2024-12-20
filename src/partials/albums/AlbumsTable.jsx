import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const AlbumsTable = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      const { data } = await api.get('/albums');
      setAlbums(data.data);
      setLoading(false);
    };
    fetchAlbums();
  }, []);

  const handleDelete = async id => {
    await api.delete(`/albums/${id}`);
    setAlbums(
      albums.map(album =>
        album.id === id
          ? { ...album, deleted_at: new Date().toISOString() }
          : album,
      ),
    );
  };

  const handleRestore = async id => {
    await api.get(`/albums/${id}/restore`);
    setAlbums(
      albums.map(album =>
        album.id === id ? { ...album, deleted_at: null } : album,
      ),
    );
  };

  const handleRowClick = album => {
    if (album.deleted_at) return;
    navigate(`/albums/${album.id}/edit`);
  };

  const handleTrackClick = async id => {
    navigate(`/tracks/${id}/edit`);
  };

  const handleAddTrack = () => {
    navigate('/tracks/add');
  };

  const expandedRowRender = album => {
    return (
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-end mb-2">
          <h4 className="font-semibold text-gray-700">
            Tracks for <span className="text-pink-400">{album.title}</span>
          </h4>
          <Button onClick={handleAddTrack}>Add Track</Button>
        </div>
        {album.tracks && album.tracks.length > 0 ? (
          <ul className="space-y-1">
            {album.tracks.map(track => (
              <li
                key={track.id}
                onClick={() => handleTrackClick(track.id)}
                className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                🎵 {track.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tracks available for this album.</p>
        )}
      </div>
    );
  };
  const columns = [
    { accessor: 'id', header: '#' },
    { accessor: 'title', header: 'Title' },
    { accessor: 'artist.name', header: 'Artist' },
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
    {
      header: 'Tracks',
      element: expandedRowRender,
      extend: true,
    },
  ];

  return (
    <div>
      {loading ? (
        <Spinner className="h-64" />
      ) : (
        <Table
          columns={columns}
          data={albums}
          onRowClick={handleRowClick}
          expandedRowRender={expandedRowRender}
          expandButtonLabel={{
            collapsed: 'Show Tracks',
            expanded: 'Hide Tracks',
          }}
        />
      )}
    </div>
  );
};
