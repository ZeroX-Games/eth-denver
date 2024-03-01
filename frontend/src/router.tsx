import { createBrowserRouter } from 'react-router-dom';
import Layout from '@ui/layout/Layout';
import Pokemon from '@ui/pages/Pokemon';
import GameLayout from './ui/pages/Game/Game';
import CardGame from './ui/pages/Card/CardGame';
import SocialGame from './ui/pages/Social/SocialGame';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Pokemon /> }],
  },
  {
    path: '/game-session/fighter',
    element: <GameLayout />,
  },
  {
    path: '/game-session/card',
    element: <CardGame />,
  },
  {
    path: '/game-session/social',
    element: <SocialGame />,
  },
]);

export default router;
