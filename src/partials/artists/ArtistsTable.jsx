import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { Table } from '@/components/Table';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { FaTrash, FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const ArtistsTable = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      const { data } = await api.get('/artists');
      setArtists(data.data);
      setLoading(false);
    };
    fetchArtists();
  }, []);

  const handleDelete = async id => {
    await api.delete(`/artists/${id}`);
    setArtists(
      artists.map(artist =>
        artist.id === id
          ? { ...artist, deleted_at: new Date().toISOString() }
          : artist,
      ),
    );
  };

  const handleRestore = async id => {
    await api.get(`/artists/${id}/restore`);
    setArtists(
      artists.map(artist =>
        artist.id === id ? { ...artist, deleted_at: null } : artist,
      ),
    );
  };

  const handleRowClick = artist => {
    if (artist.deleted_at) return;
    navigate(`/artists/${artist.id}/edit`);
  };

  const handleAlbumClick = async id => {
    navigate(`/albums/${id}/edit`);
  };

  const handleAddAlbum = () => {
    navigate('/albums/add');
  };

  const expandedRowRender = artist => {
    return (
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-end mb-2">
          <h4 className="font-semibold text-gray-700">
            Albums for <span className="text-pink-400">{artist.name}</span>
          </h4>
          <Button onClick={handleAddAlbum}>Add Track</Button>
        </div>
        {artist.albums && artist.albums.length > 0 ? (
          <ul className="space-y-1">
            {artist.albums.map(album => (
              <li
                key={album.id}
                onClick={() => handleAlbumClick(album.id)}
                className="text-sm text-gray-800 bg-white px-3 py-2 rounded-lg shadow-sm cursor-pointer"
              >
                🎵 {album.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No albums available for this artist.</p>
        )}
      </div>
    );
  };

  const columns = [
    { accessor: 'id', header: '#' },
    { accessor: 'name', header: 'Name' },
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
    { header: 'Albums', element: expandedRowRender, extend: true },
  ];
  return (
    <div>
      {loading ? (
        <Spinner className="h-64" />
      ) : (
        <Table
          columns={columns}
          data={artists}
          onRowClick={handleRowClick}
          expandedRowRender={expandedRowRender}
          expandButtonLabel={{
            collapsed: 'Show Albums',
            expanded: 'Hide Albums',
          }}
        />
      )}
    </div>
  );
};
