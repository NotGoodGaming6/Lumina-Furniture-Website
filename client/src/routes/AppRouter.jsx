import React from 'react';
import { Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { PublicRouter } from './PublicRouter';
import { AdminRouter } from './AdminRouter';

export const AppRouter = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {PublicRouter()}
        {AdminRouter()}
      </Routes>
    </AnimatePresence>
  );
};
