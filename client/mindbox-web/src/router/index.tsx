import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Layout from './Layout';
import Home from '../pages/Home';
import Cards from '../pages/Cards';
import CardDetail from '../pages/CardDetail'; 

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'cards',
        element: <Cards />,
      },
      {
        path: 'cards/:id',
        element: <CardDetail />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
