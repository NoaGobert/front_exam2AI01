import { Root } from '@/components/Root';
import { AlbumsForm } from '@/pages/albums/AlbumsForm';
import { AlbumsList } from '@/pages/albums/AlbumsList';
import { ArtistsForm } from '@/pages/artists/ArtistsForm';
import { ArtistsList } from '@/pages/artists/ArtistsList';
import { GenresForm } from '@/pages/genres/GenresForm';
import { GenresList } from '@/pages/genres/GenresList';
import { TracksForm } from '@/pages/tracks/TracksForm';
import { TracksList } from '@/pages/tracks/TracksList';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        // albums
        {
          path: 'albums',
          element: <AlbumsList />,
        },
        {
          path: '/albums/add',
          element: <AlbumsForm />,
        },
        {
          path: '/albums/:id/edit',
          element: <AlbumsForm />,
        },
        // genres
        {
          path: '/genres',
          element: <GenresList />,
        },
        {
          path: '/genres/add',
          element: <GenresForm />,
        },
        {
          path: '/genres/:id/edit',
          element: <GenresForm />,
        },

        // tracks
        {
          path: '/tracks',
          element: <TracksList />,
        },
        {
          path: '/tracks/add',
          element: <TracksForm />,
        },
        {
          path: '/tracks/:id/edit',
          element: <TracksForm />,
        },

        // artists
        {
          path: '/artists',
          element: <ArtistsList />,
        },
        {
          path: '/artists/add',
          element: <ArtistsForm />,
        },
        {
          path: '/artists/:id/edit',
          element: <ArtistsForm />,
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_relativeSplatPath: true,
    },
  },
);
