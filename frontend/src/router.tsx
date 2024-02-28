import { createBrowserRouter } from 'react-router-dom';
import Layout from '@ui/layout/Layout';
import Pokemon from '@ui/pages/Pokemon';
import GameLayout from './ui/pages/Game/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Pokemon /> }],
  },
  {
    path: '/game-session',
    element: <GameLayout />,
  },
]);

export default router;
